// POST /api/script/cancel/:id (Supports runId or batchId)
const utils = require('./utils');
const service = require('./service');

const init = async (req, res) => {
    try {
        let id = req.params.id;
        let model = await utils.getModel(req, 'run');
        let docs = id?[await model.findById(id)].filter(Boolean):await model.find({batchId:id, status:{$in:['queued', 'running']}});

        if (!docs.length){
            return res.status(404).json({ ok: false, msg: 'Not found.' });
        }else{
            for (const doc of docs) {
                const runId = String(doc._id);
                if (doc.pid && isAlive(doc.pid)) killTree(doc.pid);
                const stopped = await service.stopWatcher(runId);
                if (!stopped && ['queued', 'running'].includes(doc.status)) {
                    doc.status = 'stopped';
                    doc.exitCode = -1;
                    await doc.save();
                    await saveLogs(runId, {
                        type:'cancelled',
                        msg:'Cancelled by user',
                        ts:new Date(),
                    });
                }
            }
            await service.runQueue();
            return res.status(200).json({ ok: true, id, cancelled: docs.length });
        }
    } catch (e) {
        return res.status(500).json({ ok: false, msg: e.message });
    }
};

exports.init = init;