const helpers = require('ui-helpers');

const base = {
    request:{
        options:{
            endpoint:'access.roles.rootRoles',
        },
        request:{
            method:'get'  
        },
        dataMaker:(data, rawResp, configs, error) => {
            return helpers.json.val(data, 'data.result', []);
        },
        responseDataMap:{
            "fallback":{},
            "from":"data",
            "to":"rootRoles",
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