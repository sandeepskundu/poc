
const mconf = require('./../model')

module.exports = async (req) => {
    return {
        name:req.helpers.json.val(mconf, 'name'),
        response:req.helpers.json.val(mconf, 'response'),
        signature:req.helpers.json.val(mconf, 'signature'),
        schema:req.helpers.json.val(mconf, 'schema.update'),
        validation:req.helpers.json.val(mconf, 'validation'),
        query:req.helpers.json.val(mconf, 'query.byIdAndMapId'),
        md5Hash:{
            nameHash:req.helpers.json.val(mconf, 'md5Hash.nameHash')
        }
    }
};