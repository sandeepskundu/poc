const merchantDetails = require('./getMerchantDetails');
const merchantAppEnvs = require('./getMerchantAppEnvs');
const merchantUserDetails = require('./validateMerchantUser');

const getDetails = async (req, res, next) => {
    return {
        merchand:await merchantDetails.detailsById(req.envProps.MERCHANT_ID, req, res, next),
        appEnvs:await merchantAppEnvs.getEnvsByMerchantId(req.envProps.MERCHANT_ID, req, res, next),
        userDetails:await merchantUserDetails.validateMerchantUserbyIds(req.envProps.MERCHANT_ID, req.envProps.MERCHANT_USER_ID, req.envProps.MERCHANT_APP_ENVIRONMENT)
    }
}

const routeAction = async (req, res, next) => {
    const de = await getDetails(req, res, next);

}

exports.routeAction = routeAction;