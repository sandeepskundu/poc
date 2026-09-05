const logs = require('./logs');

const runtime = async (rval, appConfig, nginxConf, req, res, next) => {
    const map = {
        __NGINX__LOGS__PLACEHOLDER__:await logs.parse(appConfig, nginxConf, req, res, next)
    }

    for(const a in map){
        rval = req.helpers.string.replace.word(rval, a, map[a]);
    }

    return rval;
}

exports.runtime = runtime;
exports.sites = require('./sites');