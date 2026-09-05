const helpers = require('ui-helpers');

const map = {
    storybook:require('./storybook'),
}

const onRespCb = (resp, onResp, arg) => {
    if(onResp){
        onResp(resp);
    }
}

const get = (config, onResp) => {
    helpers.store.get(config, (resp) => {
        onRespCb(resp, onResp, config);
    }, map);
}
 
exports.get = get;