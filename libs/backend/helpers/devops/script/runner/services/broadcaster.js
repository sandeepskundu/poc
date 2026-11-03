const { EVENT_TYPES, HEARTBEAT_MS } = require('./constants');

// Shared in-memory registry of active run watchers
const watchers = new Map();

const getWatcher = (runId) => watchers.get(String(runId));
const setWatcher = (runId, state) => watchers.set(String(runId), state);
const hasWatcher = (runId) => watchers.has(String(runId));
const deleteWatcher = (runId) => watchers.delete(String(runId));

/**
 * Broadcasts a single event payload to all connected SSE clients for a runId.
 */
const broadcast = (req, runId, entry) => {
    const state = getWatcher(runId);

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
 * Attaches an Express SSE response to 1 or multiple runs (queue or parallel).
 */
const attachStream = async (req, res, runDocs, { ensureWatcher, recordInitialLifecycle, runQueue }) => {
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

    if (hasQueued) {
        runQueue(req);
    }

    req.on('close', () => {
        clearInterval(heartbeat);
        for (const doc of activeDocs) {
            const w = getWatcher(doc._id);
            if (w) {
                w.clients.delete(client);
            }
        }
    });
};

exports.watchers = watchers;
exports.broadcast = broadcast;
exports.getWatcher = getWatcher;
exports.setWatcher = setWatcher;
exports.hasWatcher = hasWatcher;
exports.attachStream = attachStream;
exports.deleteWatcher = deleteWatcher;
