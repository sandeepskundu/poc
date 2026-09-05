import helpers from 'ui-helpers';

const config = (callback, req) => {
    return helpers.json.merge({
        request:{
            method:'put',
            url:`/api/tdc-frontend/uiComponent/details/v1/atomic/update/:_id_:`,  
        },
        dataMaker:(data, rawResp, configs, error) => {
            let vaild = helpers.json.val(data, 'valid', false);
            if(vaild){
                let hashId = helpers.json.val(data, 'data.hashId', '');
                    helpers.url.route.redirect('tdc-interface-kit.uiComponents', {params:{action:'update',id:hashId}});
            }else{
                alert('Opps something went wrong, pls try again.')
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