const helpers = require('ui-helpers');
const datamaker = require('./data-maker');

const base = {
    request:{
        request:{
            method:'get',
            url:`/api/tdc-db/dbData/details/v1/list/fetch`,  
        },
        dataMaker:(data, rawResp, configs, error) => {
            let res = helpers.json.val(data, 'data.result', []);
            return datamaker.start(res);
        },
        responseDataMap:{
            "fallback":{},
            "from":"data",
            "to":"databases",
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