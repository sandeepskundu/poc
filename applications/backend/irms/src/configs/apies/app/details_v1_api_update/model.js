const model = require('./../model');

const schema = async (req) => {
    let ui = req.helpers.json.val(model, 'schema.ui', {});
    let common = req.helpers.json.val(model, 'schema.common', {});

    return req.helpers.json.merge(common, ui)
}

module.exports = async (req) => {
    return {
        response:model.response,
        schema:await schema(req),
        query:model.query.getById,
        signature:model.signature.create,
        md5Hash:req.helpers.json.val(model, 'md5Hash', {}),
        valuemap:req.helpers.json.val(model, 'valuemap.defaultValMap', {}),
    }
}