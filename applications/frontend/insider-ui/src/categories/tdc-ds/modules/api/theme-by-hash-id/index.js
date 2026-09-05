import helpers from 'ui-helpers';
import dataMaker from './data-maker';

const init = (callback) => {
    if(callback){
        helpers.request.ui.init({
            request:{
                method:'get',
                url:`/api/tdc-design-system/designSystem/theme/v1/getByHashId/fetch/:_hashId_:`,
                params:{
                    hashId:helpers.json.val(_siteProps_, 'router.params.themeId')
                }
            },
            onResponse:(resp, arg) => {
                let list = helpers.json.val(resp, 'data.result.0', {});
                let res = dataMaker.init(list);
                    callback(res);
            }
        })
    }
}

export default {
    init:init
}