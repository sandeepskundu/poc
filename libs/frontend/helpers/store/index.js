const json = require('./../json');
const data = require('./../data');
const random = require('./../random');
const detailsById = require('./details-by-id');
const getConstants = require('./get-constants');
const request = require('./../request/index');

const DEFAULT_VALUE = "___UNDEFINED___VALUE___"

const map = {
    parentChilds:require('./parentChilds')
}

const base = {
    "name":'',
    "request":{
        cache:{
            name:"",
            ttl:2000,
            enabled:true,
            basedOn:{
                url:true,
                data:true,
                query:true,
                method:true,
                params:true,
                others:true
            }
        },
        request:{
            data:{},
            params:{},
            headers:{},
            method:'get',
            //url:'http://localhost:1300/cdn/gUtilsApi/health?r'+random.id()
        },
        options:{
            timeout:100000,
            baseURL:'apiBasePath'
        }
    }
}

const respKey = (name) => {
    let rval = [];

    if(name){
        rval = name.split('.')
    }

    return rval.join('_')
}

const getConfig = (config, storemap) => {
    let bconfig = {...base};
    let name = json.val(config, 'name', '');
    let confBackup = json.copy(config);
    let getConf = json.val(storemap, `${name}.getConfig`);
        delete confBackup.request;
        bconfig = json.set(bconfig, 'cache.name', name, false, true);
        bconfig = json.set(bconfig, 'request.extra', confBackup, false, true);
        bconfig = json.set(bconfig, 'request.extra.name', name, false, true);
        bconfig = json.set(bconfig, 'request.extra.respKey', respKey(name), false, true)

        if(!getConf){
            getConf = json.val(map, `${name}.getConfig`);
        }

        if(getConf){
            bconfig = json.merge(bconfig, getConf(bconfig, config))
        }

        bconfig = json.merge(bconfig, config || {});

        return json.val(bconfig, 'request', {});
}

const getList = (list, storemap) => {
    const rval = [];

    if(list && list.length > 0){
        for(const a in list){
            rval.push(getConfig(list[a], storemap));
        }
    }

    return rval;
}

const mapResponse = (rval, resp, arg, storemap) => {
    let config = json.val(resp, 'config', {})
    let name = json.val(config, 'extra.name', '__');
    let rkey = json.val(config, 'extra.respKey', '__')
    let to =  json.val(config, 'responseDataMap.to', '')
    let data = json.val(rval, `${rkey}.${to}`, DEFAULT_VALUE);

    if(to && data != DEFAULT_VALUE){
        delete rval[name];
        delete rval[rkey];
        rval = json.set(rval, to, data, false, true);
    }

    return rval;
}

const parse = (rval, resp, arg, storemap) => {
    const res = json.val(resp, 'resp', {});
    const config = json.val(resp, 'config', {})
    const name = json.val(config, 'extra.name', '');
    const respkey = json.val(config, 'extra.respKey', '');

    if(name && map && map[name] && map[name].dmaker){
        rval[respkey] = map[name].dmaker(res, config, arg);
    }else{
        if(name){
            rval[respkey] = res;
        }
    }

    return mapResponse(rval, resp, arg, storemap);
}

const onRespCb = (resp, onResp, arg, storemap, isque) => {
    let rval = {};

    if(resp && resp.length > 0 && !isque){
        for(const a in resp){
            rval = parse(rval, resp[a], arg, storemap);
        }
    }else{
        if(isque){
            rval = parse(rval, resp, arg, storemap);
        }
    }

    if(onResp){
        onResp(rval);
    }
}

const get = (config, onResp, storemap) => {
    let list = [];
    let isObj = data.type.is(config, 'object');
    let isList = data.type.is(config, 'array');

    if(isList){
        list = getList(config, storemap);
    }else{
        if(isObj && !isList){
            list.push(getConfig(config, storemap));
        }
    }

    if(list.length > 0){
        request.ui.list.get(list, (resp, config, isque) => {
            onRespCb(resp, onResp, config, storemap, isque);
        });
    }else{
        if(onResp){
            onResp({});
        }
    }
};

const getDetailsById = (config, onResp, skipParams) => {
    let configs = detailsById.init(config, skipParams);
    let list = json.val(configs, 'list', []);
    let storemap = json.val(configs, 'storemap', {});

    if(list && list.length > 0){
        get(list, onResp, storemap);
    }else{
        get(null, onResp, {})
    }
}

exports.get = get;
exports.getConstants = getConstants;
exports.getDetailsById =getDetailsById;