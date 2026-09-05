const fecthRoot = require('./details_v1_root_fetch');
const createRoot = require('./details_v1_root_create');
const createInfo = require('./details_v1_info_create');
const updateInfo = require('./details_v1_info_update');
const createChild = require('./details_v1_child_create');
const updateChild = require('./details_v1_child_update');
const updateRoot = require('./details_v1_rootById_update');
const getByHashId = require('./details_v1_getByHashId_fetch');
const getRootByType = require('./details_v1_getRootByType_fetch');
const getChildsByParentId = require('./details_v1_getChildsByParentId_fetch');
const updateInfoLinkedByRoleAndDeprtment = require('./details_v1_infoLinkedByRoleOrDepartment_update');
const createInfoLinkedByRoleAndDeprtment = require('./details_v1_infoLinkedByRoleOrDepartment_create');

exports.get = async (rval, appConfig, req) => {
    return req.helpers.json.merge(rval || {}, {
        "apiAccessPresets/details/v1/info/update":await updateInfo.get(appConfig, req),
        "apiAccessPresets/details/v1/info/create":await createInfo.get(appConfig, req),
        "apiAccessPresets/details/v1/child/create":await createChild.get(appConfig, req),
        "apiAccessPresets/details/v1/child/update":await updateChild.get(appConfig, req),
        "apiAccessPresets/details/v1/root/fetch":await fecthRoot.get(appConfig, req),
        "apiAccessPresets/details/v1/root/create":await createRoot.get(appConfig, req),
        "apiAccessPresets/details/v1/rootById/update":await updateRoot.get(appConfig, req),
        "apiAccessPresets/details/v1/getByHashId/fetch":await getByHashId.get(appConfig, req),
        "apiAccessPresets/details/v1/getRootByType/fetch":await getRootByType.get(appConfig, req),
        "apiAccessPresets/details/v1/getChildsByParentId/fetch":await getChildsByParentId.get(appConfig, req),
        "apiAccessPresets/details/v1/infoLinkedByRoleOrDepartment/create":await createInfoLinkedByRoleAndDeprtment.get(appConfig, req),
        "apiAccessPresets/details/v1/infoLinkedByRoleOrDepartment/update":await updateInfoLinkedByRoleAndDeprtment.get(appConfig, req)
    });
}