import helpers from 'ui-helpers';

const config = (req, cb) => {
    return helpers.json.merge({
        options:{
            endpoint:'common.rbas.create',
        },
        onResponse:(resp, configs) => {
            let vaild = helpers.json.val(resp, 'valid', false);
            if(vaild){
                helpers.url.route.redirect('common.rba', {
                    params:{
                        action:'update',
                        id:helpers.json.val(resp, 'data.vd.id', ''),
                        mId:helpers.json.val(_siteProps_, 'router.params.mId', ''),
                        linkFor:helpers.json.val(_siteProps_, 'router.params.linkFor', ''),
                        linkType:helpers.json.val(_siteProps_, 'router.params.linkType', '')
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