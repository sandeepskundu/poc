const helpers = require('ui-helpers');

const base = {
    request:{
        options:{
            endpoint:'stortbook.components.list.map',
        },
        request:{
            method:'get'  
        },
        dataMaker:(data, rawResp, configs, error) => {
            return helpers.json.val(data, 'data', {});
        },
        responseDataMap:{
            "fallback":{},
            "from":"data",
            "to":"components",
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