const indexJs = async (appConfig, req, res, next) => {
    return `let compiler = require('./compiler');
let webpack = require('./config.json');
let hooks = require('./compiler/hooks');
let appConfig = require('./../../build/scripts/appConfig.json');
const start = async (type, compress) => {
    appConfig.appConfig.compress = compress;

    if(type != 'storybook'){
        appConfig = await hooks.create(appConfig);
    }
    
    return compiler(webpack, appConfig, type || 'app')
}

exports.start = start;
`
}

const getUrl = (appConfig, req, app, compress) => {
    let name = `${app}${compress?'':'-uc'}.js`
    let url = req.helpers.json.val(appConfig, 'dirs.scrapDir');
    return `${url}/webpack/${name}`;
}

const writeJs = async (appConfig, req, app, compress) => {
    const t = `require('module-alias/register');
require('./../../build/scripts/process.js');
const webpack = require('./index.js');
module.exports = async (config, appName) => {
    return await webpack.start('${app}', ${compress ?true:false});
}`
    await req.helpers.file.writer.async.write(getUrl(appConfig, req, app, compress), t);
}

const create = async (appConfig, req, res, next) => {
    let url = req.helpers.json.val(appConfig, 'dirs.scrapDir');
        await req.helpers.file.writer.async.write(`${url}/webpack/index.js`, await indexJs(appConfig, req, res, next));
        await writeJs(appConfig, req, 'cdn', true);
        await writeJs(appConfig, req, 'cdn', false);
        await writeJs(appConfig, req, 'app', true);
        await writeJs(appConfig, req, 'app', false);
        await writeJs(appConfig, req, 'storybook', true);
        await writeJs(appConfig, req, 'storybook', false);
    return appConfig;
}

exports.create = create;