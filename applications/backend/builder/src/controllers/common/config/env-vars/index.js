const runtime = require('./runtime');


const create = async (appConfig, req, res, next) => {
    appConfig = await runtime.build(appConfig, req, res, next);

    return appConfig;
}

exports.create = create;