import helpers from 'ui-helpers';

const init = (callback, data) => {
    if(callback){
        helpers.request.ui.init({
            request:{
                data:data,
                method:'post',
                url:`/api/tdc-db/dbData/details/v1/new/create`,
                
            },
            onResponse:(resp, arg) => {
                callback(resp)
            }
        })
    }
}

export default {
    init:init
}