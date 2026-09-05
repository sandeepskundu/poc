const tokens = require('./tokens');

const envFile = async (appConfig, req, envs, name) => {
    let content = ``;
    let dirn = req.helpers.json.val(appConfig, 'dirs.configDir');
        dirn = `${dirn}/envs/.${name}.env`;

        for(const a in envs){
            content = `${content}${a}=${envs[a]}\n`;
        }

        await req.helpers.file.writer.async.write(dirn, content);
}

const runtime = async (appConfig, req, res, next, envs) => {
    for(const a in envs){
        await envFile(appConfig, req, envs[a], a);
    }
}

const compile = async (appConfig, req, res, next) => {
    let rval = await tokens.assign(appConfig, req, res, next);
        rval = await req.helpers.mongoose.token.encript(rval, appConfig, req.helpers);

    return {
        runtime:rval
    }
}

const build = async (appConfig, req, res, next) => {

    appConfig.envs = {
        runtime:{
            "MONGO_DB_TOKEN":{
                "id":"673705a64a2d97c53d067e06",
                "connection":"mongodb://127.0.0.1/MTT"
            },
            "REDIS_TOKEN":"kundu"
        }
    }

    await runtime(appConfig, req, res, next, await compile(appConfig, req, res, next));

    return appConfig;
}

exports.build = build;