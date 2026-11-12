
const mconf = require('./../model')

module.exports = async (req) => {
    return {
        name:req.helpers.json.val(mconf, 'name'),
        response:req.helpers.json.val(mconf, 'response'),
        signature:req.helpers.json.val(mconf, 'signature'),
        query:req.helpers.json.val(mconf, 'query.byMerchantHash'),
    }

};