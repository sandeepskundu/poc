const scriptDirPath = async (appConfig, req, res, next) => {
    return req.helpers.json.val(appConfig, 'dirs.scriptDir');
}

const scriptDir = async (appConfig, req, res, next) => {
    await req.helpers.file.writer.async.dir(await scriptDirPath(appConfig, req, res, next))
}

const createConfig = async (appConfig, req, res, next) => {
    let conf = req.helpers.json.copy(appConfig);
    let scrpDir = await scriptDirPath(appConfig, req, res, next);
        conf.appInfo = {
            "id":"",
            "cate":"",
            "prefix":"",
            "disabled":"",
            "name":"Cdn Application",
            "appId":"6738829afbe779c7746626aa",
            "description":"This is sample description and will be replaced with original content"
        }

        delete conf.appName;
        //delete conf.appInfo;
        delete conf.category;
        delete conf.scssConfig;
        delete conf.webpackConfigs;
        delete conf.appConfig.alias;
        delete conf.appConfig.entries;
        delete conf.appConfig.viewTypes;
        delete conf.appConfig.componentType;
        delete conf.appConfig.defaultCategory;
        await req.helpers.file.writer.async.write(`${scrpDir}/appConfig.json`, JSON.stringify(conf, null, 4))
}

const create = async (appConfig, req, res, next) => {
    await scriptDir(appConfig, req, res, next);
    await createConfig(appConfig, req, res, next);
    return appConfig;
}

exports.create = create;