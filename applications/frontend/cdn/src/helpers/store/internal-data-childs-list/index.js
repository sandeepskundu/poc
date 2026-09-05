
const helpers = require('ui-helpers');
const datamaker = require('./data-maker');

const base = {
    "request":{
        request:{
            params:{
                id:'ac8b0ea14859d563d1d6403a21c00ccc'
            },
            url:'http://localhost:9900/api/merchant-admin/internalMasterData/details/v1/getChildsList/fetch/:_id_:'
        },
        dataMaker:datamaker.start,
        responseDataMap:{
            "fallback":{},
            "from":"data",
            "to":"sandeep.kundu.hissar",
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