const path = require('path');

//const path = process.nodeModules('path');

const urlHash = async (key, req, res, next) => {
    let path = key.split('/');
    let appId = req.helpers.json.val(req, 'appConfig.appInfo.appId', '');
    let env = req.helpers.json.val(req, 'appConfig.appConfig.appEnv', 'prod');
        env = 'local';

    if(env != 'local'){
        path = `${path.join(appId)}`
    }else{
        path = `${path.join('/')}`;
    }
    
    if(env != 'local'){
        return req.helpers.crypto.md5(path);
    }else{
        return path;
    }
}

const getPath = async (type, req, res, next) => {
    const rv = [];
    const appController = req.helpers.json.val(req, 'params.appController');
    const controllerAction = req.helpers.json.val(req, 'params.controllerAction');
    const actionVersion = req.helpers.json.val(req, 'params.actionVersion');
    const versionJob = req.helpers.json.val(req, 'params.versionJob');
    const jobMethod = req.helpers.json.val(req, 'params.jobMethod');
    const pth = req.helpers.json.val(req, 'appConfig.appConfig.paths.docs', 'build/docs');

    if(appController){
        rv.push(appController)
    }

    if(controllerAction){
        rv.push(controllerAction)
    }

    if(actionVersion){
        rv.push(actionVersion)
    }

    if(versionJob){
        rv.push(versionJob)
    }

    if(jobMethod){
        rv.push(jobMethod)
    }

    const hash = await urlHash(rv.join('/'), req, res, next);
    const map = [pth, hash]

    if(type){
        map.push(type)
    }

    const p = req.helpers.url.sanitize(map.join('/'));
    return path.resolve(process.cwd(), `./${p}`);
}

const get = async (type, req, res, next) => {
    const url = await getPath(type, req, res, next);

    return await req.helpers.file.reader.async.init(`${url}.json`, false, 'json');
}

exports.get = get;