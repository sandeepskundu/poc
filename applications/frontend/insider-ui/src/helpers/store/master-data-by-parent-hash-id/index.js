const helpers = require('ui-helpers');

const base = {
    request:{
        request:{
            method:'get',
            params:{
                id:helpers.json.val(_siteProps_, 'router.params.id', '')
            },
            url:`/api/tdc-backend/masterData/details/v1/getByParentId/fetch/:_id_:`,  
        },
        dataMaker:(data, rawResp, configs, error) => {
            return helpers.json.val(data, 'data.result', []);
        },
        responseDataMap:{
            "fallback":{},
            "from":"data",
            "to":"parentMasterData",
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