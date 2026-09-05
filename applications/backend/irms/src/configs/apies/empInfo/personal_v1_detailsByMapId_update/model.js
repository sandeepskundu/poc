const mconf = require('./../model')

module.exports = async (req) => {
    return {
        md5Hash:{},
        query:req.helpers.json.val(mconf, 'query.byMapId'),
        response:req.helpers.json.val(mconf, 'response'),
        signature:req.helpers.json.val(mconf, 'signature'),
        schema:req.helpers.json.val(mconf, 'schema.update'),
        validation:req.helpers.json.val(mconf, 'validation'),
    }
}