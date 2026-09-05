const helpers = require('ui-helpers');

const map = {
    appListByCategory:require('./app-list-by-category'),
    internalDataRootList:require('./internal-data-root-list'),
    internalDataChildsList:require('./internal-data-childs-list'),
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