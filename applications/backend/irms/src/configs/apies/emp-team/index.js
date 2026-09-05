const createInfo = require('./details_v1_info_create');
const updateInfo = require('./details_v1_infoById_update');
const getByEmpId = require('./details_v1_getByEmpIdAndType_fetch');

exports.get = async (rval, appConfig, req) => {
    return req.helpers.json.merge(rval || {}, {
        "empTeam/details/v1/info/create":await createInfo.get(appConfig, req),
        "empTeam/details/v1/infoById/update":await updateInfo.get(appConfig, req),
        "empTeam/details/v1/getByEmpIdAndType/fetch":await getByEmpId.get(appConfig, req)
    });
}