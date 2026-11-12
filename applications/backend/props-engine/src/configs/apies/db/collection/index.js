const v1_getById_fetch = require('./v1_getById_fetch');
const v1_details_create = require('./v1_details_create');
const v1_getByDbId_fetch = require('./v1_getByDbId_fetch');
const v1_byMerchant_fetch = require('./v1_byMerchant_fetch');
const v1_byIdAndDbId_update = require('./v1_byIdAndDbId_update');

exports.get = async (rval, appConfig, req) => {
    return req.helpers.json.merge(rval || {}, {
        "db/collection/v1/getById/fetch":await v1_getById_fetch.get(appConfig, req),
        "db/collection/v1/details/create":await v1_details_create.get(appConfig, req),
        "db/collection/v1/getByDbId/fetch":await v1_getByDbId_fetch.get(appConfig, req),
        "db/collection/v1/byMerchant/fetch":await v1_byMerchant_fetch.get(appConfig, req),
        "db/collection/v1/byIdAndDbId/update":await v1_byIdAndDbId_update.get(appConfig, req)
    });
}