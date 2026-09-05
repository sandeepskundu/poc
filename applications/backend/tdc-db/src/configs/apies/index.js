module.exports = {
    'dbData/details/v1/new/create':require('./dbData_details_v1_new_create'),
    'dbData/details/v1/list/fetch':require('./dbData_details_v1_list_fetch'),
    'collections/schema/v1/details/create':require('./collections_schema_v1_details_create'),
    'collections/schema/v1/details/update':require('./collections_schema_v1_details_update'),
    'collections/schema/v1/getDetailsById/fetch':require('./collections_schema_v1_getDetailsById_fetch'),
    'collections/schema/v1/getDetailsByDbId/fetch':require('./collections_schema_v1_getDetailsByDbId_fetch'),
    'collections/schema/v1/getDetailsByAppId/fetch':require('./collections_schema_v1_getDetailsByAppId_fetch')
};