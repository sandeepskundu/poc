const fs = require('fs');
const os = require('os');
const path = require('path');
const utils = require('./utils');
const fsp = require('fs/promises');
const phelpers = require('./process');
const { StringDecoder } = require('string_decoder');
const session = process.aioBeLibs('helpers/_private/session');
const ScriptRun = {};
const BUCKET_SIZE = 500;
const HEARTBEAT_MS = 15000;
const MAX_CHUNK_BYTES = 64 * 1024;
// Uses OS temp folder (/tmp) so project file watchers (nodemon/webpack) are never triggered
const LOG_DIR = path.join(os.tmpdir(), 'express-script-logs');

if (!fs.existsSync(LOG_DIR)) {
    fs.mkdirSync(LOG_DIR, { recursive: true });
}

let queueLock = false;
let watchers = new Map();
let maxQueueConcurrency = Number(process.env.SCRIPT_QUEUE_CONCURRENCY) || 1;

const getLogFilePath = (runId) => {
    return path.join(LOG_DIR, `${runId}.log`)
};

/**
 * Appends log entries into MongoDB buckets of 500 without losing any historical logs.
 */
const appendLogsToDb = async (req, runId, entries, byteOffset = null) => {
    let list = Array.isArray(entries) ? entries : [entries];

    if (!list.length) {
        return;
    }

    const ad = await session.details(req);
    const logModel = await utils.getModel(req);
    const runModel = await utils.getModel(req, 'run');
    const ud = {
        uId: ad.anonId,
        aId: ad.anonId
    }

    list = list.map(lg => {
        return {
            ...lg,
            ud: ud,
            ts: new Date()
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
        }
    };

    await runModel.findByIdAndUpdate(runId, runUpdate);
};

const broadcastToWatcher = (req, runId, entry) => {
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
 * Creates or returns the single shared watcher for a runId.
 */
const ensureWatcher = async (req, runDoc) => {
    let runId = String(runDoc._id);

    if (watchers.has(runId)) {
        let existing = watchers.get(runId);
        existing.status = runDoc.status;

        if (runDoc.pid) {
            existing.pid = runDoc.pid;
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
        cmd: runDoc.cmd,
        pid: runDoc.pid,
        mode: runDoc.mode,
        clients: new Set(),
        pendingFinalize: null,
        status: runDoc.status,
        batchId: runDoc.batchId,
        exitCode: runDoc.exitCode,
        offset: runDoc.byteOffset || 0,
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
                    client.res.write(
                        `data: ${JSON.stringify({
                            type: 'completed',
                            batchId: state.batchId,
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

            runQueue(req);
        }
    };

    const flushFileToDb = async (isFinal = false) => {
        const stat = await fsp.stat(logFile).catch(() => null);
        if (!stat || stat.size <= state.offset) {
            if (isFinal) {
                const rem = decoder.end();
                if (rem) {
                    const entry = {
                        msg: rem,
                        type: 'log'
                    };
                    broadcastToWatcher(req, runId, entry);
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
                    const entry = {
                        msg: text,
                        type: 'log'
                    };
                    entries.push(entry);
                    broadcastToWatcher(req, runId, entry);
                }
            }

            if (isFinal) {
                const rem = decoder.end();
                if (rem) {
                    const entry = {
                        msg: rem,
                        type: 'log'
                    };
                    entries.push(entry);
                    broadcastToWatcher(req, runId, entry);
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

        const type = (finalStatus === 'stopped') ? 'cancelled' : (finalStatus === 'failed' ? 'error' : 'done');
        const msg = customMsg || (finalStatus === 'stopped' ? 'Cancelled by user' : `Process exited with code ${exitCode ?? 0}`);

        const entry = { type, msg, ts: new Date() };
        const runModel = await utils.getModel(req, 'run')
        await appendLogsToDb(req, runId, entry, state.offset);
        await runModel.findByIdAndUpdate(runId, {
            $set: {
                exitCode,
                status: finalStatus,
                byteOffset: state.offset
            }
        });

        broadcastToWatcher(req, runId, entry);
        await cleanupWatcher(true);
    };

    // Serialized finalize so it never collides with an active flushFileToDb tick
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

            if (state.status === 'running' && !phelpers.isPidAlive(state.pid)) {
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
const launchRun = async (req, runDoc) => {
    const runId = String(runDoc._id);
    const logFile = getLogFilePath(runId);
    const watcher = await ensureWatcher(req, runDoc);

    try {
        const pid = await phelpers.spawnDetachedCommand(req, {
            cmd: runDoc.cmd,
            cwd: runDoc.cwd,
            env: runDoc.env,
            logFile: logFile,
            onExit: (code) => {
                if (!watcher.closed && watcher.status === 'running') {
                    watcher.exitCode = code;
                    watcher.finalize((code === 0 ? 'completed' : 'failed'), code).catch(() => { });
                }
            },
        });

        runDoc.pid = pid;
        runDoc.status = 'running';
        await runDoc.save();
        watcher.pid = pid;
        watcher.status = 'running';
        const startEntry = {
            type: 'started',
            msg: `Started "${runDoc.cmd}" (PID: ${pid})`
        };

        await appendLogsToDb(req, runId, startEntry);
        broadcastToWatcher(req, runId, startEntry);
    } catch (err) {
        await watcher.finalize('failed', 1, `Failed to start: ${err.message}`);
    }

    return runDoc;
};

/**
 * Queue Scheduler: Starts queued jobs in FIFO order up to `maxQueueConcurrency`.
 */
const runQueue = async (req) => {
    if (!queueLock) {
        queueLock = true;
        let runModel = await utils.getModel(req, 'run');

        try {
            while (true) {
                const runningQueueCount = await runModel.countDocuments({
                    mode: 'queue',
                    status: 'running',
                });

                const availableSlots = maxQueueConcurrency - runningQueueCount;

                if (availableSlots <= 0) {
                    break;
                }

                const nextQueuedRuns = await runModel.find({
                    mode: 'queue',
                    status: 'queued',
                }).sort({ createdAt: 1 }).limit(availableSlots);

                if (!nextQueuedRuns.length) {
                    break;
                }

                for (const runDoc of nextQueuedRuns) {
                    await launchRun(req, runDoc);
                }
            }
        } catch (err) {
            console.error('Queue scheduler error:', err.message);
        } finally {
            queueLock = false;
        }
    }
};

/**
 * Attaches an Express SSE response to 1 or multiple runs (queue or parallel).
 */
const attachStream = async (req, res, runDocs) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders?.();

    const docs = Array.isArray(runDocs) ? runDocs : [runDocs];
    const activeDocs = docs.filter((d) => ['queued', 'running'].includes(d.status));

    if (!activeDocs.length) {
        res.write(
            `data: ${JSON.stringify({
                type: 'batch_done',
                msg: 'All processes already finished'
            })}\n\n`
        );
        return res.end();
    }

    // Keep-alive ping every 15s so reverse proxies never drop idle streams
    const heartbeat = setInterval(() => {
        if (!res.writableEnded) {
            res.write(': ping\n\n');
        }
    }, HEARTBEAT_MS);

    const client = {
        res,
        heartbeat,
        activeRuns: new Set(activeDocs.map((d) => String(d._id))),
    };

    for (const doc of activeDocs) {
        let watcher = await ensureWatcher(req, doc);
        watcher.clients.add(client);

        res.write(
            `data: ${JSON.stringify({
                cmd: doc.cmd,
                mode: doc.mode,
                ts: new Date(),
                batchId: doc.batchId,
                runId: watcher.runId,
                type: watcher.status === 'queued' ? 'queued' : 'start',
                msg: watcher.status === 'queued' ? 'Waiting in queue...' : `Running (PID: ${watcher.pid})`
            })}\n\n`
        );
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

const stopWatcher = async (runId, reason = 'Cancelled by user') => {
    const watcher = watchers.get(String(runId));
    if (watcher) {
        await watcher.finalize('stopped', -1, reason);
        return true;
    }
    return false;
};

const resumeRunningJobsOnBoot = async () => {
    try {
        const runningDocs = await ScriptRun.find({ status: 'running' });

        for (const doc of runningDocs) {
            const watcher = ensureWatcher(doc);
            if (!phelpers.isPidAlive(doc.pid)) {
                await watcher.finalize('completed', 0);
            }
        }

        await runQueue();
    } catch (err) {
        console.error('Boot recovery error:', err.message);
    }
};


exports.runQueue = runQueue;
exports.launchRun = launchRun;
exports.stopWatcher = stopWatcher;
exports.attachStream = attachStream;
exports.ensureWatcher = ensureWatcher;
exports.appendLogsToDb = appendLogsToDb;
exports.resumeRunningJobsOnBoot = resumeRunningJobsOnBoot;