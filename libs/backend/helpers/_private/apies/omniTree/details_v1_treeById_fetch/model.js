const model = require('./../model')

module.exports = async (req, routeConf, globalConf) => {
    const mconf = await model.compile(req, routeConf, globalConf);

    return {
        name:req.helpers.json.val(mconf, 'name'),
        query:req.helpers.json.val(mconf, 'query.mapId'),
        response:req.helpers.json.val(mconf, 'response'),
        signature:req.helpers.json.val(mconf, 'signature'),
        schema:req.helpers.json.val(mconf, 'schema.default'),
    }
}