const upstream = require('./../upstream');
const serverConfig = require('./server-configs');
const locationConfig = require('./location-configs');

const template = `
server {
    listen __PORT__NUMBER__;
    server_name __DOMAIN__NAME__ www.__DOMAIN__NAME__;
    
    ___SERVER___CONFIGS___

    ___LOCATION___CONFIGS___
}
`

const sample = {
    server:{
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
                },
                2:{
                    name:`"~^(\d{4})-(\d{2})-(\d{2})"`,
                    match:`$1`
                },
                3:{
                    name:`"~^(\d{4})-(\d{2})-(\d{2})"`,
                    match:`$1`
                }
            }
        }
    },
    location:{

    }
}

const compile = async (site, appConfig, nConf, req, res, next) => {
    const conf = req.helpers.json.val(site, 'configs', {});
    const confl = await req.helpers.json.length(conf);

    if(confl > 0){
        await locationConfig.start(site, appConfig, nConf, req, res, next);
    };
}

const parse = async (appConfig, nginxConf, req, res, next) => {
    let dir = req.helpers.json.val(nginxConf, 'dirs.sitesEnabled', true);
    let enabled = req.helpers.json.val(appConfig, 'nginxConf.sites.enabled', true);
    let sites = req.helpers.json.val(appConfig, 'nginxConf.sites.configs.apps', {});

    if(enabled && dir){
        for(const a in sites){
            await compile(sites[a], appConfig, nginxConf, req, res, next);
            await upstream.start(sites[a], appConfig, nginxConf, req, res, next)
        }
    }

    await serverConfig.start(appConfig, nginxConf, req, res, next);
}

exports.parse = parse;