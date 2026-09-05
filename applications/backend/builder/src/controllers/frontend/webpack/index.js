const hooks = require('./compiler/hooks');
const commands = require('./commands');
const rootConfig = require('./root-config');

const copyWebpackInApp = async (appConfig, req, res, next) => {
    const scrapDir = req.helpers.json.val(appConfig, 'dirs.scrapDir');
    await req.helpers.file.copy.async(`${__dirname}/compiler`, `${scrapDir}/webpack/compiler`);
    return appConfig;
}

const create = async (appConfig, req, res, next) => {
    await rootConfig.create(appConfig, req);
    await copyWebpackInApp(appConfig, req, res, next);
    await commands.create(appConfig, req, res, next);
    return await hooks.create(appConfig);
}

exports.create = create;