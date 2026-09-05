import helpers from 'ui-helpers';

const init = (details, callback) => {
    if(callback){
        let action = helpers.json.val(_siteProps_, 'router.params.action', '');

        if(action === 'create'){
            callback(details);
        }else{
            helpers.request.ui.init({
                request:{
                    method:'get',
                    url:`/api/tdc-api/appDetails/details/v1/getDetailsById/fetch/${helpers.url.param('appId')}`,
                    
                },
                onResponse:(resp, arg) => {
                    const res = helpers.json.val(resp, 'data.result.0', {});
                    if(res){
                        callback({...details, ...res});
                    }else{
                        callback(details);
                    }
                }
            })
        }
        
    }
}

export default {
    init:init
}