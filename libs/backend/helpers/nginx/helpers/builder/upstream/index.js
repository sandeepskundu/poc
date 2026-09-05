const siteHelpers = require('./../sites/helpers');
const parser = require('./../parser');


/*--

upstream backend {
    server localhost:1300;
    server localhost:1301;
    server localhost:1302;
    server localhost:1303;
}



0:{
                                                    "name":"map",
                                                    "type":'object',
                                                    "match":`$time_iso8601 $year`,
                                                    "childs":{
                                                        0:{
                                                            name:`default`,
                                                            match:`'0000'`
                                                        }
                                                    }
                                                }
--*/

const servers = async (type, site, appConfig, nginxConf, req, res, next) => {
    let rval = {};
    let ports = req.helpers.json.val(site, `appConfig.ports.${type}`);
    let instances = req.helpers.json.val(site, `appConfig.instances.${type}`);
        ports = parseInt(ports);
        instances = parseInt(instances);

    if(ports && instances){
        for(let a = 0; a < instances; a++){
            rval[a] = {
                name:'server',
                match:`localhost:${ports+a}` 
            }
        }
    }

    return rval;
}

const parse = async (type, site, appConfig, nginxConf, req, res, next) => {
    let appname = await siteHelpers.getSiteName(site, appConfig, nginxConf, req, res, next);

    return parser.start(``, {0:{
        name:"upstream",
        "type":'object',
        "match":`${(type?type+'_':'')}${appname}`,
        "childs":await servers(type, site, appConfig, nginxConf, req, res, next)
    }}, 0, req);
}

const start = async (site, appConfig, nginxConf, req, res, next) => {
    let upstream = ``;
    let conf = req.helpers.json.val(site, 'configs', {});
    let confl = await req.helpers.json.length(conf);
    let dir = req.helpers.json.val(nginxConf, 'dirs.upstream');
    let appname = await siteHelpers.getSiteName(site, appConfig, nginxConf, req, res, next);
    let exposedIn = await siteHelpers.getAppExposedInOrder(site, appConfig, nginxConf, req, res, next);
    let file = await req.helpers.url.sanitize(`${dir}/${appname}.conf`);

    if(confl > 0){
        for(const a in exposedIn){
            upstream = `${upstream}${await parse(exposedIn[a], site, appConfig, nginxConf, req, res, next)}\n`
        }
    }

    await req.helpers.file.writer.async.write(file, upstream);
}

exports.start = start;