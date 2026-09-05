const mconf = require('./../model')

module.exports = async (req) => {
    return {
        response:req.helpers.json.val(mconf, 'response'),
        signature:req.helpers.json.val(mconf, 'signature'),
        schema:req.helpers.json.val(mconf, 'schema.default'),
        validation:req.helpers.json.val(mconf, 'validation'),
        md5Hash:{
            nameHash:req.helpers.json.val(mconf, 'md5Hash.nameHash'),
            codeHash:req.helpers.json.val(mconf, 'md5Hash.codeHash')
        }
    }
}