const path = require('path');
const themeColors = require('./theme-colors');
const designSystem = require('./design-system');

const copyHelpers = async (appConfig, req, res, next) => {
    let culr = req.helpers.json.val(appConfig, 'scssConfig.dirsPath.core');
    let hulr = req.helpers.json.val(appConfig, 'scssConfig.dirsPath.helpers');
        await req.helpers.file.copy.async(`${__dirname}/scss/core`, culr);
        await req.helpers.file.copy.async(`${__dirname}/scss/helpers`, hulr);
    return appConfig;
}

const scssDirs = async (appConfig, req, res, next) => {
    const appDir = req.helpers.json.val(appConfig, 'dirs.app');
    const scrapeDir = req.helpers.json.val(appConfig, 'appConfig.scrapeDir');
    const tDir = req.helpers.json.val(appConfig, 'scssConfig.themesDir', 'themes');
    const scssDir = req.helpers.json.val(appConfig, 'scssConfig.scssDir', 'scss');
    const tcDir = req.helpers.json.val(appConfig, 'scssConfig.themeColorDir', 'theme-colors');
    const dsPath = req.helpers.json.val(appConfig, 'scssConfig.designSystemDir', 'dsystem');
    const scss = path.join(appDir, scrapeDir, scssDir);
    const scssDirs = {
        scss:scss,
        theme:path.join(scss, tDir),
        core:path.join(scss, 'core'),
        bundles:path.join(scss, 'bundles'),
        helpers:path.join(scss, 'helpers'),
        designSystem:path.join(scss, dsPath),
        themeColorDir:path.join(scss, tcDir),
        variables:path.join(scss, `${dsPath}/variables`),
    }

    appConfig.scssConfig.dirsPath = scssDirs;
    
    return appConfig;
}

const rootFile = async (appConfig, req, res, next) => {
    let rval = '';
    let url = req.helpers.json.val(appConfig, 'scssConfig.dirsPath.scss', 'scss');;
    let map = {
        "helpers":true,
        //"variables":true
    }

    for(const a in map){
        rval = req.helpers.scss.import.add(rval, a);
    };

    await req.helpers.file.writer.async.write(`${url}/_index.scss`, rval);
    return appConfig;
}

const create = async (appConfig, req, res, next) => {
    appConfig = await scssDirs(appConfig, req, res, next);
    appConfig = await copyHelpers(appConfig, req, res, next);
    appConfig = await themeColors.create(appConfig, req, res, next);
    appConfig = await designSystem.create(appConfig, req, res, next);
    appConfig = await rootFile(appConfig, req, res, next);

    return appConfig;
}

exports.create = create;