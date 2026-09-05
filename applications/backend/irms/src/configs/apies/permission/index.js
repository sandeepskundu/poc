const createInfo = require('./details_v1_info_create');
const getPermsListByItemId = require('./details_v1_permsListByItemId_fetch')

exports.get = async (rval, appConfig, req) => {
    return req.helpers.json.merge(rval || {}, {
        "permission/details/v1/info/create":await createInfo.get(appConfig, req),
        "permission/details/v1/permsListByItemId/fetch":await getPermsListByItemId.get(appConfig, req)
    });
}