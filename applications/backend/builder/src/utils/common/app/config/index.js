const marchantToken = async (appConfig, req, res, next) => {
    const appId = req.helpers.json.val(appConfig, 'appInfo.appId');
    const token = {
        code:'AIOCART',
        id:req.helpers.json.val(req, 'envProps.MERCHANT_ID'),
        MERCHANT_AUTH_TOKEN:req.helpers.json.val(req, 'envProps.MERCHANT_AUTH_TOKEN'),
        MERCHANT_SIGNATURE_TOKEN:req.helpers.json.val(req, 'envProps.MERCHANT_SIGNATURE_TOKEN'),
        MERCHANT_APP_ENVIRONMENT:req.helpers.json.val(req, 'envProps.MERCHANT_APP_ENVIRONMENT')
    }

    return req.helpers.jwt.sign(token, appId);
}

const tokens =  async (appConfig, req, res, next) => {
    return {
        marchant:await marchantToken(appConfig, req, res, next)
    }
}

const getCommonConfig = async (appConfig, req, res, next) => {
    appConfig.tokens = await tokens(appConfig, req, res, next);

    return appConfig;
}

exports.getCommonConfig = getCommonConfig;