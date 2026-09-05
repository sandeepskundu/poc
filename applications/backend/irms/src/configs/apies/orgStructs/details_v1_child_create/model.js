const mconf = require('./../model')

module.exports = async (req) => {
    return {
        schema:req.helpers.json.val(mconf, 'schema'),
        response:req.helpers.json.val(mconf, 'response'),
        signature:req.helpers.json.val(mconf, 'signature'),
        validation:req.helpers.json.val(mconf, 'validation'),
        values:req.helpers.json.val(mconf, 'values.parentDetail'),
        md5Hash:{
            hashId:req.helpers.json.val(mconf, 'md5Hash.itemHashId'),
            nameHashId:req.helpers.json.val(mconf, 'md5Hash.nameHashId'),
            codeHash:req.helpers.json.val(mconf, 'md5Hash.childCodeHash'),
            typeHash:req.helpers.json.val(mconf, 'md5Hash.childTypeHash'),
        }
    }
}