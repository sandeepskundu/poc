import helpers from 'ui-helpers';

const init = (callback) => {
    if(callback){
        helpers.request.ui.init({
            request:{
                method:'get',
                url:`/api/tdc-design-system/theme/colors/v1/root/fetch`,
                
            },
            onResponse:(resp, arg) => {
                let res = helpers.json.val(resp, 'data', {});
                let colors = helpers.json.val(res, 'colors', {});
                let definition = helpers.json.val(res, 'definition', {})
                    res.combined = helpers.json.merge(definition, colors);
                    res.theme = {
                        //original:colors,
                        //modified:colors
                    };

                    callback({
                        rootTheme:res, 
                        theme:{
                            //original:colors,
                            //modified:colors
                        }
                    });
            }
        })
    }
}

export default {
    init:init
}