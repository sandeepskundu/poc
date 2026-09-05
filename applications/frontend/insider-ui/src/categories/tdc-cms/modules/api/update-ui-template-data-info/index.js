import helpers from 'ui-helpers';
import dmaker from './data-maker';

const config = (callback, req) => {
    return helpers.json.merge({
        request:{
            method:'put',
            url:`/api/tdc-cms/templateData/details/v1/info/update/:_id_:`,  
        },
        dataMaker:(data, rawResp, configs, error) => {
            return helpers.json.val(data, 'data', {});
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