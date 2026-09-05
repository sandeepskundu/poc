const fecthRoot = require('./details_v1_root_fetch');
const createRoot = require('./details_v1_root_create');
const updateRoot = require('./details_v1_rootById_update');

const getByHashId = require('./details_v1_getByHashId_fetch');
const getChildsByParentId = require('./details_v1_getChildsByParentId_fetch');

const createChild = require('./details_v1_child_create');
const updateChild = require('./details_v1_child_update');

const createInfo = require('./details_v1_info_create');
const updateInfo = require('./details_v1_info_update');


exports.get = async (rval, appConfig, req) => {
    return req.helpers.json.merge(rval || {}, {
        "groupDepartments/details/v1/root/fetch":await fecthRoot.get(appConfig, req),
        "groupDepartments/details/v1/root/create":await createRoot.get(appConfig, req),
        "groupDepartments/details/v1/rootById/update":await updateRoot.get(appConfig, req),

        "groupDepartments/details/v1/getByHashId/fetch":await getByHashId.get(appConfig, req),
        "groupDepartments/details/v1/getChildsByParentId/fetch":await getChildsByParentId.get(appConfig, req),

        "groupDepartments/details/v1/child/create":await createChild.get(appConfig, req),
        "groupDepartments/details/v1/childById/update":await updateChild.get(appConfig, req),

        "groupDepartments/details/v1/info/update":await updateInfo.get(appConfig, req),
        "groupDepartments/details/v1/info/create":await createInfo.get(appConfig, req),
    });
}