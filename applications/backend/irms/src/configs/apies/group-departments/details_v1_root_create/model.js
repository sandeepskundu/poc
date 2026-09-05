
const mconf = require('./../model')

module.exports = async (req) => {
    return {
        schema:req.helpers.json.val(mconf, 'schema.default'),
        values:req.helpers.json.val(mconf, 'values.root'),
        response:req.helpers.json.val(mconf, 'response'),
        signature:req.helpers.json.val(mconf, 'signature'),
        validation:req.helpers.json.val(mconf, 'validation'),
        md5Hash:{
            hashId:req.helpers.json.val(mconf, 'md5Hash.rootHashId'),
            codeHash:req.helpers.json.val(mconf, 'md5Hash.rootCodeHash'),
            nameHashId:req.helpers.json.val(mconf, 'md5Hash.rootNameHashId')
        },
        valuemap:{
            parentId:req.helpers.json.val(mconf, 'valuemap.rootParentId'),
        }
    }
}