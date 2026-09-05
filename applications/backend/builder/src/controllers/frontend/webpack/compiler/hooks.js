const helpers = require('helpers');

const compileTime = async (rval, appConfig) => {
    rval.push({
        pattern:'__CACHEVERSION__',
        replacement:Date.now(),
    })

    return rval;
}

const hooksReplacment = async (appConfig, hooks) => {
    let rv = [];
    for(const a in hooks){
        rv.push({
            pattern:a,
            replacement:hooks[a],
        })
    }

    rv = await compileTime(rv, appConfig);

    appConfig.webpackConfigs = appConfig.webpackConfigs || {};
    appConfig.webpackConfigs.replaceHtmlText = rv;

    return appConfig;
}

const create = async (appConfig) => {
    return await hooksReplacment(appConfig, await helpers.htmlHooks.get.details(appConfig, 'webpack'));
}

exports.create = create;