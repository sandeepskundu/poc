// GET /api/script/stream/:id (Supports runId or batchId)
const utils = require('./utils');
const service = require('./service');
const init = async (req, res) => {
    try {
        let id = req.params.id;
        let model = await utils.getModel(req, 'run');
        let docs = id?[await model.findById(id)].filter(Boolean):await model.find({ batchId: id }).sort({createdAt: 1});

        if(!docs.length){
            return res.status(404).json({ ok: false, msg: 'Not found.' });
        }
        return service.attachStream(req, res, docs);
    } catch (e) {
        return res.status(500).json({ ok: false, msg: e.message });
    }
};

exports.init = init