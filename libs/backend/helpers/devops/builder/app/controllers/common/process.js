const js = async (config, req, res, next) => {
    const jval = req.helpers.json.val;
    const bdir = jval(config, 'appConfig.buildDir', 'build');
    const sdir = jval(config, 'appConfig.scriptDir', 'scripts');

    return `const path = require('path');
const tryRequire = require('try-require');
    
const start = (url, noRequire) => {
    if(noRequire){
        return url;
    }else{
        return tryRequire(url);
    }
}

process.require = (url, noRequire) => {
    return start(path.resolve('./', url), noRequire);
}

process.helpers = (noRequire) => {
    return start(path.resolve('./${bdir}/${sdir}/helpers'), noRequire);
}

process.uiHelpers = (noRequire) => {
    return start(path.resolve('./${bdir}/${sdir}/ui-helpers'), noRequire);
}

process.nodeModules = (name, noRequire) => {
    return start(path.resolve(\`./node_modules/\${name}\`), noRequire);
}

process.aioApp = (name, noRequire) => {
    //return start(\`${jval(config, 'dirs.app')}/\${name}\`, noRequire);
    return start(path.resolve(\`./\${name}\`), noRequire);
}

process.aioAppSrc = (name, noRequire) => {
    //return start(\`${jval(config, 'dirs.srcDir')}/\${name}\`, noRequire);
    return start(path.resolve(\`./${jval(config, 'appConfig.srcDir')}/\${name}\`), noRequire);
}

process.aioAppSchema = (name, noRequire) => {
    const p = \`${jval(config, 'appConfig.paths.schema')}\`;
    if(name){
        return start(path.resolve(\`./\${p}/\${name}\`), noRequire);
    }else{
        return start(path.resolve(\`./\${p}\`), noRequire);
    } 
}

process.aioAppConfigs = (name, noRequire) => {
    if(name){
        return process.aioAppSrc(\`configs/\${name}\`, noRequire);
    }else{
        return process.aioAppSrc('configs', noRequire);
    } 
}

process.aioAppModels = (name, noRequire) => {
    if(name){
        return process.aioAppSrc(\`models/\${name}\`, noRequire);
    }else{
        return process.aioAppSrc('models', noRequire);
    }
}

process.aioAppHelpers = (name, noRequire) => {
    if(name){
        return process.aioAppSrc(\`helpers/\${name}\`, noRequire);
    }else{
        return process.aioAppSrc('helpers', noRequire);
    }
}

process.aioAppControllers = (name, noRequire) => {
    if(name){
        return process.aioAppSrc(\`controllers/\${name}\`, noRequire);
    }else{
        return process.aioAppSrc('controllers', noRequire);
    }
}

process.aioAppMiddlewares = (name, noRequire) => {
    if(name){
        return process.aioAppSrc(\`middlewares/\${name}\`, noRequire);
    }else{
        return process.aioAppSrc('middlewares', noRequire);
    }
}

process.aioUiLibs = (name, noRequire) => {
    //return start(\`${jval(config, 'dirs.uiLib')}/\${name}\`, noRequire);
    //return start(\`${jval(config, 'dirs.uiLib')}/\${name}\`, noRequire);
    return start(path.resolve('./../../../', \`libs/frontend/\${name}\`), noRequire);
}

process.aioBeLibs = (name, noRequire) => {
    //return start(\`${jval(config, 'dirs.beLib')}/\${name}\`, noRequire);
    //return start(\`${jval(config, 'dirs.beLib')}/\${name}\`, noRequire);
    return start(path.resolve('./../../../', \`libs/backend/\${name}\`), noRequire);
}

process.aioAppExpress = (name, noRequire) => {
    //return start(path.resolve('./express/\${name}'), noRequire);
    return start(path.resolve('./express/\${name}'), noRequire);
}`

};


const scriptDirPath = async (appConfig, req, res, next) => {
    return req.helpers.json.val(appConfig, 'dirs.scriptDir');
}

const processJs = async (config, req, res, next, content) => {
    const scrpDir = await scriptDirPath(config, req, res, next);
    await req.helpers.file.writer.async.write(`${scrpDir}/process.js`, content)
}

/*--
process.compiler = (name, noRequire) => {
    //return process.aioBeLibs('compiler${name?('/'+name):''}', noRequire);
}--*/

const  create = async (config, req, res, next) => {
    await processJs(config, req, res, next, await js(config, req, res, next));
    return config;
}

exports.create = create;