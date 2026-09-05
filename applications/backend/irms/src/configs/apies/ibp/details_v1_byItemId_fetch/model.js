
const mconf = require('./../model')

module.exports = async (req) => {
    return {
        query:req.helpers.json.val(mconf, 'query.itemId'),
        response:req.helpers.json.val(mconf, 'response'),
        signature:req.helpers.json.val(mconf, 'signature')
    }
};