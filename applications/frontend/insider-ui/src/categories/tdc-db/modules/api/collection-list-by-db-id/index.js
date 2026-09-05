import helpers from 'ui-helpers';
import dmaker from './data-maker';

const config = (callback, req) => {
    return helpers.json.merge({
        request:{
            method:'get',
            url:`/api/tdc-db/collections/schema/v1/getDetailsByDbId/fetch/:_dbId_:`,  
        },
        dataMaker:(data, rawResp, configs, error) => {
            return dmaker.init(helpers.json.val(data, 'data.result', []));
        },
        onResponse:(resp, arg) => {
            let res =  helpers.json.val(resp, 'data', {})
            setTimeout(() => {callback(res)}, 200);    
        },
        responseDataMap:{
            "fallback":{},
            "from":"data",
            "to":"collection",
        },
    }, (req || {}))
}

const init = (callback, req) => {
    if(callback){
        helpers.request.ui.init(config(callback, {...(req || {}), ...{responseDataMap:false}}))
    }
}

export default {
    init:init,
    config:config,
    dmaker:dmaker
}