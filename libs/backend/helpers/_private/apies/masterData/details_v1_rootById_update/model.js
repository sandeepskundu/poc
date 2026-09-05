
const mconf = require('./../model')

module.exports = async (req) => {
    return {
        query:req.helpers.json.val(mconf, 'query.byId'),
        response:req.helpers.json.val(mconf, 'response'),
        signature:req.helpers.json.val(mconf, 'signature'),
        values:req.helpers.json.val(mconf, 'values.parentDetail'),
        schema:req.helpers.json.val(mconf, 'schemaByType.update'),
        md5Hash:{
            nameHashId:req.helpers.json.val(mconf, 'md5Hash.rootNameHashId')
        },
        valuemap:{
            name:req.helpers.json.val(mconf, 'valuemap.name'),
            hasChilds:req.helpers.json.val(mconf, 'valuemap.hasChilds'),
            parentId:req.helpers.json.val(mconf, 'valuemap.rootParentId'),
            isAccessControlled:req.helpers.json.val(mconf, 'valuemap.isAccessControlled')
        }
    }
}