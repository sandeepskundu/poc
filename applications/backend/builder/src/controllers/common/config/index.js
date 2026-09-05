/*-- 
    This functions create all dir related paths and set in app config object for further steps of application setup.
    Also create the application folder by provided app name in request body under the application category.
--*/

const addDirPaths = async (appConfig, req, res, next) => {
        appConfig.appConfig = appConfig.appConfig || {};
        appConfig.appConfig.docsDir = appConfig.appConfig.docsDir || 'docs';
        appConfig.appConfig.buildDir = appConfig.appConfig.buildDir || 'build';
        appConfig.appConfig.schemaDir = appConfig.appConfig.schemaDir || 'schema';
        appConfig.appConfig.configDir = appConfig.appConfig.configDir || 'configs';

    let val = req.helpers.json.val;
    let docDir = `${val(appConfig, 'appConfig.buildDir')}/${val(appConfig, 'appConfig.docsDir')}`;
    let appDir = req.utils.common.path.getApplicationDirPath(appConfig.category, appConfig.appName);
    let bDir = `${req.utils.common.path.getApplicationDirPath(appConfig.category, appConfig.appName)}/${val(appConfig, 'appConfig.buildDir', 'build')}`;

        appConfig.dirs = {
            build:bDir,
            app:appDir,
            beLib:req.utils.common.path.getBeLibsDirPath(),
            uiLib:req.utils.common.path.getUiLibsDirPath(),
            root:req.utils.common.path.getProjectRootDirPath(),
            configDir:`${appDir}/${appConfig.appConfig.configDir}`,
            applications:req.utils.common.path.getApplicationsDirPath(),
            category:req.utils.common.path.getApplicationsCategoryDirPath(appConfig.category),
            scriptDir:`${bDir}/${req.helpers.json.val(appConfig, 'appConfig.scriptDir', 'scripts')}`,
            srcDir:`${req.utils.common.path.getApplicationDirPath(appConfig.category, appConfig.appName)}/${val(appConfig, 'appConfig.srcDir', 'src')}`
        }

        appConfig.appConfig.paths = {
            docs:docDir,
            schema:`${docDir}/${val(appConfig, 'appConfig.schemaDir')}`
        }

    await req.helpers.file.writer.async.dir(appConfig.dirs.app);

    return appConfig;
}

const parseAppConfig = async (appConfig, req, res, next) => {
    appConfig = req.helpers.json.map(appConfig, {
        0:{
            from:"appName",
            setDefinedOnly:false,
            to:"appConfig.pathPrefix"
        }
    });

    return await addDirPaths(appConfig, req, res, next);
}

exports.parseAppConfig = parseAppConfig;
exports.environmentVariables = require('./env-vars');