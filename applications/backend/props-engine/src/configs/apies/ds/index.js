const enumsList = require('./enums_v1_list_fetch');
const colorsList = require('./colors_v1_list_fetch');

exports.get = async (rval, appConfig, req) => {
    return req.helpers.json.merge(rval || {}, {
        "ds/enums/v1/list/fetch":await enumsList.get(appConfig, req),
        "ds/colors/v1/list/fetch":await colorsList.get(appConfig, req)
    });
}