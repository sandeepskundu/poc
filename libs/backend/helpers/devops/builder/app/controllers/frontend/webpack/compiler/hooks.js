const compileTime = async (rval, appConfig, req, res, next) => {
    rval.push({
        pattern:'__CACHEVERSION__',
        replacement:Date.now(),
    })

    return rval;
}

const hooksReplacment = async (appConfig, hooks, req, res, next) => {
    let rv = [];
    for(const a in hooks){
        rv.push({
            pattern:a,
            replacement:hooks[a],
        })
    }

    rv = await compileTime(rv, appConfig, req, res, next);

    appConfig.webpackConfigs = appConfig.webpackConfigs || {};
    appConfig.webpackConfigs.replaceHtmlText = rv;

    return appConfig;
}

const create = async (appConfig, req, res, next) => {
    //let hooks = await req.helpers.express.htmlHooks.get.details(appConfig, 'webpack', req, res, next);
    let hooks = appConfig?.hooks?.webpackCompileTimeHooks || {};
        return await hooksReplacment(appConfig, hooks, req, res, next);
}

exports.create = create;