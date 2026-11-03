const fs = require('fs');
const fsp = require('fs/promises');
const os = require('os');
const path = require('path');
const { StringDecoder } = require('string_decoder');
const ScriptRun = require('./../../dest/ScriptLogBucket');
const ScriptLogBucket = require('./../../dest/ScriptLogBucket');
const { isPidAlive, spawnDetachedCommand } = require('./../../helpers/process');

// Uses OS temp folder (/tmp) so project file watchers (nodemon/webpack) are never triggered
const LOG_DIR = path.join(os.tmpdir(), 'express-script-logs');
const MAX_CHUNK_BYTES = 64 * 1024;
const BUCKET_SIZE = 500;
const HEARTBEAT_MS = 15000;

if (!fs.existsSync(LOG_DIR)) fs.mkdirSync(LOG_DIR, { recursive: true });

const watchers = new Map();
let queueLock = false;
let maxQueueConcurrency = Number(process.env.SCRIPT_QUEUE_CONCURRENCY) || 1;

const getLogFilePath = (runId) => path.join(LOG_DIR, `${runId}.log`);

const setQueueConcurrency = (n) => {
    if (Number.isInteger(n) && n > 0) maxQueueConcurrency = n;
};

/**
 * Appends log entries into MongoDB buckets of 500 without losing any historical logs.
 */
const appendLogsToDb = async (runId, entries, byteOffset = null) => {
    const list = Array.isArray(entries) ? entries : [entries];
    if (!list.length) return;

    for (let i = 0; i < list.length; i += BUCKET_SIZE) {
        const chunk = list.slice(i, i + BUCKET_SIZE);
        await ScriptLogBucket.findOneAndUpdate(
            { runId, count: { $lte: BUCKET_SIZE - chunk.length } },
            {
                $setOnInsert: { runId },
                $inc: { count: chunk.length },
                $push: { logs: { $each: chunk } },
            },
            { upsert: true, sort: { _id: -1 } }
        );
    }

    const runUpdate = { $inc: { totalLogs: list.length } };
    if (byteOffset !== null) runUpdate.$set = { byteOffset };
    await ScriptRun.findByIdAndUpdate(runId, runUpdate);
};

const broadcastToWatcher = (runId, entry) => {
    const state = watchers.get(String(runId));
    if (!state) return;

    const payload = `data: ${JSON.stringify({
        batchId: state.batchId,
        runId: state.runId,
        cmd: state.cmd,
        mode: state.mode,
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
const ensureWatcher = (runDoc) => {
    const runId = String(runDoc._id);
    if (watchers.has(runId)) {
        const existing = watchers.get(runId);
        if (runDoc.pid) existing.pid = runDoc.pid;
        existing.status = runDoc.status;
        return existing;
    }

    const logFile = getLogFilePath(runId);
    const decoder = new StringDecoder('utf8');

    const state = {
        runId,
        batchId: runDoc.batchId,
        cmd: runDoc.cmd,
        mode: runDoc.mode,
        pid: runDoc.pid,
        status: runDoc.status,
        exitCode: runDoc.exitCode,
        offset: runDoc.byteOffset || 0,
        clients: new Set(),
        busy: false,
        closed: false,
        pendingFinalize: null,
        timer: null,
        finalize: null,
    };

    const cleanupWatcher = async (deleteLogFile = false) => {
        if (state.closed) return;
        state.closed = true;
        clearInterval(state.timer);

        for (const client of state.clients) {
            client.activeRuns.delete(runId);
            if (client.activeRuns.size === 0 && !client.res.writableEnded) {
                clearInterval(client.heartbeat);
                client.res.write(
                    `data: ${JSON.stringify({
                        batchId: state.batchId,
                        type: 'batch_done',
                        msg: 'All processes finished',
                        ts: new Date(),
                    })}\n\n`
                );
                client.res.end();
            }
        }

        state.clients.clear();
        watchers.delete(runId);

        if (deleteLogFile) {
            await fsp.unlink(logFile).catch(() => {});
        }

        processQueue();
    };

    const flushFileToDb = async (isFinal = false) => {
        const stat = await fsp.stat(logFile).catch(() => null);
        if (!stat || stat.size <= state.offset) {
            if (isFinal) {
                const rem = decoder.end();
                if (rem) {
                    const entry = { type: 'log', msg: rem, ts: new Date() };
                    broadcastToWatcher(runId, entry);
                    await appendLogsToDb(runId, entry, state.offset);
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
                    const entry = { type: 'log', msg: text, ts: new Date() };
                    entries.push(entry);
                    broadcastToWatcher(runId, entry);
                }
            }

            if (isFinal) {
                const rem = decoder.end();
                if (rem) {
                    const entry = { type: 'log', msg: rem, ts: new Date() };
                    entries.push(entry);
                    broadcastToWatcher(runId, entry);
                }
            }
        } finally {
            await fh.close();
        }

        if (entries.length) {
            await appendLogsToDb(runId, entries, state.offset);
        }
    };

    const executeFinalize = async ({ finalStatus, exitCode = 0, customMsg = null }) => {
        if (state.closed) return;
        state.status = finalStatus;
        state.exitCode = exitCode;

        await flushFileToDb(true);

        const type =
            finalStatus === 'stopped'
                ? 'cancelled'
                : finalStatus === 'failed'
                ? 'error'
                : 'done';

        const msg =
            customMsg ||
            (finalStatus === 'stopped'
                ? 'Cancelled by user'
                : `Process exited with code ${exitCode ?? 0}`);

        const entry = { type, msg, ts: new Date() };

        await appendLogsToDb(runId, entry, state.offset);
        await ScriptRun.findByIdAndUpdate(runId, {
            $set: { status: finalStatus, exitCode, byteOffset: state.offset },
        });

        broadcastToWatcher(runId, entry);
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

            if (state.status === 'running' && !isPidAlive(state.pid)) {
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
                await executeFinalize(pending).catch(() => {});
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
const launchRun = async (runDoc) => {
    const runId = String(runDoc._id);
    const logFile = getLogFilePath(runId);
    const watcher = ensureWatcher(runDoc);

    try {
        const pid = spawnDetachedCommand({
            cmd: runDoc.cmd,
            cwd: runDoc.cwd,
            env: runDoc.env,
            logFile,
            onExit: (code) => {
                if (!watcher.closed && watcher.status === 'running') {
                    watcher.exitCode = code;
                    const finalStatus = code === 0 ? 'completed' : 'failed';
                    watcher.finalize(finalStatus, code).catch(() => {});
                }
            },
        });

        runDoc.pid = pid;
        runDoc.status = 'running';
        await runDoc.save();

        watcher.pid = pid;
        watcher.status = 'running';

        const startEntry = {
            type: 'start',
            msg: `Started "${runDoc.cmd}" (PID: ${pid})`,
            ts: new Date(),
        };

        await appendLogsToDb(runId, startEntry);
        broadcastToWatcher(runId, startEntry);
    } catch (err) {
        await watcher.finalize('failed', 1, `Failed to start: ${err.message}`);
    }

    return runDoc;
};

/**
 * Queue Scheduler: Starts queued jobs in FIFO order up to `maxQueueConcurrency`.
 */
const processQueue = async () => {
    if (queueLock) return;
    queueLock = true;

    try {
        while (true) {
            const runningQueueCount = await ScriptRun.countDocuments({
                mode: 'queue',
                status: 'running',
            });

            const availableSlots = maxQueueConcurrency - runningQueueCount;
            if (availableSlots <= 0) break;

            const nextQueuedRuns = await ScriptRun.find({
                mode: 'queue',
                status: 'queued',
            })
                .sort({ createdAt: 1 })
                .limit(availableSlots);

            if (!nextQueuedRuns.length) break;

            for (const runDoc of nextQueuedRuns) {
                await launchRun(runDoc);
            }
        }
    } catch (err) {
        console.error('Queue scheduler error:', err.message);
    } finally {
        queueLock = false;
    }
};

/**
 * Attaches an Express SSE response to 1 or multiple runs (queue or parallel).
 */
const attachRunsToStream = (runDocs, req, res) => {
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
                msg: 'All processes already finished',
                ts: new Date(),
            })}\n\n`
        );
        return res.end();
    }

    // Keep-alive ping every 15s so reverse proxies never drop idle streams
    const heartbeat = setInterval(() => {
        if (!res.writableEnded) res.write(': ping\n\n');
    }, HEARTBEAT_MS);

    const client = {
        res,
        heartbeat,
        activeRuns: new Set(activeDocs.map((d) => String(d._id))),
    };

    for (const doc of activeDocs) {
        const watcher = ensureWatcher(doc);
        watcher.clients.add(client);

        res.write(
            `data: ${JSON.stringify({
                cmd:doc.cmd,
                mode:doc.mode,
                ts:new Date(),
                batchId:doc.batchId,
                runId:watcher.runId,
                type:watcher.status === 'queued' ? 'queued' : 'start',
                msg:watcher.status === 'queued'?'Waiting in queue...':`Running (PID: ${watcher.pid})`
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

const terminateWatcher = async (runId, reason = 'Cancelled by user') => {
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
            if (!isPidAlive(doc.pid)) {
                await watcher.finalize('completed', 0);
            }
        }

        await processQueue();
    } catch (err) {
        console.error('Boot recovery error:', err.message);
    }
};

module.exports = {
    setQueueConcurrency,
    appendLogsToDb,
    ensureWatcher,
    launchRun,
    processQueue,
    attachRunsToStream,
    terminateWatcher,
    resumeRunningJobsOnBoot,
};