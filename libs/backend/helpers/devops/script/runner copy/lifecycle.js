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


const constants = {
    BUCKET_SIZE:500
}

const user = async (req) => {
    const ad = req ? await session.details(req) : { anonId: 'system' };

    return {
        uId: ad?.anonId || 'system',
        aId: ad?.anonId || 'system'
    };
};

const appendLog = async (req, runId, entries, byteOffset = null) => {
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

    for (let i = 0; i < list.length; i += constants.BUCKET_SIZE) {
        let chunk = list.slice(i, i + constants.BUCKET_SIZE);

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

const initByType = async (req, doc, append, broadcast, type, message) => {
    let id = String(doc._id);
    await appendLog()
}

exports.initByType = initByType;