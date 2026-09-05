const mconf = require('./../model')

module.exports = async (req) => {
    return {
        values:req.helpers.json.val(mconf, 'values.info'),
        response:req.helpers.json.val(mconf, 'response'),
        signature:req.helpers.json.val(mconf, 'signature'),
        validation:req.helpers.json.val(mconf, 'validation'),
        schema:req.helpers.json.val(mconf, 'schema.default'),
        md5Hash:{
            hashId:req.helpers.json.val(mconf, 'md5Hash.hashId'),
            codeHash:req.helpers.json.val(mconf, 'md5Hash.codeHash'),
            nameHash:req.helpers.json.val(mconf, 'md5Hash.nameHash')
        }
    }
}