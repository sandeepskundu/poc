const helpers = require('ui-helpers');

const map = {
    collectionById:require('./collection-by-id'),
    rootMasterData:require('./root-master-data'),
    appDetailsById:require('./app-details-by-id'),
    controllerByAppId:require('./controller-by-app-id'),
    appListByCategory:require('./app-list-by-category'),
    masterDataHashId:require('./master-data-by-hash-id'),
    getMethodByHashId:require('./get-method-by-hash-id'),
    collectionListByDbId:require('./collection-list-by-db-id'),
    databaseListByMarchent:require('./database-list-by-marchent'),
    masterDataByParentHashId:require('./master-data-by-parent-hash-id'),
    conrtollerChildByParentId:require('./conrtoller-child-by-parent-id'),
    controllerDetailsByhHashId:require('./controller-details-by-hash-id'),

    rootCmsData:require('./root-cms-data'),
    cmsDataHashId:require('./cms-data-by-hash-id'),
    cmsDataByParentHashId:require('./cms-data-by-parent-hash-id'),

    
    rootTemplateData:require('./root-template-data'),
    templateDataByHashId:require('./template-data-by-hash-id'),
    templateDataByParentHashId:require('./template-data-by-parent-hash-id'),

    rootComponentsData:require('./root-components-data'),
    componentDataByParentHashId:require('./component-data-by-parent-hash-id'),
    componentDataByHashId:require('./component-data-by-hash-id')
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