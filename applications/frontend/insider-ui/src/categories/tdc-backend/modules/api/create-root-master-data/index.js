import helpers from 'ui-helpers';
import dmaker from './data-maker';

const config = (callback, req) => {
    return helpers.json.merge({
        request:{
            method:'post',
            url:`/api/tdc-backend/masterData/details/v1/root/create`,  
        },
        dataMaker:(data, rawResp, configs, error) => {
            let vaild = helpers.json.val(data, 'valid', false);

            if(vaild){
                let hashId = helpers.json.val(data, 'data.hashId', '');
                    helpers.url.route.redirect('tdc-backend.masterDataList', {params:{action:'view',id:hashId}});
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
    config:config,
    dmaker:dmaker
}