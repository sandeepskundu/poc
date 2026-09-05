import helpers from 'ui-helpers';

const init = (callback, data) => {
    if(callback){
        helpers.request.ui.init({
            request:{
                data:data,
                method:'post',
                url:`/api/tdc-db/collections/schema/v1/details/create`,
                
            },
            onResponse:(resp, arg) => {
                const valid = helpers.json.val(resp, 'valid', false);

                if(valid){
                    let data = helpers.json.val(resp, 'data', {});
                        helpers.url.route.redirect('tdc-db.collectionDetails', {
                            params:{
                                action:'update',
                                id:helpers.json.val(data, 'vd.id', 'x'),
                                dbId:helpers.json.val(data, 'dbId', 'x')
                            }
                        });
                }else{
                    alert('Oops somthing went wrong, pls try again.')
                };

                callback(resp)
            }
        })
    }
}

export default {
    init:init
}