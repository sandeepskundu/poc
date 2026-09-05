const json = require('./../json');
const dHelpers = require('./../data');
const crypto = require('./../crpt');
const request = require('./../request/index');

const getData = (arg) => {
    return {
        includes:json.val(arg, 'request.data.includes', {})
    }
}

const getKey = (data) => {
    return crypto.md5(JSON.stringify(data || {}));
}

const getToken = (data, key) => {
    return crypto.encrypt(data || {}, key);
}

const getConfig = (arg, onResp) => {
    const data = getData(arg);
    const key = getKey(data);
    return {
        cache:{
            name:key,
            ttl:2000,
            enabled:true,
            basedOn:{
                url:true,
                data:true,
                method:true,
                params:false,
                headers:false,
                others:false
            }
        },
        request:{
            headers:{},
            method:'post',
            params:{
                id:key
            },
            data:{
                token:getToken(data, key)
            },
            url:'http://internal.aiodeal.local/api/irms/utils/consts/:_id_:',
        },
        options:{
            timeout:100000,
            pathMap:"common.auth",
            baseURL:'apiBasePath'
        },
        onResponse:(resp, config) => {
            let data = json.val(resp, 'data', {});
            let dmakers = json.val(arg, 'dataMakers', {});
            let isObj = dHelpers.type.is(dmakers, 'object');

            if(isObj){
                let dmakersLen = json.length(dmakers || {});

                if(dmakersLen > 0){
                    for(let a in dmakers){
                        let fun = dmakers[a];
                        let isFun = dHelpers.type.is(fun, 'function');

                        if(isFun){
                            let val = json.val(data, a);
                                json.remove(data, a);
                                val = fun(val);
                                data = json.set(data, a, val, false, true);
                        }
                    }
                }
            }

            if(onResp){
                let isFun = dHelpers.type.is(onResp, 'function');

                if(isFun){
                    onResp(data);
                }
            }
        }
    }
}

module.exports = (config, onResp) => {
    request.ui.init(getConfig(config, onResp));
}