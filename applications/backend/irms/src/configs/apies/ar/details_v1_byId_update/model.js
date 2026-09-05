const mconf = require('./../model')

module.exports = async (req) => {
    return {
        query:req.helpers.json.val(mconf, 'query.byId'),
        response:req.helpers.json.val(mconf, 'response'),
        signature:req.helpers.json.val(mconf, 'signature'),
        validation:req.helpers.json.val(mconf, 'validation'),
        schema:req.helpers.json.val(mconf, 'schema.update'),
        md5Hash:{
            codeHash:req.helpers.json.val(mconf, 'md5Hash.codeHash'),
            nameHash:req.helpers.json.val(mconf, 'md5Hash.nameHash')
        }
    }
}