const createInfo = require('./details_v1_info_create');
const updateInfo = require('./details_v1_infoById_update');
const getRoleById = require('./details_v1_getRoleById_fetch');
const getRoleByDepartmentHash = require('./details_v1_getRoleByDepartmentHash_fetch');

exports.get = async (rval, appConfig, req) => {
    return req.helpers.json.merge(rval || {}, {
        "groupRoles/details/v1/info/create":await createInfo.get(appConfig, req),
        "groupRoles/details/v1/infoById/update":await updateInfo.get(appConfig, req),
        "groupRoles/details/v1/getRoleById/fetch":await getRoleById.get(appConfig, req),
        "groupRoles/details/v1/getRoleByDepartmentHash/fetch":await getRoleByDepartmentHash.get(appConfig, req)
    });
}