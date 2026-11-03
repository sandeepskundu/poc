// GET /api/script/history & GET /api/script/history/:runId?bucket=1

const utils = require('./utils');
const service = require('./service');

const init = async (req, res, next) => {
    try {
        let id = "6ae8ed7330358fa78786e95b";
        let bucket = await utils.getModel(req);
        let model = await utils.getModel(req, 'run');
        let doc = await model.findById(id).lean();

        if(!doc){
            req.helpers.express.response.noResult(req, res, next);
        }else{
            let page = parseInt(req.query.bucket, 10);
            let q = bucket.find({runId:id}).sort({ _id: 1 });

            if(page > 0){
                q = q.skip(page - 1).limit(1)   
            }

            let buckets = await q.lean();
                doc.logs = buckets.flatMap((b) => b.logs);
                doc.bucketCount = await bucket.countDocuments({runId:id});

                req.helpers.express.response.respByCode(200, req, res, next, req.helpers.express.response.getRespByCode(200, req, res, next, {
                    data:doc
                }))
            
            return;
        }

        /*--
        const { runId } = req.params; // "6ae8b70ebc5032dd6523164a" bId = "6ae8b70ebc5032dd65231649"
        if (runId) {
            const doc = await ScriptRun.findById(runId).lean();
            if (!doc) return res.status(404).json({ ok: false, msg: 'Not found.' });
            const page = parseInt(req.query.bucket, 10);
            let q = ScriptLogBucket.find({ runId }).sort({ _id: 1 });
            if (page > 0) q = q.skip(page - 1).limit(1);
            const buckets = await q.lean();
            doc.logs = buckets.flatMap((b) => b.logs);
            doc.bucketCount = await ScriptLogBucket.countDocuments({ runId });
            return res.status(200).json({ ok: true, data: doc });
        }
        const filter = {};
        if (req.query.status) filter.status = req.query.status;
        if (req.query.batchId) filter.batchId = req.query.batchId;
        const list = await ScriptRun.find(filter).sort({ createdAt: -1 }).limit(20).lean();
        return res.status(200).json({ ok: true, data: list });--*/
    } catch (e) {
        return res.status(500).json({ok: false, msg: e.message });
    }
};

exports.init = init;