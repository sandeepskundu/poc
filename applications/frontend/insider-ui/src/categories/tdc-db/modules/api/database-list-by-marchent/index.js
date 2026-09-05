import helpers from 'ui-helpers';
import dmaker from './data-maker';

const init = (callback) => {
    if(callback){
        helpers.request.ui.init({
            request:{
                method:'get',
                url:`/api/tdc-db/dbData/details/v1/list/fetch`,
                
            },
            onResponse:(resp, arg) => {
                let res = helpers.json.val(resp, 'data.result', []);
                    res = dmaker.init(res);
                    setTimeout(() => {callback(res)}, 200);
                    
            }
        })
    }
}

export default {
    init:init
}