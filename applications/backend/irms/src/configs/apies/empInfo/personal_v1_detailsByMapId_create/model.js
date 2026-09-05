const mconf = require('./../model')

module.exports = async (req) => {
    return {
        response:req.helpers.json.val(mconf, 'response'),
        signature:req.helpers.json.val(mconf, 'signature'),
        schema:req.helpers.json.val(mconf, 'schema.default'),
        validation:req.helpers.json.val(mconf, 'validation'),
        //values:req.helpers.json.val(mconf, 'values.parentDetail'),
        md5Hash:{}
    }
}