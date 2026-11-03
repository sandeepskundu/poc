const utils = require('./../utils');
const fsp = require('fs/promises');
const phelpers = require('./../process');
const { StringDecoder } = require('string_decoder');
const { parseLogChunk, appendLogsToDb } = require('./logger');
const { broadcast, getWatcher, setWatcher, hasWatcher, deleteWatcher } = require('./broadcaster');
const { EVENT_TYPES, MAX_CHUNK_BYTES, DEFAULT_TIMEOUT_MS, getLogFilePath } = require('./constants');

/**
 * Checks if a PID is alive safely regardless of how phelpers.isPidAlive is structured.
 */
const checkPidAlive = async (req, pid) => {
    if (!pid || pid <= 0) return false;
    try {
        const res = await phelpers.isPidAlive(req, null, pid);
        return Boolean(res);
    } catch (_) {
        return false;
    }
};

/**
 * Creates or returns the single shared watcher for a runId.
 */
const ensureWatcher = async (req, doc, onWatcherClosed) => {
    let runId = String(doc._id);

    if (hasWatcher(runId)) {
        let existing = getWatcher(runId);
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
        }
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
        deleteWatcher(runId);

        if (deleteLogFile) {
            await fsp.unlink(logFile).catch(() => { });
        }

        if (typeof onWatcherClosed === 'function') {
            onWatcherClosed(req);
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

    setWatcher(runId, state);
    return state;
};

const stopWatcher = async (runId, reason = 'Stopped by user') => {
    const watcher = getWatcher(runId);
    if (watcher) {
        if (watcher.pid) {
            await phelpers.killProcessTree(null, null, watcher.pid);
        }
        await watcher.finalize('stopped', -1, reason);
        return true;
    }
    return false;
};

exports.stopWatcher = stopWatcher;
exports.checkPidAlive = checkPidAlive;
exports.ensureWatcher = ensureWatcher;
