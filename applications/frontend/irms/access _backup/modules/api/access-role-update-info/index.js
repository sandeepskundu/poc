import helpers from 'ui-helpers';

const config = (callback, req) => {
    return helpers.json.merge({
        options:{
            validate:true,
            endpoint:'access.roles.updateRoleInfo',
        },
        request:{
            method:'put',  
        },
        onResponse:(resp, arg) => {
            let res =  helpers.json.val(resp, 'data', {});
            let valid = helpers.json.val(resp, 'valid', false);

            if(valid){
                setTimeout(() => {callback({data:res})}, 200);
            }else{
                setTimeout(() => {callback(res)}, 200);
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