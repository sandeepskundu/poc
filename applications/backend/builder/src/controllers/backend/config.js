const parseAppConfig = async (appConfig, req, res, next) => {
    return await req.controllers.common.config.parseAppConfig(appConfig, req, res, next);
}

exports.parseAppConfig = parseAppConfig;