const infoById = require('./details_v1_byId_fetch');
const createInfo = require('./details_v1_info_create');
const updateInfo = require('./details_v1_byId_update');
const byItemIdAndType = require('./details_v1_byItemIdAndType_fetch');

exports.get = async (rval, appConfig, req) => {
    return req.helpers.json.merge(rval || {}, {
        "tbi/details/v1/byId/fetch":await infoById.get(appConfig, req),
        "tbi/details/v1/info/create":await createInfo.get(appConfig, req),
        "tbi/details/v1/byId/update":await updateInfo.get(appConfig, req),
        "tbi/details/v1/byItemIdAndType/fetch":await byItemIdAndType.get(appConfig, req)
    });
}