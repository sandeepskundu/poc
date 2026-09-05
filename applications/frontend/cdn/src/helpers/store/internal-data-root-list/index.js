
const helpers = require('ui-helpers');
const datamaker = require('./data-maker');

const base = {
    "request":{
        request:{
            url:'http://localhost:9900/api/merchant-admin/internalMasterData/details/v1/getRootList/fetch'
        },
        dataMaker:datamaker.start,
        responseDataMap:{
            "fallback":{},
            "from":"data",
            "to":"sandeep.kundu.kinala",
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