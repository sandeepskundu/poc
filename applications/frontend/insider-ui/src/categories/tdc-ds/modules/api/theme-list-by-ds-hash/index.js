import helpers from 'ui-helpers';
import dataMaker from './data-maker';

const init = (callback) => {
    if(callback){
        helpers.request.ui.init({
            request:{
                method:'get',
                url:`/api/tdc-design-system/designSystem/theme/v1/getByDsHashId/fetch/:_dsHashId_:`,
                params:{
                    dsHashId:helpers.json.val(_siteProps_, 'router.params.dsId')
                }
            },
            onResponse:(resp, arg) => {
                let list = helpers.json.val(resp, 'data.result', []);
                let res = dataMaker.init(list);
                    callback(res);
            }
        })
    }
}

export default {
    init:init
}