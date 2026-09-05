const helpers = require('ui-helpers');

const base = {
    request:{
        options:{
            endpoint:'orgStructure.hierarchy.hierarchyDataByHash',
        },
        request:{
            method:'get',
            params:{
                id:helpers.json.val(_siteProps_, 'router.params.id', '')
            }
        },
        dataMaker:(data, rawResp, configs, error) => {
            return helpers.json.val(data, 'data.result.0', {});
        },
        responseDataMap:{
            "fallback":{},
            "from":"data",
            "to":"hierarchyData",
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