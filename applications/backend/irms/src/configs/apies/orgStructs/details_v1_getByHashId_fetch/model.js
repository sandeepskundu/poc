
const mconf = require('./../model')

module.exports = async (req) => {
    return {
        response:req.helpers.json.val(mconf, 'response'),
        query:req.helpers.json.val(mconf, 'query.hashId'),
        signature:req.helpers.json.val(mconf, 'signature')
    }
};