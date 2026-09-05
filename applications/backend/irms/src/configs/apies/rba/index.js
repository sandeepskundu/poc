const infoById = require('./details_v1_byId_fetch');
const createInfo = require('./details_v1_info_create');
const updateInfo = require('./details_v1_byId_update');
const infoByMapId = require('./details_v1_byMapId_fetch');
const byMapIdAndLinkFor = require('./details_v1_byMapIdAndLinkFor_fetch');

exports.get = async (rval, appConfig, req) => {
    return req.helpers.json.merge(rval || {}, {
        "rba/details/v1/byId/fetch":await infoById.get(appConfig, req),
        "rba/details/v1/byId/update":await updateInfo.get(appConfig, req),
        "rba/details/v1/info/create":await createInfo.get(appConfig, req),
        "rba/details/v1/byMapId/fetch":await infoByMapId.get(appConfig, req),
        "rba/details/v1/byMapIdAndLinkFor/fetch":await byMapIdAndLinkFor.get(appConfig, req)
    });
}