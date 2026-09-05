const helpers = require('ui-helpers');

const base = {
    request:{
        request:{
            method:'get',
            params:{
                appId:helpers.json.val(_siteProps_, 'router.params.appId', '')
            },
            url:`/api/tdc-api/appDetails/details/v1/getDetailsById/fetch/:_appId_:`,  
        },
        dataMaker:(data, rawResp, configs, error) => {
            return helpers.json.val(data, 'data.result.0', {});
        },
        responseDataMap:{
            "fallback":{},
            "from":"data",
            "to":"appDetails",
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