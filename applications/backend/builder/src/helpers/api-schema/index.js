const sampleApi = require('./sample'); 
const tryRequire = require('try-require');

const doRequire = (url, noRequire) => {
    if(noRequire){
        return url;
    }else{
        return tryRequire(url);
    }
}

const childConfig = async (item, appConfig, req, res, next) => {
    return {
        url:`http://localhost:9900/api/merchant-admin/apiSchema/parentId/v1/controller/fetch/${item.hashId}`
    }
}

const method = async (rval, map, item, appConfig, req, res, next) => {
    let type = req.helpers.json.val(item, 'type');
    let name = req.helpers.json.val(item, 'name')

    if(type && name){
        let resp = await req.helpers.s2s.axios.init(await childConfig(item, appConfig, req, res, next), req, res, next);
            resp = req.helpers.json.val(resp, 'data.result', []);
            map.push(name);

        if(resp && resp.length > 0){
            for(const a in resp){
                let mm = [...map];
                let mitem = resp[a];
                let nm = req.helpers.json.val(mitem, 'name')
                    mm.push(nm);
                    rval[mm.join('/')] = mitem;
            }
        }
    }

    return rval;
}

const job =  async (rval, map, item, appConfig, req, res, next) => {
    let type = req.helpers.json.val(item, 'type');
    let name = req.helpers.json.val(item, 'name')

    if(type && name){
        let resp = await req.helpers.s2s.axios.init(await childConfig(item, appConfig, req, res, next), req, res, next);
            resp = req.helpers.json.val(resp, 'data.result', []);
            map.push(name);

        if(resp && resp.length > 0){
            for(const a in resp){
                rval = await method(rval, [...map], resp[a], appConfig, req, res, next)
            }
        }
    }

    return rval;
};

const version = async (rval, map, item, appConfig, req, res, next) => {
    let type = req.helpers.json.val(item, 'type');
    let name = req.helpers.json.val(item, 'name');

    if(type && name){
        let resp = await req.helpers.s2s.axios.init(await childConfig(item, appConfig, req, res, next), req, res, next);
            resp = req.helpers.json.val(resp, 'data.result', []);
            map.push(name);

        if(resp && resp.length > 0){
            for(const a in resp){
                rval = await job(rval, [...map], resp[a], appConfig, req, res, next)
            }
        }
    }

    return rval;
};

const actions = async (rval, item, appConfig, req, res, next) => {
    let type = req.helpers.json.val(item, 'type');
    let name = req.helpers.json.val(item, 'name')

    if(type && name){
        let resp = await req.helpers.s2s.axios.init(await childConfig(item, appConfig, req, res, next), req, res, next);
            resp = req.helpers.json.val(resp, 'data.result', []);

        if(resp && resp.length > 0){
            for(const a in resp){
                rval = await version(rval, [name], resp[a], appConfig, req, res, next)
            }
        }
    }

    return rval;
}

const controllers = async (appConfig, req, res, next) => {
    let rval = {};
    let resp = await req.helpers.s2s.axios.init({
        url:`http://localhost:9900/api/merchant-admin/apiSchema/details/v1/controller/fetch/${appConfig.appInfo.appId}/CONTROLLER`
    }, req, res, next);

    let list = req.helpers.json.val(resp, 'data.result', []);

    if(list && list.length > 0){
        for(const a in list){
            rval = await actions(rval, list[a], appConfig, req, res, next);
        }
    }

    return rval;
}

const appSelfApi = async (appConfig, req, res, next) => {
    let rv = {...sampleApi};
    let appApi = await doRequire(`${appConfig.dirs.srcDir}/configs/apies`);

    return {...rv, ...appApi};
}

const list = async (appConfig, req, res, next) => {
    const rval = await appSelfApi(appConfig, req, res, next);
    const dval = await controllers(appConfig, req, res, next);

    return {...rval, ...dval}
}


exports.list = list;