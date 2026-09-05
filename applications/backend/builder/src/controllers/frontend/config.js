const appElementId = (appConfig, req, res, next) => {
    appConfig.appConfig.appElementId = `apId${req.helpers.random.string(8)}`;
    return appConfig;
}

const parseAppConfig = async (appConfig, req, res, next) => {
    appConfig = await req.controllers.common.config.parseAppConfig(appConfig, req, res, next);

    return appElementId(appConfig, req, res, next);
}

exports.parseAppConfig = parseAppConfig;