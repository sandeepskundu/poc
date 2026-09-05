const helpers = require('ui-helpers');
const datamaker = require('./data-maker');

const base = {
    request:{
        request:{
            method:'get',
            params:{
                "category":'api'
            },
            url:`/api/tdc-api/appDetails/details/v1/getAppListByCategory/fetch/:_category_:`,
            
        },
        dataMaker:(data, rawResp, configs, error) => {
            let res = helpers.json.val(data, 'data.result', []);
            return datamaker.start(res);
        },
        onResponse:(resp, arg) => {
            let res =  helpers.json.val(resp, 'data', {});
            setTimeout(() => {callback(res)}, 200);    
        },
        responseDataMap:{
            "fallback":{},
            "from":"data",
            "to":"applications",
        },
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