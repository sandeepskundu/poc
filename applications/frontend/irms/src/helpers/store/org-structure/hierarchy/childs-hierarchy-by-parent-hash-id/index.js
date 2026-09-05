const helpers = require('ui-helpers');

const base = {
    request:{
        options:{
            endpoint:'orgStructure.hierarchy.childHierarchyByParentHashId',
        },
        request:{
            method:'get',
            params:{
                id:helpers.json.val(_siteProps_, 'router.params.id', '')
            }
        },
        dataMaker:(data, rawResp, configs, error) => {
            return helpers.json.val(data, 'data.result', []);
        },
        responseDataMap:{
            "fallback":{},
            "from":"data",
            "to":"childHierarchyByParentHashId",
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