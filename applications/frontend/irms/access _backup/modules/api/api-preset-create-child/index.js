import helpers from 'ui-helpers';

const config = (callback, req) => {
    return helpers.json.merge({
        options:{
            validate:true,
            endpoint:'access.apiPreset.createChildPreset',
        },
        request:{
            method:'post'
        },
        onResponse:(resp, configs) => {
            let vaild = helpers.json.val(resp, 'valid', false);
            if(vaild){
                let hashId = helpers.json.val(resp, 'data.hashId', '');
                    helpers.url.route.redirect('access.apiPresets', {params:{action:'view',id:hashId}});
            }else{
                setTimeout(() => {callback(helpers.json.val(resp, 'data', {}))}, 200);
            }
        }
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