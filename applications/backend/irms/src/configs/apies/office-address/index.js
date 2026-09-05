
const createInfo = require('./details_v1_info_create');
const detailsById = require('./details_v1_byId_fetch');
const updateInfo = require('./details_v1_updateById_update');
const listByEmployer = require('./list_v1_byEmployer_fetch');

exports.get = async (rval, appConfig, req) => {
    return req.helpers.json.merge(rval || {}, {
        "officeAdd/details/v1/info/create":await createInfo.get(appConfig, req),
        "officeAdd/details/v1/byId/fetch":await detailsById.get(appConfig, req),
        "officeAdd/list/v1/byEmployer/fetch":await listByEmployer.get(appConfig, req),
        "officeAdd/details/v1/updateById/update":await updateInfo.get(appConfig, req),
    });
}