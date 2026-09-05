import helpers from 'ui-helpers';

const config = (req, cb) => {
    let map = 'tdc.app.updateUiAppById';
    let type = helpers.json.val(_siteProps_, 'router.params.type', '');

    if(type === 'api'){
        map = 'tdc.app.updateApiAppById';
    }

    return helpers.json.merge({
        options:{
            endpoint:map,
        },
        onResponse:(resp, configs) => {
            let vaild = helpers.json.val(resp, 'valid', false);
            if(vaild){
                window.location.reload();
            }else{
                setTimeout(() => {cb(helpers.json.val(resp, 'data', {}))}, 200);
            }
        }
    }, (req || {}))
}

const init = (req, cb) => {
    helpers.request.ui.byType.update(config(req, cb), cb)
}

export default {
    init:init
}