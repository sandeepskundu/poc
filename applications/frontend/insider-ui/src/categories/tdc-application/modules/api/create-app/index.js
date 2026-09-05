import helpers from 'ui-helpers';
import apiHelpers from './../helpers';

const urls = {
    ui:'/api/tdc-api/appDetails/details/v1/createUiApp/create',
    api:'/api/tdc-api/appDetails/details/v1/createApiApp/create'
}

const url = (arg) => {
    const cate = helpers.json.val(arg, 'category', '');
    return urls[cate] || null;
}

const init = (details, callback) => {
    
    if(callback){
        const rq = apiHelpers.appSchema.refine.init(details);
        const conf = helpers.json.merge({
            request:{
                method:'post',
                url:url(details),
            },
            onResponse:(resp, arg) => {
                let res = helpers.json.val(resp, 'data', {});
                let valid = helpers.json.val(resp, 'valid', false);

                if(valid){
                    helpers.url.route.redirect('tdc-application.details', {
                        params:{
                            action:'update',
                            appId:helpers.json.val(res, 'vd.id')
                        }
                    })
                }else{
                    //callback(res);
                    alert('Opps, something went wrong');
                }
            }
        }, rq);

        helpers.request.ui.init(conf);
    }
}

export default {
    init:init
}