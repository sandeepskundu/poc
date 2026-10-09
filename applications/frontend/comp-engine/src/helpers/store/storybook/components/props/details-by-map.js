const helpers = require('ui-helpers');

const base = {
    request:{
        options:{
            endpoint:'stortbook.components.props.detailsByMap',
        },
        request:{
            method:'post'
        },
        dataMaker:(data, rawResp, configs, error) => {
            return helpers.json.val(data, 'data', {});
        },
        responseDataMap:{
            "fallback":{},
            "from":"data",
            "to":"propsDetails"
        }
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