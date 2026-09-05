import helpers from 'ui-helpers';

const config = (callback, req) => {
    return helpers.json.merge({
        options:{
            validate:true,
            endpoint:'access.map.create',
        },
        request:{
            method:'post'
        },
        onResponse:(resp, configs) => {
            let vaild = helpers.json.val(resp, 'valid', false);
            if(vaild){
                helpers.url.route.redirect('access.map', {
                    params:{
                        action:'update',
                        id:helpers.json.val(resp, 'data.vd.id', ''),
                        mId:helpers.json.val(_siteProps_, 'router.params.mId', 99),
                        type:helpers.json.val(_siteProps_, 'router.params.type', 99),
                    }
                });
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