import helpers from 'ui-helpers';

const config = (req, cb) => {
    let map = 'tdc.app.createUiApp';
    let type = helpers.json.val(_siteProps_, 'router.params.type', '');

    if(type === 'api'){
        map = 'tdc.app.createApiApp';
    }


    return helpers.json.merge({
        options:{
            endpoint:map,
        },
        onResponse:(resp, configs) => {
            let vaild = helpers.json.val(resp, 'valid', false);
            if(vaild){
                helpers.url.route.redirect('tdc.app-details-form', {
                    params:{
                        type:type,
                        id:helpers.json.val(resp, 'data.vd.id', '')
                    }
                });
            }else{
                setTimeout(() => {cb(helpers.json.val(resp, 'data', {}))}, 200);
            }
        }
    }, (req || {}))
}

const init = (req, cb) => {
    helpers.request.ui.byType.create(config(req, cb), cb)
}

export default {
    init:init
}