const path = require('path');
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
    return start(path.resolve('./build/scripts/helpers'), noRequire);
}

process.uiHelpers = (noRequire) => {
    return start(path.resolve('./build/scripts/ui-helpers'), noRequire);
}

process.nodeModules = (name, noRequire) => {
    return start(path.resolve(`./node_modules/${name}`), noRequire);
}

process.aioApp = (name, noRequire) => {
    //return start(`/Users/sandy/Documents/sandeep/workspace/codebase/dev/mtt/applications/backend/tdc-devops/${name}`, noRequire);
    return start(path.resolve(`./${name}`), noRequire);
}

process.aioAppSrc = (name, noRequire) => {
    //return start(`/Users/sandy/Documents/sandeep/workspace/codebase/dev/mtt/applications/backend/tdc-devops/src/${name}`, noRequire);
    return start(path.resolve(`./src/${name}`), noRequire);
}

process.aioAppSchema = (name, noRequire) => {
    const p = `build/docs/schema`;
    if(name){
        return start(path.resolve(`./${p}/${name}`), noRequire);
    }else{
        return start(path.resolve(`./${p}`), noRequire);
    } 
}

process.aioAppConfigs = (name, noRequire) => {
    if(name){
        return process.aioAppSrc(`configs/${name}`, noRequire);
    }else{
        return process.aioAppSrc('configs', noRequire);
    } 
}

process.aioAppModels = (name, noRequire) => {
    if(name){
        return process.aioAppSrc(`models/${name}`, noRequire);
    }else{
        return process.aioAppSrc('models', noRequire);
    }
}

process.aioAppHelpers = (name, noRequire) => {
    if(name){
        return process.aioAppSrc(`helpers/${name}`, noRequire);
    }else{
        return process.aioAppSrc('helpers', noRequire);
    }
}

process.aioAppControllers = (name, noRequire) => {
    if(name){
        return process.aioAppSrc(`controllers/${name}`, noRequire);
    }else{
        return process.aioAppSrc('controllers', noRequire);
    }
}

process.aioAppMiddlewares = (name, noRequire) => {
    if(name){
        return process.aioAppSrc(`middlewares/${name}`, noRequire);
    }else{
        return process.aioAppSrc('middlewares', noRequire);
    }
}

process.aioUiLibs = (name, noRequire) => {
    //return start(`/Users/sandy/Documents/sandeep/workspace/codebase/dev/mtt/libs/frontend/${name}`, noRequire);
    return start(path.resolve('./../../../', `libs/frontend/${name}`), noRequire);
}

process.aioBeLibs = (name, noRequire) => {
    //return start(`/Users/sandy/Documents/sandeep/workspace/codebase/dev/mtt/libs/backend/${name}`, noRequire);
    //return start(`/Users/sandy/Documents/sandeep/workspace/codebase/dev/mtt/libs/backend/${name}`, noRequire);

    return start(path.resolve('./../../../', `libs/backend/${name}`), noRequire);
}

process.aioAppExpress = (name, noRequire) => {
    //return start(path.resolve('./express/${name}'), noRequire);
    return start(path.resolve('./express/${name}'), noRequire);
}