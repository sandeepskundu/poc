
const helpers = require('ui-helpers');
const datamaker = require('./data-maker');

const base = {
    "request":{
        request:{
            params:{
                id:'ui'
            },
            url:'/merchant-admin/appDetails/details/v1/getAppListByCategory/fetch/:_id_:'
        },
        dataMaker:datamaker.start,
        responseDataMap:{
            "fallback":{},
            "from":"data",
            "to":"application.list",
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