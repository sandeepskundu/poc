const categories = require('./categories');

const srcDir = async (appConfig, req, res, next) => {
    let sDir = req.helpers.json.val(appConfig, 'appConfig.srcDir', 'src')
    let url = `${req.helpers.json.val(appConfig, 'dirs.app')}/${sDir}`;
        appConfig.dirs.srcDir = url;
        await req.helpers.file.writer.async.dir(url);

    return appConfig;
}

const categoryDir = async (appConfig, req, res, next) => {
    let url = `${req.helpers.json.val(appConfig, 'dirs.srcDir')}/categories`;
        appConfig.dirs.categoryDir = url;
        await req.helpers.file.writer.async.dir(url);

    return appConfig;
}

const storybookDir = async (appConfig, req, res, next) => {
    let url = `${req.helpers.json.val(appConfig, 'dirs.srcDir')}/storybook`;
        appConfig.dirs.storybookDir = url;
        await req.helpers.file.writer.async.dir(url);

    return appConfig;
}

const routesDir = async (appConfig, req, res, next) => {
    let rval = '';
    let url = `${req.helpers.json.val(appConfig, 'dirs.srcDir')}/routes`;
    let routes = await req.helpers.file.reader.async.dirs(url);
        appConfig.dirs.routesDir = url;

        if(routes && routes.length > 0){
            for(let a in routes){
                let item = routes[a];
                    rval = `${rval}exports['${item}'] = require('./${item}')\n`;
            }
        }

        await req.helpers.file.writer.async.dir(url);
        await req.helpers.file.writer.async.write(`${url}/index.js`, rval);

    return appConfig;
}

const scrapDir = async (appConfig, req, res, next) => {
    let sDir = req.helpers.json.val(appConfig, 'appConfig.scrapeDir', 'scrap')
    let url = `${req.helpers.json.val(appConfig, 'dirs.app')}/${sDir}`;
        appConfig.dirs.scrapDir = url;
        await req.helpers.file.writer.async.dir(url);

    return appConfig;
}

const create = async (appConfig, req, res, next) => {
    appConfig = await srcDir(appConfig, req, res, next); // STEP - 1
    appConfig = await categoryDir(appConfig, req, res, next); // STEP - 2
    appConfig = await storybookDir(appConfig, req, res, next); // STEP - 3
    appConfig = await routesDir(appConfig, req, res, next); // STEP - 4
    appConfig = await scrapDir(appConfig, req, res, next); // STEP - 4
    appConfig = await categories.create(appConfig, req, res, next); // STEP - 5

    return appConfig;
}

exports.create = create;