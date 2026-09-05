const helpers = require('ui-helpers');

const base = {
    request:{
        request:{
            method:'get',
            url:`/api/tdc-cms/cmsData/details/v1/root/fetch`,  
        },
        dataMaker:(data, rawResp, configs, error) => {
            return helpers.json.val(data, 'data.result', []);
        },
        responseDataMap:{
            "fallback":{},
            "from":"data",
            "to":"rootCmsData",
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