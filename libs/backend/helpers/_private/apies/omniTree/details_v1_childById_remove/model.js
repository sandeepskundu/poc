const model = require('./../model')

module.exports = async (req, routeConf, globalConf) => {
    const mconf = await model.compile(req, routeConf, globalConf);

    return {
        name:req.helpers.json.val(mconf, 'name'),
        audit:req.helpers.json.val(mconf, 'audit'),
        query:req.helpers.json.val(mconf, 'query.byId'),
        response:req.helpers.json.val(mconf, 'response'),
    }
}