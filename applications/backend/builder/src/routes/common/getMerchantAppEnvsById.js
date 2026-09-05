const {getEnvsByMerchantId} = require('./getMerchantAppEnvs');

const routeAction = async (req, res, next) => {
    await getEnvsByMerchantId(req.params.merchantId, req, res, next, true)   
}

exports.routeAction = routeAction;