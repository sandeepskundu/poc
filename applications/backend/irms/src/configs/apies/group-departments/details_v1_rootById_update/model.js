
const mconf = require('./../model')

module.exports = async (req) => {
    return {
        query:req.helpers.json.val(mconf, 'query.byId'),
        schema:req.helpers.json.val(mconf, 'schema.update'),
        values:req.helpers.json.val(mconf, 'values.root'),
        response:req.helpers.json.val(mconf, 'response'),
        signature:req.helpers.json.val(mconf, 'signature'),
        validation:req.helpers.json.val(mconf, 'validation'),
        md5Hash:{
            codeHash:req.helpers.json.val(mconf, 'md5Hash.rootCodeHash'),
            nameHashId:req.helpers.json.val(mconf, 'md5Hash.rootNameHashId'),
        },
        valuemap:{}
    }
}