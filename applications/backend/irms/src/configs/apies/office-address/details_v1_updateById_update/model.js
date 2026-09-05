const mconf = require('./../model')

module.exports = async (req) => {
    return {
        query:req.helpers.json.val(mconf, 'query.byId'),
        response:req.helpers.json.val(mconf, 'response'),
        signature:req.helpers.json.val(mconf, 'signature'),
        schema:req.helpers.json.val(mconf, 'schema.update'),
        md5Hash:{
            nameHash:req.helpers.json.val(mconf, 'md5Hash.nameHash')
        }
    }
}