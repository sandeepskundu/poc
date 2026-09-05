const root = require('./root');
const helpers = require('./../helpers');

const init = async (appConfig, req, res, next) => {
    let nConf = await helpers.setup.configs.get(appConfig, req, res, next);
        await root.createDirs(appConfig, nConf, req, res, next);
        await helpers.builder.sites.parse(appConfig, nConf, req, res, next);
}

exports.init = init;