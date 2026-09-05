const mconf = require('./../model')

module.exports = async (req) => {
    return {
        query:req.helpers.json.val(mconf, 'query.byId'),
        response:req.helpers.json.val(mconf, 'response'),
        signature:req.helpers.json.val(mconf, 'signature'),
        validation:req.helpers.json.val(mconf, 'validation'),
        schema:req.helpers.json.val(mconf, 'schemaByType.update'),
        md5Hash:{
            nameHashId:req.helpers.json.val(mconf, 'md5Hash.nameHashId'),
            roleAndPresetHash:req.helpers.json.val(mconf, 'md5Hash.roleAndPresetHash')
        }
    }
}