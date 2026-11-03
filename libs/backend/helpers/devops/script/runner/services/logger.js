const utils = require('./../utils');
const { broadcast } = require('./broadcaster');
const { BUCKET_SIZE, EVENT_TYPES } = require('./constants');
const session = process.aioBeLibs('helpers/_private/session');

const user = async (req) => {
    const ad = req ? await session.details(req) : { anonId: 'system' };

    return {
        uId: ad?.anonId || 'system',
        aId: ad?.anonId || 'system'
    };
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
    let isList = req?.helpers?.data?.type?.is
        ? req.helpers.data.type.is(entries, 'list')
        : Array.isArray(entries);

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

exports.user = user;
exports.parseLogChunk = parseLogChunk;
exports.appendLogsToDb = appendLogsToDb;
exports.recordInitialLifecycle = recordInitialLifecycle;
