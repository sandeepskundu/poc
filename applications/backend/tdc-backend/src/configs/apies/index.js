module.exports = {
    'masterData/details/v1/root/fetch':require('./masterData_details_v1_root_fetch'),
    'masterData/details/v1/root/create':require('./masterData_details_v1_root_create'),
    'masterData/details/v1/rootById/update':require('./masterData_details_v1_rootById_update'),
    'masterData/details/v1/info/create':require('./masterData_details_v1_info_create'),
    'masterData/details/v1/info/update':require('./masterData_details_v1_info_update'),
    'masterData/details/v1/child/create':require('./masterData_details_v1_child_create'),
    'masterData/details/v1/child/update':require('./masterData_details_v1_child_update'),
    'masterData/details/v1/getByHashId/fetch':require('./masterData_details_v1_getByHashId_fetch'),
    'masterData/details/v1/getByParentId/fetch':require('./masterData_details_v1_getByParentId_fetch'),
    'apiSchema/details/v1/method/fetch':require('./schema_details_v1_method_fetch'),
    'apiSchema/details/v1/method/create':require('./schema_details_v1_method_create'),
    'apiSchema/details/v1/method/update':require('./schema_details_v1_method_update'),
    'apiSchema/details/v1/controller/create':require('./schema_details_v1_controller_create'),
    'apiSchema/details/v1/controller/update':require('./schema_details_v1_controller_update'),
    'apiSchema/childDetails/v1/controller/update':require('./schema_childDetails_v1_controller_update'),
    'apiSchema/childDetails/v1/controller/create':require('./schema_childDetails_v1_controller_create'),
    'apiSchema/details/v1/controllersByAppId/fetch':require('./schema_details_v1_controllersByAppId_fetch'),
    'apiSchema/details/v1/getChildsByParentId/fetch':require('./schema_details_v1_getChildsByParentId_fetch'),
    'apiSchema/details/v1/getChildDetailsByHashId/fetch':require('./schema_details_v1_getChildDetailsByHashId_fetch'),

    'masterData/details/v1/images/create':require('./masterData_details_v1_images_create')
};