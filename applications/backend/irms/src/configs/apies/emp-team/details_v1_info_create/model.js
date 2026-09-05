const mconf = require('./../model')

module.exports = async (req) => {
    return {
        response:req.helpers.json.val(mconf, 'response'),
        signature:req.helpers.json.val(mconf, 'signature'),
        validation:req.helpers.json.val(mconf, 'validation'),
        schema:req.helpers.json.val(mconf, 'schema.default'),
        md5Hash:{
            uniqueHash:req.helpers.json.val(mconf, 'md5Hash.uniqueHash')
        }
    }
}