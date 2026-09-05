const helpers = require('ui-helpers');

const base = {
    request:{
        request:{
            method:'get',
            params:{
                hashId:helpers.json.val(_siteProps_, 'router.params.methodId', '')
            },
            url:`/api/tdc-backend/apiSchema/details/v1/method/fetch/:_hashId_:`,  
        },
        dataMaker:(data, rawResp, configs, error) => {
            return helpers.json.val(data, 'data.result.0', {

            });
        },
        responseDataMap:{
            "fallback":{},
            "from":"data",
            "to":"methodDetails",
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