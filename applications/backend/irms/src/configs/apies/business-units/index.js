
const createInfo = require('./details_v1_info_create');
const detailsById = require('./details_v1_byId_fetch');
const updateInfo = require('./details_v1_updateById_update');
const listByEmployerId = require('./list_v1_byEmployerId_fetch')

exports.get = async (rval, appConfig, req) => {
    return req.helpers.json.merge(rval || {}, {
        "businessUnit/details/v1/byId/fetch":await detailsById.get(appConfig, req),
        "businessUnit/details/v1/info/create":await createInfo.get(appConfig, req),
        "businessUnit/details/v1/updateById/update":await updateInfo.get(appConfig, req),
        "businessUnit/list/v1/listByEmployerId/fetch":await listByEmployerId.get(appConfig, req)
    });
}