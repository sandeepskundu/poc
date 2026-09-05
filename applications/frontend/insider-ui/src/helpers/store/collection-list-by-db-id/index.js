const helpers = require('ui-helpers');
const datamaker = require('./data-maker');

const base = {
    request:{
        request:{
            method:'get',
            params:{
                dbId:helpers.json.val(_siteProps_, 'router.params.dbId', '')
            },
            url:`/api/tdc-db/collections/schema/v1/getDetailsByDbId/fetch/:_dbId_:`,  
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
            "to":"collections",
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