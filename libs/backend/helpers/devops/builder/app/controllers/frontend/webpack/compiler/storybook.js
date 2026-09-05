const path = require('path');
const json = require('./../helpers/json');
const webpackHelpers = require('./helpers');
const MiniCssExtractPlugin = process.aioAppModules('mini-css-extract-plugin');


const mergeResolve = (wConf, appWebpack) => {
    wConf.resolve = wConf.resolve || {};
    appWebpack.resolve = appWebpack.resolve || {}; 
    wConf.resolve.alias = wConf.resolve.alias || {};
    appWebpack.resolve.alias = appWebpack.resolve.alias || {};

    wConf.resolve.fallback = wConf.resolve.fallback || {};
    appWebpack.resolve.fallback = appWebpack.resolve.fallback || {};

    wConf.resolve.alias = {...wConf.resolve.alias, ...appWebpack.resolve.alias}
    wConf.resolve.fallback = {...wConf.resolve.fallback, ...appWebpack.resolve.fallback};
    wConf.resolve.extensions = appWebpack.resolve.extensions || wConf.resolve.extensions;

    return wConf;
}

const mergeRules = (wConf, appWebpack) => {
    wConf.module = wConf.module || {};
    appWebpack.module = appWebpack.module || {};
    wConf.module.rules = wConf.module.rules || [];
    appWebpack.module.rules = appWebpack.module.rules || [];

    if(appWebpack.module.rules.length > 0){
        wConf.module.rules = wConf.module.rules.concat(appWebpack.module.rules);
    }

    return wConf;
}

const mergePlugin = (wConf, appWebpack) => {
    wConf.plugins = wConf.plugins || [];
    wConf.plugins.push(new MiniCssExtractPlugin())
    
    return wConf;
}

exports.extendWebpackConfig = (conf, arg) => {
    let baseConfig = webpackHelpers.getWebpackAppConfig({});
    let appConfig = require(path.resolve(`./${baseConfig.appScriptsDir}/config`)).config;
        baseConfig = webpackHelpers.getWebpackAppConfig(appConfig);

    let webpackConfig = webpackHelpers.getBaseConfig(baseConfig);

        conf = mergeRules(conf, webpackConfig);
        conf = mergePlugin(conf, webpackConfig);
        conf = mergeResolve(conf, webpackConfig);

    return conf;
}