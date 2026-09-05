const urlHash = async (key, appConfig, req) => {
    let path = key.split('/');
    let appId = req.helpers.json.val(appConfig, 'appInfo.appId', '');
    let env = req.helpers.json.val(appConfig, 'appConfig.APP_ENV', 'prod');

    if(env != 'local_'){
        path = `${path.join(appId)}`
    }else{
        path = `${path.join('/')}`;
    }
    
    if(env != 'local_'){
        return req.helpers.crypto.md5(path);
    }else{
        return path;
    }
}

const write = async (config, url, appConfig, req) => {
    let appdir = req.helpers.json.val(appConfig, 'dirs.app');
    let doc = req.helpers.json.val(appConfig, 'appConfig.paths.docs');
    let env = req.helpers.json.val(appConfig, 'appConfig.APP_ENV', 'prod');

    await req.helpers.file.writer.async.write(`${appdir}/${doc}/${url}`, JSON.stringify(config, null, (env != 'local'?0:4)));
}

const init = async (list, appConfig, req, res, next) => {
    for(const a in list){
        const hash = await urlHash(a, appConfig, req);
        for(const b in list[a]){
            await write(list[a][b], `${hash}/${b}.json`, appConfig, req)
        }
    }
}

exports.init = init;