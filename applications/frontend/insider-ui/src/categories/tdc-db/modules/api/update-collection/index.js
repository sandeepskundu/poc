import helpers from 'ui-helpers';

const init = (callback, req) => {
    if(callback){
        helpers.request.ui.init(
            helpers.json.merge({
                request:{
                    method:'put',
                    url:`/api/tdc-db/collections/schema/v1/details/update/:_id_:`,
                    
                },
                onResponse:(resp, arg) => {
                    callback(resp)
                }
            }, (req || {})
        ))
    }
}

export default {
    init:init
}