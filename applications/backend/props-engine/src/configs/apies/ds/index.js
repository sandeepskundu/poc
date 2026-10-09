const enumsData = require('./enums_v1_data_fetch');
const colorsList = require('./colors_v1_list_fetch');
const predefinedData = require('./predefined_v1_data_fetch');

exports.get = async (rval, appConfig, req) => {
    return req.helpers.json.merge(rval || {}, {
        "ds/enums/v1/data/fetch":await enumsData.get(appConfig, req),
        "ds/colors/v1/list/fetch":await colorsList.get(appConfig, req),
        "ds/predefined/v1/data/fetch":await predefinedData.get(appConfig, req)
    });
}