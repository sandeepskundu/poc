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
    let staticsDir = req.helpers.json.get(appConfig, 'appConfig.staticsDir', '');
    let scrpDir = req.helpers.json.get(appConfig, 'appConfig.scrapeDir', 'scrap')
    let docDir = `${val(appConfig, 'appConfig.buildDir')}/${val(appConfig, 'appConfig.docsDir')}`;
    let appDir = req.helpers.devops.builder.utils.common.path.getApplicationDirPath(appConfig.category, appConfig.appName);
    let bDir = `${req.helpers.devops.builder.utils.common.path.getApplicationDirPath(appConfig.category, appConfig.appName)}/${val(appConfig, 'appConfig.buildDir', 'build')}`;

    debugger;

        appConfig.dirs = {
            build:bDir,
            app:appDir,
            storybook:{
                allCompConfigsDir:`${bDir}/storybooks/props/details`,
                allCompConfigsMapJson:`${bDir}/storybooks/components/all.json`,
                componentChunks:{
                    src:`${appDir}/${scrpDir}/storybook/chunks`,
                    dest:`${staticsDir}/js/storybook/chunks`
                }
            },
            configDir:`${appDir}/${appConfig.appConfig.configDir}`,
            beLib:req.helpers.devops.builder.utils.common.path.getBeLibsDirPath(),
            uiLib:req.helpers.devops.builder.utils.common.path.getUiLibsDirPath(),
            root:req.helpers.devops.builder.utils.common.path.getProjectRootDirPath(),
            applications:req.helpers.devops.builder.utils.common.path.getApplicationsDirPath(),
            scriptDir:`${bDir}/${req.helpers.json.val(appConfig, 'appConfig.scriptDir', 'scripts')}`,
            category:req.helpers.devops.builder.utils.common.path.getApplicationsCategoryDirPath(appConfig.category),
            srcDir:`${req.helpers.devops.builder.utils.common.path.getApplicationDirPath(appConfig.category, appConfig.appName)}/${val(appConfig, 'appConfig.srcDir', 'src')}`
        }

        appConfig.appConfig.paths = {
            docs:docDir,
            schema:`${docDir}/${val(appConfig, 'appConfig.schemaDir')}`,
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