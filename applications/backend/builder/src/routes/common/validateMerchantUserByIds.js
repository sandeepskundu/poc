const {validateMerchantUserbyIds} = require('./validateMerchantUser');

const routeAction = async (req, res, next) => {
    await validateMerchantUserbyIds(req.params.merchantId, req.params.userId, req.envProps.MERCHANT_APP_ENVIRONMENT, req, res, next, true)   
}

exports.routeAction = routeAction;