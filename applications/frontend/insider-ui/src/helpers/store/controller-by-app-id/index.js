const helpers = require('ui-helpers');

const base = {
    request:{
        request:{
            method:'get',
            params:{
                appId:helpers.json.val(_siteProps_, 'router.params.appId', '')
            },
            url:`/api/tdc-backend/apiSchema/details/v1/controllersByAppId/fetch/:_appId_:/controller`,  
        },
        dataMaker:(data, rawResp, configs, error) => {
            return helpers.json.val(data, 'data.result', []);
        },
        responseDataMap:{
            "fallback":{},
            "from":"data",
            "to":"appControllers",
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