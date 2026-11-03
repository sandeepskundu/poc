const utils = require('./../utils');
const phelpers = require('./../process');
const { broadcast } = require('./broadcaster');
const { appendLogsToDb } = require('./logger');
const { ensureWatcher, checkPidAlive } = require('./watcher');
const { EVENT_TYPES, MAX_QUEUE_CONCURRENCY, getLogFilePath } = require('./constants');

let queueLock = false;
let queuePending = false;

/**
 * Spawns the dynamic OS command and transitions the run from 'queued' -> 'running'.
 */
const launchRun = async (req, doc) => {
    const runId = String(doc._id);
    const logFile = getLogFilePath(runId);
    const watcher = await ensureWatcher(req, doc, runQueue);

    try {
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
 * Queue Scheduler: Starts queued jobs in FIFO order up to `MAX_QUEUE_CONCURRENCY`.
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
                    const w = await ensureWatcher(req, rDoc, runQueue);
                    await w.finalize('completed', rDoc.exitCode ?? 0);
                }
            }

            const available = MAX_QUEUE_CONCURRENCY - activeRunningCount;

            if (available <= 0) {
                break;
            }

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

const resumeRunningJobsOnBoot = async (req = null) => {
    try {
        const runModel = await utils.getModel(req, 'run');
        const runningDocs = await runModel.find({ status: 'running' });

        for (const doc of runningDocs) {
            const watcher = await ensureWatcher(req, doc, runQueue);
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

exports.runQueue = runQueue;
exports.launchRun = launchRun;
exports.resumeRunningJobsOnBoot = resumeRunningJobsOnBoot;
