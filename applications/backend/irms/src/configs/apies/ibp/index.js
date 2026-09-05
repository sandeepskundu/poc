const infoById = require('./details_v1_byId_fetch');
const infoByItemId = require('./details_v1_byItemId_fetch');
const createInfo = require('./details_v1_info_create');
const updateInfo = require('./details_v1_byId_update');

exports.get = async (rval, appConfig, req) => {
    return req.helpers.json.merge(rval || {}, {
        "ibp/details/v1/byId/fetch":await infoById.get(appConfig, req),
        "ibp/details/v1/info/create":await createInfo.get(appConfig, req),
        "ibp/details/v1/byId/update":await updateInfo.get(appConfig, req),
        "ibp/details/v1/byItemId/fetch":await infoByItemId.get(appConfig, req)
    });
}