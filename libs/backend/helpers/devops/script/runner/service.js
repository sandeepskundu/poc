const fs = require('fs');
const os = require('os');
const path = require('path');
const utils = require('./utils');
const fsp = require('fs/promises');
const phelpers = require('./process');
const { StringDecoder } = require('string_decoder');
const session = process.aioBeLibs('helpers/_private/session');

const BUCKET_SIZE = 500;
const HEARTBEAT_MS = 15000;
const MAX_CHUNK_BYTES = 64 * 1024;
const DEFAULT_TIMEOUT_MS = Number(process.env.SCRIPT_TIMEOUT_MS) || 3600000;

const EVENT_TYPES = {
    TRIGGERED: 'triggered',
    QUEUED: 'queued',
    STARTED: 'started',
    STEP_START: 'step-start',
    LOG: 'log',
    STDERR: 'stderr',
    PROGRESS: 'progress',
    ERROR: 'error',
    RETRYING: 'retrying',
    STEP_DONE: 'step-done',
    DONE: 'done',
    BATCH_DONE: 'batch-done',
    ARTIFACT: 'artifact',
    HEARTBEAT: 'heartbeat',
    COMPLETED: 'completed',
    FAILED: 'failed',
    STOPPED: 'stopped',
    TIMEOUT: 'timeout',
    SKIPPED: 'skipped'
};

// Uses OS temp folder (/tmp) so project file watchers (nodemon/webpack) are never triggered
const LOG_DIR = path.join(os.tmpdir(), 'express-script-logs');

if (!fs.existsSync(LOG_DIR)) {
    fs.mkdirSync(LOG_DIR, { recursive: true });
}

let queueLock = false;
let queuePending = false;
let watchers = new Map();
let maxQueueConcurrency = Number(process.env.SCRIPT_QUEUE_CONCURRENCY) || 1;

const getLogFilePath = (runId) => {
    return path.join(LOG_DIR, `${runId}.log`);
};

const user = async (req) => {
    const ad = req ? await session.details(req) : { anonId: 'system' };

    return {
        uId: ad?.anonId || 'system',
        aId: ad?.anonId || 'system'
    };
};

/**
 * Checks if a PID is alive safely regardless of how phelpers.isPidAlive is structured.
 */
const checkPidAlive = async (req, pid) => {
    if (!pid || pid <= 0) return false;
    try {
        // Call with both signatures supported
        const res = await phelpers.isPidAlive(req, null, pid);
        return Boolean(res);
    } catch (_) {
        return false;
    }
};

/**
 * Parses raw shell output text for structured CI/CD markers if present.
 */
const parseLogChunk = (text) => {
    if (!text) return { type: EVENT_TYPES.LOG, msg: '' };

    const markerRegex = /^##\[(step-start|step-done|stderr|progress|error|retrying|artifact|skipped)\]\s*(.*)/i;
    const match = String(text).match(markerRegex);

    if (match && typeof match === 'string') {
        return {
            type: match.toLowerCase(),
            msg: match || text
        };
    }

    return {
        type: EVENT_TYPES.LOG,
        msg: text
    };
};

/**
 * Appends log entries into MongoDB buckets of 500 without losing any historical logs.
 */
const appendLogsToDb = async (req, runId, entries, byteOffset = null) => {
    let isList = req.helpers.data.type.is(entries, 'list')

    let list = isList ? entries : [entries];

    if (!list.length) {
        return;
    }

    const ud = await user(req);
    const logModel = await utils.getModel(req);
    const runModel = await utils.getModel(req, 'run');

    list = list.map(lg => {
        return {
            ...lg,
            ud: lg.ud || ud,
            ts: lg.ts || new Date()
        };
    });

    for (let i = 0; i < list.length; i += BUCKET_SIZE) {
        let chunk = list.slice(i, i + BUCKET_SIZE);

        await logModel.findOneAndUpdate({
            runId,
            count: {
                $lte: BUCKET_SIZE - chunk.length
            }
        }, {
            $setOnInsert: {
                runId: runId,
                ud: ud
            },
            $inc: {
                count: chunk.length
            },
            $push: {
                logs: {
                    $each: chunk
                }
            }
        }, {
            upsert: true,
            sort: {
                _id: -1
            }
        });
    }

    const runUpdate = {
        $inc: {
            totalLogs: list.length
        }
    };

    if (byteOffset !== null) {
        runUpdate.$set = {
            byteOffset
        };
    }

    await runModel.findByIdAndUpdate(runId, runUpdate);
};

const broadcast = (req, runId, entry) => {
    const state = watchers.get(String(runId));

    if (!state) {
        return;
    }

    const payload = `data: ${JSON.stringify({
        cmd: state.cmd,
        mode: state.mode,
        runId: state.runId,
        batchId: state.batchId,
        ...entry,
    })}\n\n`;

    for (const client of state.clients) {
        if (!client.res.writableEnded) {
            client.res.write(payload);
        }
    }
};

/**
 * Helper to record initial 'triggered' and 'queued' events when a script run is created.
 */
const recordInitialLifecycle = async (req, runDoc, isQueued = false) => {
    const runId = String(runDoc._id);
    const entries = [
        {
            type: EVENT_TYPES.TRIGGERED,
            msg: `Script "${runDoc.cmd}" triggered`,
            ts: new Date()
        }
    ];

    if (isQueued || runDoc.status === 'queued') {
        entries.push({
            type: EVENT_TYPES.QUEUED,
            msg: `Script "${runDoc.cmd}" pushed to queue`,
            ts: new Date()
        });
    }

    await appendLogsToDb(req, runId, entries);
    for (const entry of entries) {
        broadcast(req, runId, entry);
    }
};

/**
 * Creates or returns the single shared watcher for a runId.
 */
const ensureWatcher = async (req, doc) => {
    let runId = String(doc._id);

    if (watchers.has(runId)) {
        let existing = watchers.get(runId);
        // Only update status from doc if watcher hasn't already transitioned to running/completed
        if (existing.status === 'queued' && doc.status !== 'queued') {
            existing.status = doc.status;
        }

        if (doc.pid) {
            existing.pid = doc.pid;
        }

        return existing;
    }

    const logFile = getLogFilePath(runId);
    const decoder = new StringDecoder('utf8');

    const state = {
        busy: false,
        timer: null,
        closed: false,
        runId: runId,
        finalize: null,
        cmd: doc.cmd,
        pid: doc.pid,
        mode: doc.mode,
        clients: new Set(),
        pendingFinalize: null,
        status: doc.status,
        batchId: doc.batchId,
        exitCode: doc.exitCode,
        offset: doc.byteOffset || 0,
        timeoutMs: doc.timeoutMs || DEFAULT_TIMEOUT_MS,
        startTime: doc._created ? new Date(doc._created).getTime() : Date.now(),
    };

    const cleanupWatcher = async (deleteLogFile = false) => {
        if (state.closed) {
            return;
        } else {
            state.closed = true;
            clearInterval(state.timer);

            for (const client of state.clients) {
                client.activeRuns.delete(runId);
                if (client.activeRuns.size === 0 && !client.res.writableEnded) {
                    clearInterval(client.heartbeat);

                    if (state.batchId) {
                        client.res.write(
                            `data: ${JSON.stringify({
                                type: EVENT_TYPES.BATCH_DONE,
                                batchId: state.batchId,
                                ts: new Date(),
                                msg: 'Batch execution finished'
                            })}\n\n`
                        );
                    }

                    client.res.write(
                        `data: ${JSON.stringify({
                            type: EVENT_TYPES.COMPLETED,
                            batchId: state.batchId,
                            ts: new Date(),
                            msg: 'All processes finished'
                        })}\n\n`
                    );
                    client.res.end();
                }
            }

            state.clients.clear();
            watchers.delete(runId);

            if (deleteLogFile) {
                await fsp.unlink(logFile).catch(() => { });
            }

            // Trigger next item in queue as soon as current watcher closes
            runQueue(req);
        }
    };

    const flushFileToDb = async (isFinal = false) => {
        const stat = await fsp.stat(logFile).catch(() => null);
        if (!stat || stat.size <= state.offset) {
            if (isFinal) {
                const rem = decoder.end();
                if (rem) {
                    const entry = parseLogChunk(rem);
                    broadcast(req, runId, entry);
                    await appendLogsToDb(req, runId, entry, state.offset);
                }
            }
            return;
        }

        const entries = [];
        const fh = await fsp.open(logFile, 'r');

        try {
            while (state.offset < stat.size) {
                const len = Math.min(stat.size - state.offset, MAX_CHUNK_BYTES);
                const buf = Buffer.allocUnsafe(len);
                await fh.read(buf, 0, len, state.offset);
                state.offset += len;

                const text = decoder.write(buf);
                if (text) {
                    const entry = parseLogChunk(text);
                    entries.push(entry);
                    broadcast(req, runId, entry);
                }
            }

            if (isFinal) {
                const rem = decoder.end();
                if (rem) {
                    const entry = parseLogChunk(rem);
                    entries.push(entry);
                    broadcast(req, runId, entry);
                }
            }
        } finally {
            await fh.close();
        }

        if (entries.length) {
            await appendLogsToDb(req, runId, entries, state.offset);
        }
    };

    const executeFinalize = async ({ finalStatus, exitCode = 0, customMsg = null }) => {
        if (state.closed) return;
        state.status = finalStatus;
        state.exitCode = exitCode;

        await flushFileToDb(true);

        const statusToTypeMap = {
            stopped: EVENT_TYPES.STOPPED,
            failed: EVENT_TYPES.FAILED,
            timeout: EVENT_TYPES.TIMEOUT,
            skipped: EVENT_TYPES.SKIPPED,
            completed: EVENT_TYPES.DONE
        };

        const type = statusToTypeMap[finalStatus] || EVENT_TYPES.DONE;
        let defaultMsg = `Process exited with code ${exitCode ?? 0}`;

        if (finalStatus === 'stopped') defaultMsg = 'Stopped by user';
        if (finalStatus === 'timeout') defaultMsg = `Process timed out after ${state.timeoutMs}ms`;
        if (finalStatus === 'skipped') defaultMsg = 'Process execution skipped';

        const msg = customMsg || defaultMsg;
        const terminalEntries = [{ type, msg, exitCode, ts: new Date() }];

        if (finalStatus === 'failed' && customMsg) {
            terminalEntries.unshift({
                type: EVENT_TYPES.ERROR,
                msg: customMsg,
                ts: new Date()
            });
        }

        const runModel = await utils.getModel(req, 'run');

        await appendLogsToDb(req, runId, terminalEntries, state.offset);
        await runModel.findByIdAndUpdate(runId, {
            $set: {
                exitCode,
                status: finalStatus,
                byteOffset: state.offset
            }
        });

        for (const entry of terminalEntries) {
            broadcast(req, runId, entry);
        }

        await cleanupWatcher(true);
    };

    state.finalize = async (finalStatus, exitCode = 0, customMsg = null) => {
        if (state.closed) return;
        if (state.busy) {
            state.pendingFinalize = { finalStatus, exitCode, customMsg };
            return;
        }
        state.busy = true;
        try {
            await executeFinalize({ finalStatus, exitCode, customMsg });
        } finally {
            state.busy = false;
        }
    };

    state.timer = setInterval(async () => {
        if (state.busy || state.closed || state.status === 'queued') return;
        state.busy = true;

        try {
            await flushFileToDb(false);

            if (state.pendingFinalize) {
                await executeFinalize(state.pendingFinalize);
                return;
            }

            const alive = await checkPidAlive(req, state.pid);

            if (state.status === 'running' && state.timeoutMs && (Date.now() - state.startTime > state.timeoutMs)) {
                if (state.pid && alive) {
                    await phelpers.killProcessTree(req, null, state.pid);
                }
                await executeFinalize({
                    finalStatus: 'timeout',
                    exitCode: 124,
                    customMsg: `Execution exceeded timeout of ${state.timeoutMs}ms`
                });
                return;
            }

            if (state.status === 'running' && !alive) {
                const code = state.exitCode ?? 0;
                const finalStatus = code === 0 ? 'completed' : 'failed';
                await executeFinalize({ finalStatus, exitCode: code });
            }
        } catch (err) {
            console.error(`[Watcher ${runId}] Error:`, err.message);
        } finally {
            if (!state.closed && state.pendingFinalize) {
                const pending = state.pendingFinalize;
                state.pendingFinalize = null;
                await executeFinalize(pending).catch(() => { });
            }
            state.busy = false;
        }
    }, 1000);

    watchers.set(runId, state);
    return state;
};

/**
 * Spawns the dynamic OS command and transitions the run from 'queued' -> 'running'.
 */
const launchRun = async (req, doc) => {
    const runId = String(doc._id);
    const logFile = getLogFilePath(runId);
    const watcher = await ensureWatcher(req, doc);

    try {
        // Set status to 'running' BEFORE spawning so fast-exiting commands aren't ignored by onExit
        watcher.status = 'running';
        watcher.startTime = Date.now();

        const pid = await phelpers.spawnDetachedCommand(req, {
            cmd: doc.cmd,
            cwd: doc.cwd,
            env: doc.env,
            logFile: logFile,
            onExit: (code) => {
                if (!watcher.closed) {
                    watcher.exitCode = code;
                    watcher.finalize((code === 0 ? 'completed' : 'failed'), code).catch(() => { });
                }
            },
        });

        watcher.pid = pid;
        doc.pid = pid;
        doc.status = 'running';

        // Update DB (supports both Mongoose doc.save() and plain object findByIdAndUpdate)
        if (typeof doc.save === 'function') {
            await doc.save();
        } else {
            const runModel = await utils.getModel(req, 'run');
            await runModel.findByIdAndUpdate(runId, { $set: { pid, status: 'running' } });
        }

        const startEntry = {
            ts: new Date(),
            type: EVENT_TYPES.STARTED,
            msg: `Process started - "${doc.cmd}" (PID: ${pid})`
        };

        await appendLogsToDb(req, runId, startEntry);
        broadcast(req, runId, startEntry);
    } catch (err) {
        await watcher.finalize('failed', 1, `Failed to start: ${err.message}`);
    }

    return doc;
};

/**
 * Queue Scheduler: Starts queued jobs in FIFO order up to `maxQueueConcurrency`.
 * Automatically cleans up stale 'running' DB records whose PIDs have already died!
 */
const runQueue = async (req) => {
    if (queueLock) {
        queuePending = true;
        return;
    }

    queueLock = true;

    try {
        const runModel = await utils.getModel(req, 'run');

        while (true) {
            queuePending = false;

            // 1. Check active 'running' queue docs and clean up any stale/dead PIDs blocking the queue
            const runningDocs = await runModel.find({
                mode: 'queue',
                status: 'running',
            });

            let activeRunningCount = 0;
            for (const rDoc of runningDocs) {
                const alive = await checkPidAlive(req, rDoc.pid);
                if (alive) {
                    activeRunningCount++;
                } else {
                    // Dead process was stuck in 'running' state in DB — finalize it so queue unblocks!
                    const w = await ensureWatcher(req, rDoc);
                    await w.finalize('completed', rDoc.exitCode ?? 0);
                }
            }

            const available = maxQueueConcurrency - activeRunningCount;

            if (available <= 0) {
                break;
            }

            // 2. Fetch next queued jobs (sorted by _id FIFO, which works for both _created and createdAt schemas)
            const nextRun = await runModel.find({
                mode: 'queue',
                status: 'queued',
            }).sort({ _id: 1 }).limit(available);

            if (!nextRun.length) {
                break;
            }

            for (const doc of nextRun) {
                await launchRun(req, doc);
            }

            if (!queuePending) {
                break;
            }
        }
    } catch (err) {
        console.error('Queue scheduler error:', err.message);
    } finally {
        queueLock = false;
        if (queuePending) {
            queuePending = false;
            runQueue(req);
        }
    }
};





const triggred = async (req, doc, ) => {
    const runId = String(runDoc._id);
    const entries = [
        {
            type: EVENT_TYPES.TRIGGERED,
            msg: `Script "${runDoc.cmd}" triggered`,
            ts: new Date()
        }
    ];

    if (isQueued || runDoc.status === 'queued') {
        entries.push({
            type: EVENT_TYPES.QUEUED,
            msg: `Script "${runDoc.cmd}" pushed to queue`,
            ts: new Date()
        });
    }

    await appendLogsToDb(req, runId, entries);
    for (const entry of entries) {
        broadcast(req, runId, entry);
    }
}




/**
 * Attaches an Express SSE response to 1 or multiple runs (queue or parallel).
 */
const attachStream = async (req, res, runDocs, batchId) => {
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Content-Type', 'text/event-stream');
    res.flushHeaders?.();

    const docs = Array.isArray(runDocs) ? runDocs : [runDocs];
    const activeDocs = docs.filter((d) => ['queued', 'running'].includes(d.status));

    if (!activeDocs.length) {
        res.write(
            `data: ${JSON.stringify({
                type: EVENT_TYPES.BATCH_DONE,
                ts: new Date(),
                msg: 'All processes already finished'
            })}\n\n`
        );
        res.write(
            `data: ${JSON.stringify({
                type: EVENT_TYPES.COMPLETED,
                ts: new Date(),
                msg: 'Stream closed'
            })}\n\n`
        );
        return res.end();
    }

    const heartbeat = setInterval(() => {
        if (!res.writableEnded) {
            res.write(
                `data: ${JSON.stringify({
                    type: EVENT_TYPES.HEARTBEAT,
                    ts: new Date(),
                    msg: 'ping'
                })}\n\n`
            );
        }
    }, HEARTBEAT_MS);

    const client = {
        res,
        heartbeat,
        activeRuns: new Set(activeDocs.map((d) => String(d._id))),
    };

    let hasQueued = false;

    for (const doc of activeDocs) {
        let watcher = await ensureWatcher(req, doc);
            watcher.clients.add(client);

        if (watcher.status === 'queued') {
            hasQueued = true;
        }

        await recordInitialLifecycle(req, doc, hasQueued);

        res.write(
            `data: ${JSON.stringify({
                cmd: doc.cmd,
                mode: doc.mode,
                ts: new Date(),
                batchId: doc.batchId,
                runId: watcher.runId,
                type: watcher.status === 'queued' ? EVENT_TYPES.QUEUED : EVENT_TYPES.STARTED,
                msg: watcher.status === 'queued' ? 'Waiting in queue...' : `Running (PID: ${watcher.pid})`
            })}\n\n`
        );
    }

    // Automatically kick the queue scheduler after client attaches so queued items start right away
    if (hasQueued) {
        runQueue(req);
    }

    req.on('close', () => {
        clearInterval(heartbeat);
        for (const doc of activeDocs) {
            const w = watchers.get(String(doc._id));
            if (w) {
                w.clients.delete(client);
            }
        }
    });
};

const stopWatcher = async (runId, reason = 'Stopped by user') => {
    const watcher = watchers.get(String(runId));
    if (watcher) {
        if (watcher.pid) {
            await phelpers.killProcessTree(null, null, watcher.pid);
        }
        await watcher.finalize('stopped', -1, reason);
        return true;
    }
    return false;
};

const resumeRunningJobsOnBoot = async (req = null) => {
    try {
        const runModel = await utils.getModel(req, 'run');
        const runningDocs = await runModel.find({ status: 'running' });

        for (const doc of runningDocs) {
            const watcher = await ensureWatcher(req, doc);
            const alive = await checkPidAlive(req, doc.pid);
            if (!alive) {
                await watcher.finalize('completed', 0);
            }
        }

        await runQueue(req);
    } catch (err) {
        console.error('Boot recovery error:', err.message);
    }
};

exports.EVENT_TYPES = EVENT_TYPES;
exports.runQueue = runQueue;
exports.launchRun = launchRun;
exports.stopWatcher = stopWatcher;
exports.attachStream = attachStream;
exports.ensureWatcher = ensureWatcher;
exports.appendLogsToDb = appendLogsToDb;
exports.recordInitialLifecycle = recordInitialLifecycle;
exports.resumeRunningJobsOnBoot = resumeRunningJobsOnBoot;
