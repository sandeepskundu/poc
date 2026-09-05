const childDirs = {
    'routes':{},
    'models':{},
    'helpers':{},
    'configs':{},
    'services':{},
    'controllers':{},
    'middlewares':{}
};

const srcDir = async (appConfig, req, res, next) => {
    let sDir = req.helpers.json.val(appConfig, 'appConfig.srcDir', 'src')
    let url = `${req.helpers.json.val(appConfig, 'dirs.app')}/${sDir}`;
        appConfig.dirs.srcDir = url;
        await req.helpers.file.writer.async.dir(url);

    return appConfig;
}

const createChildDirs = async (appConfig, req, res, next) => {
    let url = `${req.helpers.json.val(appConfig, 'dirs.srcDir')}`;

    if(url){
        for(const a in childDirs){
            await req.helpers.file.writer.async.dir(`${url}/${a}`);
        }
    }

    return appConfig;
}

const create = async (appConfig, req, res, next) => {
    appConfig = await srcDir(appConfig, req, res, next); // STEP - 1
    appConfig = await createChildDirs(appConfig, req, res, next); // STEP - 2

    return appConfig;
}

exports.create = create;