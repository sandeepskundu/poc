const createInfo = require('./details_v1_info_create');
const updateInfo = require('./details_v1_infoById_update');
const getById = require('./details_v1_getById_fetch');
const getByMapId = require('./details_v1_getByMapId_fetch');
const getByMapIdAndType = require('./details_v1_getByMapIdAndType_fetch');
const getByGroupAndType = require('./details_v1_getByGroupAndType_fetch');

exports.get = async (rval, appConfig, req) => {
    return req.helpers.json.merge(rval || {}, {
        "accessRole/details/v1/getById/fetch":await getById.get(appConfig, req),
        "accessRole/details/v1/info/create":await createInfo.get(appConfig, req),
        "accessRole/details/v1/infoById/update":await updateInfo.get(appConfig, req),
        "accessRole/details/v1/getByMapId/fetch":await getByMapId.get(appConfig, req),
        "accessRole/details/v1/getByMapIdAndType/fetch":await getByMapIdAndType.get(appConfig, req),
        "accessRole/details/v1/getByGroupAndType/fetch":await getByGroupAndType.get(appConfig, req)
    });
}