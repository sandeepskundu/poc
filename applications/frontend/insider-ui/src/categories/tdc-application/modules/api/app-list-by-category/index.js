import helpers from 'ui-helpers';
import dmaker from './data-maker';

const init = (callback) => {
    if(callback){
        helpers.request.ui.init({
            request:{
                method:'get',
                params:{
                    "category":helpers.json.val(_siteProps_, 'router.params.type', '')
                },
                url:`/api/tdc-api/appDetails/details/v1/getAppListByCategory/fetch/:_category_:`,
                
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