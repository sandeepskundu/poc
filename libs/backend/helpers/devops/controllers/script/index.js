/*--const crypto = require('crypto');
const ScriptRun = require('./../../dest/ScriptLogBucket');
const ScriptLogBucket = require('./../../dest/ScriptLogBucket');
const { isPidAlive, killProcessTree } = require('./../../helpers/process');
const {
    setQueueConcurrency,
    appendLogsToDb,
    ensureWatcher,
    launchRun,
    processQueue,
    attachRunsToStream,
    terminateWatcher,
} = require('./../../services/script/stream');

const parseRequestPayload = (req) => {
    const payload = req.body?.data || req.body || {};
    const mode = payload.mode === 'parallel' ? 'parallel' : 'queue';
    const defaultCwd = payload.cwd || '';
    const defaultEnv = payload.env || {};
    const defaultMeta = payload.meta || {};

    if (payload.concurrency) {
        setQueueConcurrency(Number(payload.concurrency));
    }

    const rawItems = Array.isArray(payload.commands || payload.scripts)
        ? payload.commands || payload.scripts
        : [payload.cmd || payload.command || payload.script];

    const tasks = rawItems
        .map((item) => {
            if (!item) return null;
            if (typeof item === 'string') {
                const cmd = item.trim();
                return cmd ? { cmd, cwd: defaultCwd, env: defaultEnv, meta: defaultMeta } : null;
            }
            const cmd = `${item.cmd || item.command || item.script || ''}`.trim();
            if (!cmd) return null;

            return {
                cmd,
                cwd: item.cwd || defaultCwd,
                env: { ...defaultEnv, ...(item.env || {}) },
                meta: { ...defaultMeta, ...(item.meta || {}) },
            };
        })
        .filter(Boolean);

    return {
        mode,
        stream: Boolean(payload.stream || req.query.stream === 'true'),
        tasks,
    };
};

/**
 * POST /api/script/run
 * /
const runScripts = async (req, res) => {
    try {
        const { mode, stream, tasks } = parseRequestPayload(req);

        if (!tasks.length) {
            return res.status(400).json({
                ok: false,
                msg: 'Please provide at least one command in `cmd` or `commands`.',
            });
        }

        const batchId = crypto.randomUUID();
        const createdRuns = [];

        for (const task of tasks) {
            const runDoc = await ScriptRun.create({
                batchId,
                cmd: task.cmd,
                cwd: task.cwd,
                env: task.env,
                meta: task.meta,
                mode,
                status: 'queued',
            });

            ensureWatcher(runDoc);

            await appendLogsToDb(String(runDoc._id), {
                type: 'queued',
                msg: `Queued "${task.cmd}"`,
                ts: new Date(),
            });

            createdRuns.push(runDoc);
        }

        // Attach SSE stream BEFORE launching processes so fast commands never miss events
        if (stream) {
            attachRunsToStream(createdRuns, req, res);
        }

        if (mode === 'parallel') {
            await Promise.all(createdRuns.map((doc) => launchRun(doc)));
        } else {
            await processQueue();
        }

        if (stream) return;

        return res.status(200).json({
            ok: true,
            batchId,
            mode,
            runs: createdRuns.map((r) => ({
                runId: r._id,
                cmd: r.cmd,
                cwd: r.cwd,
                mode: r.mode,
                status: r.status,
                pid: r.pid,
            })),
        });
    } catch (err) {
        if (!res.headersSent) {
            return res.status(500).json({ ok: false, msg: err.message });
        }
        res.end();
    }
};

/**
 * GET /api/script/stream/:runId
 * /
const streamRun = async (req, res) => {
    try {
        const { runId } = req.params;
        const runDoc = await ScriptRun.findById(runId);

        if (!runDoc) {
            return res.status(404).json({ ok: false, msg: 'Run not found.' });
        }

        return attachRunsToStream([runDoc], req, res);
    } catch (err) {
        return res.status(500).json({ ok: false, msg: err.message });
    }
};

/**
 * GET /api/script/stream-batch/:batchId
 */
const streamBatch = async (req, res) => {
    try {
        const { batchId } = req.params;
        const runDocs = await ScriptRun.find({ batchId }).sort({ createdAt: 1 });

        if (!runDocs.length) {
            return res.status(404).json({ ok: false, msg: 'Batch not found.' });
        }

        return attachRunsToStream(runDocs, req, res);
    } catch (err) {
        return res.status(500).json({ ok: false, msg: err.message });
    }
};

/**
 * POST /api/script/cancel/:runId
 * /
const cancelRun = async (req, res) => {
    try {
        const runId = String(req.params.runId || req.body?.runId || '');
        const runDoc = await ScriptRun.findById(runId);

        if (!runDoc) {
            return res.status(404).json({ ok: false, msg: 'Run not found.' });
        }

        if (runDoc.pid && isPidAlive(runDoc.pid)) {
            killProcessTree(runDoc.pid);
        }

        const handledByWatcher = await terminateWatcher(runId, 'Cancelled by user');

        if (!handledByWatcher && ['queued', 'running'].includes(runDoc.status)) {
            runDoc.status = 'stopped';
            runDoc.exitCode = -1;
            await runDoc.save();
            await appendLogsToDb(runId, {
                type: 'cancelled',
                msg: 'Cancelled by user',
                ts: new Date(),
            });
            await processQueue();
        }

        return res.status(200).json({ ok: true, runId, msg: 'Process cancelled.' });
    } catch (err) {
        return res.status(500).json({ ok: false, msg: err.message });
    }
};

/**
 * POST /api/script/cancel-batch/:batchId
 * /
const cancelBatch = async (req, res) => {
    try {
        const { batchId } = req.params;
        const activeRuns = await ScriptRun.find({
            batchId,
            status: { $in: ['queued', 'running'] },
        });

        for (const runDoc of activeRuns) {
            const runId = String(runDoc._id);
            if (runDoc.pid && isPidAlive(runDoc.pid)) {
                killProcessTree(runDoc.pid);
            }

            const handled = await terminateWatcher(runId, 'Batch cancelled by user');
            if (!handled) {
                runDoc.status = 'stopped';
                runDoc.exitCode = -1;
                await runDoc.save();
            }
        }

        await processQueue();

        return res.status(200).json({
            ok: true,
            batchId,
            cancelledCount: activeRuns.length,
        });
    } catch (err) {
        return res.status(500).json({ ok: false, msg: err.message });
    }
};

/**
 * GET /api/script/history
 * GET /api/script/history/:runId?bucket=1
 * /
const getHistory = async (req, res) => {
    try {
        const { runId } = req.params;

        if (runId) {
            const run = await ScriptRun.findById(runId).lean();
            if (!run) {
                return res.status(404).json({ ok: false, msg: 'Run not found.' });
            }

            const bucketPage = parseInt(req.query.bucket, 10);
            let query = ScriptLogBucket.find({ runId }).sort({ _id: 1 });

            if (bucketPage > 0) {
                query = query.skip(bucketPage - 1).limit(1);
            }

            const buckets = await query.lean();
            run.logs = buckets.flatMap((b) => b.logs);
            run.bucketCount = await ScriptLogBucket.countDocuments({ runId });

            return res.status(200).json({ ok: true, data: run });
        }

        const filter = {};
        if (req.query.status) filter.status = req.query.status;
        if (req.query.batchId) filter.batchId = req.query.batchId;
        if (req.query.mode) filter.mode = req.query.mode;

        const limit = Math.min(parseInt(req.query.limit, 10) || 20, 100);
        const list = await ScriptRun.find(filter).sort({ createdAt: -1 }).limit(limit).lean();

        return res.status(200).json({ ok: true, data: list });
    } catch (err) {
        return res.status(500).json({ ok: false, msg: err.message });
    }
};

/*--
module.exports = {
    runScripts,
    streamRun,
    streamBatch,
    cancelRun,
    cancelBatch,
    getHistory,
};--*/

exports.run = require('./run');
exports.history = require('./history');