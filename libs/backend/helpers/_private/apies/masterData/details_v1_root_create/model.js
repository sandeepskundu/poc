
const mconf = require('./../model')

module.exports = async (req) => {
    return {
        schema:req.helpers.json.val(mconf, 'schema'),
        response:req.helpers.json.val(mconf, 'response'),
        signature:req.helpers.json.val(mconf, 'signature'),
        validation:req.helpers.json.val(mconf, 'validation'),
        values:req.helpers.json.val(mconf, 'values.parentDetail'),
        md5Hash:{
            hashId:req.helpers.json.val(mconf, 'md5Hash.rootHashId'),
            codeHash:req.helpers.json.val(mconf, 'md5Hash.rootCodeHash'),
            nameHashId:req.helpers.json.val(mconf, 'md5Hash.rootNameHashId')
        },
        valuemap:{
            code:req.helpers.json.val(mconf, 'valuemap.code'),
            name:req.helpers.json.val(mconf, 'valuemap.name'),
            hasChilds:req.helpers.json.val(mconf, 'valuemap.hasChilds'),
            parentId:req.helpers.json.val(mconf, 'valuemap.rootParentId'),
            isAccessControlled:req.helpers.json.val(mconf, 'valuemap.isAccessControlled')
        }
    }
}