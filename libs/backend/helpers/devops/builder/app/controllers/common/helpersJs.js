const scriptDirPath = async (appConfig, req) => {
    return req.helpers.json.val(appConfig, 'dirs.scriptDir');
}

const js = async (config, req, appType, importUrl) => {
    let iUrl = `${importUrl}/helpers`;
    let content = `module.exports = require('${iUrl}');`
    let env = req.helpers.json.val(config, 'appConfig.appEnv', 'prod');
    let url = (`${await scriptDirPath(config, req)}/ui-helpers`);

    if(env === 'local'){
        await req.helpers.file.writer.async.write(`${url}/index.js`, content);
    }else{
        await req.helpers.file.copy.async(iUrl, url);
    }
}

const helpers = async (config, req, appType) => {
    const bH = req.helpers.json.val(config, 'dirs.beLib');
    const iUrl = `${bH}/helpers`;
    const hurl = (`${await scriptDirPath(config, req)}/helpers`);
    const url = (`${await scriptDirPath(config, req)}/be-helpers`);
    let env = req.helpers.json.val(config, 'appConfig.appEnv', 'prod');
    env = 'local';

    const content = `const uH = require('./ui-helpers');
const bH = require('${(env != 'local')?'./be-helpers':iUrl}');
    
const start = () => {
    return uH.json.merge(uH, bH || {});
}
    
module.exports = start();`

    if(env != 'local'){
        await req.helpers.file.copy.async(iUrl, url);
    }

    await req.helpers.file.writer.async.write(`${hurl}.js`, content);
}

const  create = async (config, req, appType) => {
    switch(appType) {
        case 'ui':
            await js(config, req, appType, req.helpers.json.val(config, 'dirs.uiLib'));
            await helpers(config, req, appType);
        break;
        case 'express':
            await js(config, req, appType, req.helpers.json.val(config, 'dirs.uiLib'));
            await helpers(config, req, appType);
        break;
        default:
          // code block
    }

    return config;
}

exports.create = create;