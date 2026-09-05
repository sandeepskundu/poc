
const createInfo = require('./details_v1_info_create');
const detailsById = require('./details_v1_byId_fetch');
const updateInfo = require('./details_v1_updateById_update');
const listByMerchant = require('./list_v1_byMerchant_fetch')

exports.get = async (rval, appConfig, req) => {
    return req.helpers.json.merge(rval || {}, {
        "employer/details/v1/info/create":await createInfo.get(appConfig, req),
        "employer/details/v1/updateById/update":await updateInfo.get(appConfig, req),
        "employer/list/v1/byMerchant/fetch":await listByMerchant.get(appConfig, req),
        "employer/details/v1/byId/fetch":await detailsById.get(appConfig, req)
    });
}