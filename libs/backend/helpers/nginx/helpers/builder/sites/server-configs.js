const parser = require('./../parser');

const server = `server {
    listen __PORT__NUMBER__;
    server_name __DOMAIN__NAME__ www.__DOMAIN__NAME__;
    
    ___SERVER___CONFIGS___

    ___LOCATION___CONFIGS___
}`

const templates  = {
    https:`
    if ($host = www.__DOMAIN__NAME__) {
        #return 301 https://$host$request_uri;
    }`,
    www:`
    if ($host = __DOMAIN__NAME__) {
        #return 301 https://www.$host$request_uri;
    }`,
    mobile:`
    if ($http_user_agent ~* '(iPhone|iPod|iPad|Android|BlackBerry|webOS|Windows Phone)') {
        return 301 https://www.m.__DOMAIN__NAME__$request_uri;
    }`
}

const wwwHandle = async (port, appConfig, nConf, req, res, next) => {
    if(port != 443 || port != '443'){
        return `${templates.https}
    
    ${templates.www}`
    }else{
        if(port === 443 || port === '443'){
            return templates.www;
        }
        return ``
    }
}

const deviceSite = async (port, appConfig, nConf, req, res, next) => {
    const ismobile = req.helpers.json.val(appConfig, 'nginxConf.sites.nginxDetails.isMobileSite');
    if(ismobile){
        return templates.mobile;
    }else{
        return ``;
    }
}

const others = async (port, appConfig, nConf, req, res, next) => {
    if(port === 443 || port === '443'){
        let r = parser.start(``, req.helpers.json.val(appConfig, 'nginxConf.sites.configs.server', {}), 1, req);
            return req.helpers.string.remove.multiline(r);
    }else{
        return ``;
    }
}

const redirect = async (port, appConfig, nConf, req, res, next) => {
    let rv = ``;
    const map = {
        0:await wwwHandle(port, appConfig, nConf, req, res, next),
        1:await deviceSite(port, appConfig, nConf, req, res, next),
        2:await others(port, appConfig, nConf, req, res, next)
    }
    
    for(const a in map){
        rv = `${rv}${map[a]}\n`;
    }

    return rv;
}

const portNumber = async (port, appConfig, nConf, req, res, next) => {
    let isDefault = req.helpers.json.val(appConfig, 'nginxConf.sites.nginxDetails.isDefault', {});

    if(isDefault){
        return `${port} default_server`
    }else{
        return `${port}`
    }
}

const host = async (appConfig, nConf, req, res, next) => {
    return req.helpers.json.val(appConfig, 'nginxConf.sites.nginxDetails.host', '');
}

const includeLoactions = async (appConfig, nConf, req, res, next) => {
    const dir = req.helpers.json.val(nConf, 'dirs.sitesEnabled');
    const pdir = req.helpers.json.val(nConf, 'enums.locationProxyDir');

    return `include ${dir}/${pdir}/*.conf`;
}

const placeholders = async (content, port, appConfig, nConf, req, res, next) => {
    let rval = server;
    let map = {
        ___SERVER___CONFIGS___:content,
        __DOMAIN__NAME__:await host(appConfig, nConf, req, res, next),
        __PORT__NUMBER__:await portNumber(port, appConfig, nConf, req, res, next),
        ___LOCATION___CONFIGS___:await includeLoactions(appConfig, nConf, req, res, next)
    }

    for(const a in map){
        rval = await req.helpers.string.replace.word(rval, a, map[a]);
    }
    
    return req.helpers.string.remove.multiline(rval);
}

const writeServer = async (arg, appConfig, nginxConf, req, res, next) => {
    let rv = ``;
    let dir = req.helpers.json.val(nginxConf, 'dirs.sitesEnabled');
    let file = req.helpers.json.val(appConfig, 'nginxConf.sites.nginxDetails.host');
    let fpath = req.helpers.url.sanitize(`${dir}/${file}.conf`);

    for(const a in arg){
        rv = `${rv}${arg[a]}\n\n`;
    }

    await req.helpers.file.writer.async.write(fpath, rv);
}

const start = async (appConfig, nConf, req, res, next) => {
    let rval = {}
    let ports = req.helpers.json.val(appConfig, 'nginxConf.sites.nginxDetails.ports', {});
    let portsl = await req.helpers.json.length(ports);
    let allowed = {
        80:true,
        443:true
    }

    if(portsl > 0){
        for(let a in ports){
            if(allowed[a] && ports[a]){
                let rv = await redirect(a, appConfig, nConf, req, res, next);
                    rval[a] = await placeholders(rv, a, appConfig, nConf, req, res, next);
            }
        }
    };

    await writeServer(rval, appConfig, nConf, req, res, next);
}

exports.start = start;