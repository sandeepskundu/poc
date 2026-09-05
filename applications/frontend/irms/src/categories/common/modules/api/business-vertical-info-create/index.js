import helpers from 'ui-helpers';

const config = (req, cb) => {
    return helpers.json.merge({
        options:{
            endpoint:'common.bvs.createInfo',
        },
        onResponse:(resp, configs) => {
            let vaild = helpers.json.val(resp, 'valid', false);
            if(vaild){
                helpers.url.route.redirect('common.bv', {
                    params:{
                        action:'update',
                        id:helpers.json.val(resp, 'data.hashId', ''),
                        buId:helpers.json.val(_siteProps_, 'router.params.buId', '')
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