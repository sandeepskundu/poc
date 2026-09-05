import helpers from 'ui-helpers';

const init = (details, callback) => {
    if(callback){
        helpers.request.ui.init({
            request:{
                method:'put',
                data:details,
                url:`http://localhost:9900/api/merchant-admin/appDetails/details/v1/updateUiApp/update/${helpers.url.param('appId')}`,
            },
            onResponse:(resp, arg) => {
                const res = helpers.json.val(resp, 'data', {});
                if(callback){
                    callback(res);
                }
            }
        });
    }
}

export default {
    init:init
}