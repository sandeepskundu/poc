const helpers = require('ui-helpers');

const map = {
    access:require('./access'),
    employee:require('./employee'),
    orgStructure:require('./org-structure')
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