const helpers = require('ui-helpers');
const datamaker = require('./data-maker');

const base = {
    request:{
        request:{
            method:'get',
            params:{
                id:helpers.json.val(_siteProps_, 'router.params.id', '')
            },
            url:`/api/tdc-db/collections/schema/v1/getDetailsById/fetch/:_id_:`,  
        },
        dataMaker:(data, rawResp, configs, error) => {
            return helpers.json.val(data, 'data.result.0', {});
        },
        responseDataMap:{
            "fallback":{},
            "from":"data",
            "to":"collDetails",
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