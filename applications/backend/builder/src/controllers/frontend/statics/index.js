
const staticsDir = async (appConfig, req, res, next) => {
    let sDir = req.helpers.json.val(appConfig, 'appConfig.staticsDir', 'statics');
    let url = `${req.helpers.json.val(appConfig, 'dirs.app')}/${sDir}`;
        appConfig.dirs.staticsDir = url;
        await req.helpers.file.writer.async.dir(url);

    return appConfig;
}

const scssDir = async (appConfig, req, res, next) => {
    let url = `${req.helpers.json.val(appConfig, 'dirs.staticsDir')}/scss`;
    let map = {
        'pages':true,
        'components':true,
        'partials/global':true,
        'partials/optional':true,
    }
    
    await req.helpers.file.writer.async.dir(url);

    for(const a in map){
        await req.helpers.file.writer.async.dir(`${url}/${a}`);
    }

    return appConfig;
}

const fontsDir = async (appConfig, req, res, next) => {
    let url = `${req.helpers.json.val(appConfig, 'dirs.staticsDir')}/fonts`;
    
    await req.helpers.file.writer.async.dir(url);

    return appConfig;
}

const imagesDir = async (appConfig, req, res, next) => {
    let url = `${req.helpers.json.val(appConfig, 'dirs.staticsDir')}/images`;
    
    await req.helpers.file.writer.async.dir(url);

    return appConfig;
}

const iconsDir = async (appConfig, req, res, next) => {
    let url = `${req.helpers.json.val(appConfig, 'dirs.staticsDir')}/icons`;
    
    await req.helpers.file.writer.async.dir(url);

    return appConfig;
}

const create = async (appConfig, req, res, next) => {
    appConfig = await staticsDir(appConfig, req, res, next); // STEP - 1
    appConfig = await scssDir(appConfig, req, res, next); // STEP - 2
    appConfig = await fontsDir(appConfig, req, res, next); // STEP - 3
    appConfig = await imagesDir(appConfig, req, res, next); // STEP - 4
    appConfig = await iconsDir(appConfig, req, res, next); // STEP - 5
    
    

    return appConfig;
}

exports.create = create;