import helpers from 'ui-helpers';

const config = (callback, req) => {
    return helpers.json.merge({
        request:{
            method:'post',
            url:`/api/tdc-frontend/uiComponent/details/v1/info/create`,  
        },
        dataMaker:(data, rawResp, configs, error) => {
            let vaild = helpers.json.val(data, 'valid', false);

            if(vaild){
                let hashId = helpers.json.val(data, 'data.hashId', '');
                    helpers.url.route.redirect('tdc-interface-kit.uiComponents', {params:{action:'update',id:hashId}});
            }else{
                alert('Opps something went wrong, pls try again.')
            }
        },
        onResponse:(resp, arg) => {
            //let res =  helpers.json.val(resp, 'data', {})
            //setTimeout(() => {callback(res)}, 200);    
        },
        responseDataMap:{
            "fallback":{},
            "from":"data",
            "to":"cmslists",
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
    config:config
}