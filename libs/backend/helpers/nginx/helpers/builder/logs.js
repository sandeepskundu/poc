const parser = require('./parser');

const base = {
    0:{
        "name":"map",
        "type":'object',
        "match":`$time_iso8601 $year`,
        "childs":{
            0:{
                name:`default`,
                match:`'0000'`
            },
            1:{
                name:`"~^(\d{4})-(\d{2})-(\d{2})"`,
                match:`$1`
            }
        }
    },
    1:{
        "name":"map",
        "type":'object',
        "match":`$time_iso8601 $month`,
        "childs":{
            0:{
                name:`default`,
                match:`'00'`
            },
            1:{
                name:`"~^(\d{4})-(\d{2})-(\d{2})"`,
                match:`$2`
            }
        }
    },
    2:{
        "name":"map",
        "type":'object',
        "match":`$time_iso8601 $day`,
        "childs":{
            0:{
                name:`default`,
                match:`'00'`
            },
            1:{
                name:`"~^(\d{4})-(\d{2})-(\d{2})"`,
                match:`$3`
            }
        }
    },
    3:{
        "name":"log_format",
        "match":`main '$remote_addr - $remote_user kundu $time_iso8601 [$time_local] "$request" '
        '$status $body_bytes_sent "$http_referer" '
        '"$http_user_agent" "$http_x_forwarded_for" "$http_header"'`,
    },
    4:{
        "name":"error_log",
        "match":`___NGINX__HTTP__ERROR__LOGS__/error.$year-$month-$day.log`
    },
    5:{
        "name":"access_log",
        "match":`___NGINX__HTTP__ACCESS__LOGS__/access.$year-$month-$day.log  main`
    }
}

const getConfig = (appConfig, nginxConf, req, res, next) => {
    let conf = req.helpers.json.val(appConfig, 'nginxConf.logs.configs', {});
        return req.helpers.json.merge(base, conf);
}

const addAppNameInUrl = async (rval, appConfig, nginxConf, req, res, next) => {
    let rv = [rval];
    let prefix = req.helpers.json.val(appConfig, 'appConfig.appConfig.pathPrefix', '');

    if(prefix){
        rv.push('apps');
        rv.push(prefix);
    }

    return req.helpers.url.sanitize(rv.join('/'));
}

const replacePath = async (rval, appConfig, nginxConf, req, res, next) => {
    let dirs = req.helpers.json.val(nginxConf, 'dirs', {});
    let map = {
        ___NGINX__HTTP__ERROR__LOGS__:await addAppNameInUrl(`${dirs.logs.error}`, appConfig, nginxConf, req, res, next),
        ___NGINX__HTTP__ACCESS__LOGS__:await addAppNameInUrl(`${dirs.logs.access}`, appConfig, nginxConf, req, res, next),
    }

    for(const a in map){
        rval = req.helpers.string.replace.word(rval, a, map[a]);
    }

    return rval;
}

const parse = async (appConfig, nginxConf, req, res, next) => {
    let enabled = req.helpers.json.val(appConfig, 'nginxConf.logs.enabled');

    if(enabled){
        let conf = getConfig(appConfig, nginxConf, req, res, next);
        let rv = parser.start(``, conf, 0, req);

        return replacePath(rv, appConfig, nginxConf, req, res, next);
    }else{
        return ''
    }
}

exports.parse = parse;