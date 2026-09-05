const infoById = require('./details_v1_byId_fetch');
const createInfo = require('./details_v1_info_create');
const updateInfo = require('./details_v1_byId_update');
const byTeamId = require('./details_v1_byTeamId_fetch');

exports.get = async (rval, appConfig, req) => {
    return req.helpers.json.merge(rval || {}, {
        "tbu/details/v1/byId/fetch":await infoById.get(appConfig, req),
        "tbu/details/v1/info/create":await createInfo.get(appConfig, req),
        "tbu/details/v1/byId/update":await updateInfo.get(appConfig, req),
        "tbu/details/v1/byTeamId/fetch":await byTeamId.get(appConfig, req)
    });
}