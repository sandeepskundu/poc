const json = require('./../json');
const data = require('./../data');

const getBase = () => {
    return {
        request:{
            options:{
                endpoint:'',
            },
            request:{
                method:'get',
                params:{
                    id:json.val(_siteProps_ || {}, 'router.params.id', '')
                }
            },
            dataMaker:(data, rawResp, configs, error) => {
                return json.val(data, 'data.result.0', {});
            },
            responseDataMap:{
                "fallback":{},
                "from":"data",
                "to":"details",
            },
        }
    }
}

const compile = (arg, skipId) => {
    let rval = {};
    let name = json.val(arg, 'name', '');
    let request = json.val(arg, 'request', {});
    let endpoint = json.val(arg, 'endpoint', name);

    if(name){
        let base = json.merge(getBase(), {
            request:{
                options:{
                    endpoint:endpoint,
                }
            }
        });
        base = json.merge(base, {request:request});

        if(skipId){
            base = json.set(base, 'request.request.params.id', '', false, true);
        }

        rval.map = json.set({}, `${name}.getConfig`, () => {
            return base;
        }, false, true);
        rval.config = {name:name};
    }
    
    return rval;
}

const getList = (list, skipId) => {
    const rval = {
        list:[],
        storemap:{}
    }

    if(list && list.length > 0){
        for(const a in list){
            const {config, map} = compile(list[a], skipId);
            if(config){
                rval.list.push(config);
                rval.storemap = json.merge(rval.storemap, map || {})
            }
        }
    }

    return rval;
}

const init = (config, skipId) => {
    let isObj = data.type.is(config, 'object');
    let isList = data.type.is(config, 'array');

    if(isList){
        return getList(config, skipId);
    }else{
        if(isObj && !isList){
            return getList([config], skipId);
        }
    }
}

exports.init = init;