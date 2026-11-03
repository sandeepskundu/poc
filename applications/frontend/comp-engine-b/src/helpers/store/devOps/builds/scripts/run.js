const helpers = require('ui-helpers');

const base = {
    request:{
        options:{
            endpoint:'devOps.builds.scripts.run',
        },
        request:{
            type:'stream',
            method:'post'
        },
        dataMaker:(data, rawResp, configs, error) => {
            return helpers.json.val(data, 'data', {});
        },
        responseDataMap:{
            "fallback":{},
            "from":"data",
            "to":"compDetails"
        },
        callbacks:{
            onOpen:(resp, ajaxConfig, onResp, raw)=>{
                console.log('onOpen');
                console.log(resp.data);
            },
            onEvent:(resp, ajaxConfig, onResp, raw) => {
                console.log('onEvent');
                console.log(resp.data);
                console.log(resp.data.data.msg);
            },
            onError:(resp, ajaxConfig, onResp, raw)=>{
                console.log('onError');
                console.log(resp);
            },
            onComplete:(resp, ajaxConfig, onResp, raw)=>{
                console.log('onComplete');
                console.log(resp);
            }
        }
    }
}

const getConfig = (bconf, config) => {
    let rval = helpers.json.merge(base, config);
        rval = helpers.json.merge(bconf, rval);
    return rval;
}

module.exports = {
    getConfig:getConfig
}