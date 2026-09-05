const appAliasMapDir = async (rval, config, req, alia, path) => {
    const compType = req.helpers.json.val(config, 'appConfig.componentType');

    if(alia && path && compType && compType.length > 0){
        for(const a in compType){
            let name = compType[a];
                rval[`${alia}-${name}`] = `${path}/${name}`
        }
    }

    return rval;
}

const appAlias = async (rval, config, req) => {
    let srcDir = req.helpers.json.val(config, 'dirs.srcDir');
    let compDir = `${srcDir}/components`;
    let cateDir = `${srcDir}/categories`;
    let appAlia = await appAliasMapDir({}, config, req, 'aio-app-ui', compDir);
    let cates = await req.helpers.file.reader.async.dirs(cateDir);
    let views = req.helpers.json.val(config, 'appConfig.viewTypes'); 

    if(cates && cates.length > 0){
        for(const a in cates){
            let name = cates[a];
            let ali = `aio-app-ui-${name}`;
            let path = `${cateDir}/${name}/components`;
                appAlia[`${ali}-modules`] = `${cateDir}/${name}/modules`;
                appAlia = await appAliasMapDir(appAlia, config, req, ali, `${path}/common`);

            if(views && views.length > 0){
                for(const b in views){
                    let vn = views[b];
                    appAlia = await appAliasMapDir(appAlia, config, req, `${ali}-${vn}`, `${path}/${vn}`);
                }
            }
        }
    }

    return req.helpers.json.merge(rval, appAlia);
}

const compAlias = async (rval, config, req) => {
    const scrpDir = req.helpers.json.val(config, 'dirs.scrapDir');
    const libs = req.helpers.json.val(config, 'webpackConfigs.libsDirsMapConfig', {});

    if(libs){
        for(const a in libs){
            rval[a] = `${scrpDir}/${libs[a].destDir}`;
        }
    }

    return await appAlias(rval, config, req);
}

const scriptDirPath = async (config, req) => {
    return `${req.helpers.json.val(config, 'dirs.build')}/scripts`;
}

const alias = async (config, req) => {
    const scrpDir = await scriptDirPath(config, req);
    const appDir = req.helpers.json.val(config, 'dirs.app');
    const uiLibs = req.helpers.json.val(config, 'dirs.uiLib');
    const beLibs = req.helpers.json.val(config, 'dirs.beLib');
    const srcDir = req.helpers.json.val(config, 'dirs.srcDir');
    const appAlias = req.helpers.json.val(config, 'appConfig.alias', {});
    const scssDir = req.helpers.json.val(config, 'scssConfig.scssDir', 'scss');
    const staticsDir = req.helpers.json.val(config, 'config.appConfig.staticsDir', 'statics');

    let rval = {
        process:'process/browser',
        // "aio-be-libs":(`${beLibs}/`),
        "aio-ui-libs":(`${uiLibs}/`),
        "helpers":`${scrpDir}/helpers`,
        "app-helpers":`${srcDir}/helpers`,
        "ui-helpers":`${scrpDir}/ui-helpers`,
        "react":(`${appDir}/node_modules/react`),
        "node-modules":(`${appDir}/node_modules/`),
        //"aio-app-modules":(`${appDir}/node_modules/`),
        "prop-types":(`${appDir}/node_modules/prop-types`),
        // "aio-ui-components":(`${uiLibs}/ui/components/`),
        "aio-app-scss":(`${appDir}/${staticsDir}/${scssDir}/`),
        "aio-app-scss-pages":(`${appDir}/${staticsDir}/scss/pages/`),
        "aio-app-scss-components":(`${appDir}/${staticsDir}/scss/components/`)
    };

    if(appAlias){
        rval = req.helpers.json.merge(rval, appAlias);
    }

    return await compAlias(rval, config, req);
}

const create = async (config, req) => {
    return {
        extensions:['.js', '.jsx'],
        alias:await alias(config, req),
        /*--fallback: { // This will move to run time config.
            url:require.resolve('url'),
            buffer:require.resolve("buffer"),
            http:require.resolve('stream-http'),
            https:require.resolve('https-browserify'),
            stream:require.resolve('stream-browserify'),
            crypto:require.resolve('crypto-browserify'),
            'process/browser':require.resolve('process/browser')
        }--*/
    }
}

exports.create = create;