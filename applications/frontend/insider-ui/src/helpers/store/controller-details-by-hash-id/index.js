const helpers = require('ui-helpers');

const base = {
    request:{
        request:{
            method:'get',
            params:{
                parentId:helpers.json.val(_siteProps_, 'router.params.parentId', '')
            },
            url:`/api/tdc-backend/apiSchema/details/v1/getChildDetailsByHashId/fetch/:_parentId_:`,  
        },
        dataMaker:(data, rawResp, configs, error) => {
            return helpers.json.val(data, 'data.result.0', {});
        },
        responseDataMap:{
            "fallback":{},
            "from":"data",
            "to":"parentData",
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