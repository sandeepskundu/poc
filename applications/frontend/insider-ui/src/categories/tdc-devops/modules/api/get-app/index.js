import helpers from 'ui-helpers';

const init = (details, callback) => {
    if(callback){
        helpers.request.ui.init({
            request:{
                method:'get',
                url:`http://localhost:9900/api/merchant-admin/appDetails/details/v1/getDetailsById/fetch/${helpers.url.param('appId')}`,
                
            },
            onResponse:(resp, arg) => {
                const res = helpers.json.val(resp, 'data.result', []);

                if(res[0]){
                    callback(res[0]);
                }else{
                    //callback({});
                }
            }
        })
    }
}

export default {
    init:init
}