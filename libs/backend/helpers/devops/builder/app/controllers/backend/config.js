const common = require('./../common');

const parseAppConfig = async (appConfig, req, res, next) => {
    return await common.config.parseAppConfig(appConfig, req, res, next);
}

exports.parseAppConfig = parseAppConfig;