const helpers = require('ui-helpers');

const map = {
    devOps:require('./devOps'),
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



const stream = (config, onResp) => {
    debugger;
    return helpers.store.stream(config, (resp) => {
        onRespCb(resp, onResp, config);
    }, map);
}
 
exports.get = get;
exports.stream = stream;