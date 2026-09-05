const parser = require('./../parser');
const siteHelpers = require('./helpers');

const baseChilds = async (site, appConfig, nConf, req, res, next, type) => {
    let count = 0;
    let bchilds = req.helpers.json.val(site, 'configs.location.base.childs', {});
    let sitename = await siteHelpers.getSiteName(site, appConfig, nConf, req, res, next);
    let rval = {
        0:{
            name:'proxy_pass',
            match:`http://${(type?type+'_':'')}${sitename}`
        }
    };

    for(const a in bchilds){
        const item = bchilds[a];
        if(item.name != 'proxy_pass'){
            count = count+1;
            rval[count] = item;
        }
    }

    rval[10000] = {
        type:'placeholder',
        name:await addProxyTemplate(site, appConfig, nConf, req, res, next, type)
    }

    rval[10001] = {
        type:'placeholder',
        name:await addRuntimeChildProxy(site, appConfig, nConf, req, res, next, type)
    }

    return rval;
}

const getAppNameByType = async (site, appConfig, nConf, req, res, next, type) => {
    let rval = [];
    let appname = req.helpers.json.val(site, 'appConfig.appName', '');

    if(type && type != 'public'){
        rval.push(type);
    }

    rval.push(appname);

    return req.helpers.url.sanitize(`/${rval.join('/')}`);
}

const getRootLocation = async (site, appConfig, nConf, req, res, next, type) => {
    return {
        type:'object',
        name:'location',
        match:await getAppNameByType(site, appConfig, nConf, req, res, next, type), //`${internal?'/internal':''}/${appname}`,
        childs:await baseChilds(site, appConfig, nConf, req, res, next, type)
    }
}

const addRuntimeChildProxy = async (site, appConfig, nConf, req, res, next, type) => {
    let childs = req.helpers.json.val(site, 'configs.location.childs', {});
    let childsl = req.helpers.json.length(childs);
    let map = {
        __APPEND__APP__ROOT__PATH__MATCH__:await getAppNameByType(site, appConfig, nConf, req, res, next, type)
    }

    if(childsl > 0){
        let rv = parser.start(``, childs, 1, req);

        for(const a in map){
            rv = await req.helpers.string.replace.word(rv, a, map[a]);
        }

        return rv;
    }else{
        return ``;
    }
}

const addProxyTemplate = async (site, appConfig, nConf, req, res, next, type) => {
    let pl = '';
    let proxy = req.helpers.json.val(site, 'configs.location.proxy', {});
    let map = {
        __APPEND__APP__ROOT__PATH__MATCH__:await getAppNameByType(site, appConfig, nConf, req, res, next, type)
    }

    for(const a in proxy){
        pl = `${pl}${proxy[a]}\n`;
    }

    for(const a in map){
        pl = await req.helpers.string.replace.word(pl, a, map[a]);
    }

    return pl;
}

const parse = async (site, appConfig, nConf, req, res, next) => {
    const exp = await siteHelpers.getAppExposedInOrder(site, appConfig, nConf, req, res, next);

    const getConfg = async () => {
        const rval = {}

        for(const a in exp){
            rval[a] = await getRootLocation(site, appConfig, nConf, req, res, next, exp[a])
        }

        return rval;
    }

    return await parser.start(``, await getConfg(), 0, req);
}

const start = async (site, appConfig, nConf, req, res, next) => {
    const dir = req.helpers.json.val(nConf, 'dirs.sitesEnabled');
    const loc = await parse(site, appConfig, nConf, req, res, next);
    const pdir = req.helpers.json.val(nConf, 'enums.locationProxyDir');
    const sitename = await siteHelpers.getSiteName(site, appConfig, nConf, req, res, next);
    const path = `${dir}/${pdir}/${sitename}.conf`;
    await req.helpers.file.writer.async.write(path, loc);
}

exports.start = start;