const createInfo = require('./details_v1_info_create');
const updateInfo = require('./details_v1_infoById_update');
const getRoleById = require('./details_v1_getRoleById_fetch');
const getRoleByDepartmentId = require('./details_v1_getRoleByDepartmentId_fetch');

exports.get = async (rval, appConfig, req) => {
    return req.helpers.json.merge(rval || {}, {
        "roles/details/v1/info/create":await createInfo.get(appConfig, req),
        "roles/details/v1/infoById/update":await updateInfo.get(appConfig, req),
        "roles/details/v1/getRoleById/fetch":await getRoleById.get(appConfig, req),
        "roles/details/v1/getRoleByDepartmentId/fetch":await getRoleByDepartmentId.get(appConfig, req)
    });
}