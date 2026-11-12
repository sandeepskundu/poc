const v1_getById_fetch = require('./v1_getById_fetch');
const v1_details_create = require('./v1_details_create');
const v1_byMerchant_fetch = require('./v1_byMerchant_fetch');
const v1_getByMapId_fetch = require('./v1_getByMapId_fetch');
const v1_byIdAndMapId_update = require('./v1_byIdAndMapId_update');

exports.get = async (rval, appConfig, req) => {
    return req.helpers.json.merge(rval || {}, {
        "db/catalog/v1/getById/fetch":await v1_getById_fetch.get(appConfig, req),
        "db/catalog/v1/details/create":await v1_details_create.get(appConfig, req),
        "db/catalog/v1/getByMapId/fetch":await v1_getByMapId_fetch.get(appConfig, req),
        "db/catalog/v1/byMerchant/fetch":await v1_byMerchant_fetch.get(appConfig, req),
        "db/catalog/v1/byIdAndMapId/update":await v1_byIdAndMapId_update.get(appConfig, req)
    });
}