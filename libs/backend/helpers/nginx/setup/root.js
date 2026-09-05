const configs = require('./../configs');
const helpers = require('./../helpers');

const createDirs = async (appConfig, nConf, req, res, next) => {
    let dirs = req.helpers.json.val(nConf, 'dirs', {});

    for(const a in dirs){
        let str = req.helpers.data.type.is(dirs[a], 'string');

        if(str){
            await req.helpers.file.writer.async.dir(dirs[a]);
        }else{
            let arr = req.helpers.data.type.is(dirs[a], 'array');
            let obj = req.helpers.data.type.is(dirs[a], 'object');

            if(!arr && obj && dirs[a]){
                await createDirs(appConfig, {dirs:dirs[a]}, req, res, next);
            }
        }
    }
}

const replacePath = async (rval, appConfig, nConf, req, res, next) => {
        rval = await helpers.builder.runtime(rval, appConfig, nConf, req, res, next);
    let dirs = req.helpers.json.val(nConf, 'dirs', {});
    let map = {
        ___NGINX__HTTP__HTML__DIR__:dirs.htmlDir,
        ___NGINX__HTTP__UPSTREAM__DIR__:dirs.upstream,
        ___NGINX__HTTP__ERROR__LOGS__:`${dirs.logs.error}`,
        ___NGINX__HTTP__ACCESS__LOGS__:`${dirs.logs.access}`,
        ___NGINX__HTTP__SITE__ENBLED__DIR__:dirs.sitesEnabled,
        ___NGINX__HTTP__DEFAULT__CONFIG__DIR__:dirs.defaultConfigs,
    }

    for(const a in map){
        rval = req.helpers.string.replace.word(rval, a, map[a]);
    }

    return rval;
}


const nginxConf = async (appConfig, nConf, req, res, next) => {
    let dir = req.helpers.json.val(nConf, 'dirs.rootDir', '');
    let config = req.helpers.json.val(configs, 'nginx.rootConfigs', '');
        await req.helpers.file.writer.async.write(`${dir}/nginx.conf`, await replacePath(config, appConfig, nConf, req, res, next));
}

const init = async (appConfig, req, res, next) => {
    let nConf = await helpers.setup.configs.get(appConfig, req, res, next);
        await createDirs(appConfig, nConf, req, res, next);
        await nginxConf(appConfig, nConf, req, res, next);
}

exports.init = init;
exports.createDirs = createDirs;