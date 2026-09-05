const sampleApi = require('./sample');
const tryRequire = process.nodeModules('try-require');

const urls = {
    controllers:'/tdc-backend/apiSchema/details/v1/controllersByAppId/fetch/:_appId_:/controller',
    childByParentId:`/tdc-backend/apiSchema/details/v1/getChildsByParentId/fetch/:_parentId_:`
}

const doRequire = (url, noRequire) => {
    if(noRequire){
        return url;
    }else{
        return tryRequire(url);
    }
}

const childConfig = async (item, appConfig, req, res, next) => {
    let resp = await req.helpers.s2s.internal.init({
        name:'1',
        request:{
            url:urls.childByParentId,
            params:{
                parentId:item.hashId
            },
        }
    }, req, res, next);

    return req.helpers.json.val(resp, 'resp.data.data.result', []);
}

const method = async (rval, map, item, appConfig, req, res, next) => {
    let type = req.helpers.json.val(item, 'type');
    let name = req.helpers.json.val(item, 'name')

    if(type && name){
        let resp = await childConfig(item, appConfig, req, res, next);
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
        let resp = await childConfig(item, appConfig, req, res, next);
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
        let resp = await childConfig(item, appConfig, req, res, next);
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
        let resp = await childConfig(item, appConfig, req, res, next);
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
    let resp = await req.helpers.s2s.internal.init({
        name:'1',
        request:{
            url:urls.controllers,
            params:{
                appId:req.helpers.json.val(appConfig, 'vd.id')
            },
        }
    }, req, res, next);

    const status = req.helpers.json.val(resp, 'resp.status');
    const list = req.helpers.json.val(resp, 'resp.data.data.result', []);

    if(list && list.length > 0){
        for(const a in list){
            rval = await actions(rval, list[a], appConfig, req, res, next);
        }
    }

    return rval;
}

const compileData = async (arg, appConfig, req, res, next) => {
    let rval = {};

    for(const a in arg){
        let item = arg[a];
        let isfun = req.helpers.data.type.is(item, 'function');

        if(isfun){
            rval[a] = await item(arg, appConfig, req);
        }else{
            rval[a] = item; 
        }
    }

    return rval;
}


const compileApies = async (list, appConfig, req, res, next) => {
    const rval = {};

    for(const a in list){
        rval[a] = await compileData(list[a], appConfig, req, res, next);
    }

    return rval;
}

const appSelfApi = async (appConfig, req, res, next) => {
    let rv = {...sampleApi};
    let appApi = await doRequire(`${appConfig.dirs.srcDir}/configs/apies`);
    let isobj = req.helpers.data.type.is(appApi, 'object');
    let isfun = req.helpers.data.type.is(appApi, 'function');

    if(isfun){
        rv = await appApi(rv, appConfig, req, res, next);
    }else{
        if(isobj){
            rv = {...rv, ...appApi};
        }
    };

    return await compileApies({...rv, ...appApi}, appConfig, req, res, next);
}

const list = async (appConfig, req, res, next) => {
    const rval = await appSelfApi(appConfig, req, res, next);
    const dval = await controllers(appConfig, req, res, next);

    return {...rval, ...dval}
}


exports.list = list;