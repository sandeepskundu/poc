const mconf = require('./../model')

module.exports = async (req) => {
    return {
        response:req.helpers.json.val(mconf, 'response'),
        signature:req.helpers.json.val(mconf, 'signature'),
        values:req.helpers.json.val(mconf, 'values.infoDetails'),
        schema:req.helpers.json.val(mconf, 'schemaByType.details'),
        md5Hash:{
            hashId:req.helpers.json.val(mconf, 'md5Hash.itemHashId'),
            nameHashId:req.helpers.json.val(mconf, 'md5Hash.nameHashId'),
            codeHash:req.helpers.json.val(mconf, 'md5Hash.childCodeHash')
        },
        valuemap:{
            code:req.helpers.json.val(mconf, 'valuemap.code'),
            name:req.helpers.json.val(mconf, 'valuemap.name'),
            parentId:req.helpers.json.val(mconf, 'valuemap.parentId'),
            hasChilds:req.helpers.json.val(mconf, 'valuemap.hasChilds'),
            isAccessControlled:req.helpers.json.val(mconf, 'valuemap.isAccessControlled')
        }
    }
}