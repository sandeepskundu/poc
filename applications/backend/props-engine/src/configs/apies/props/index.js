const detailsByMap = require('./details_v1_byMap_fetch');
const configsByMap = require('./configs_v1_byMap_fetch');

exports.get = async (rval, appConfig, req) => {
    return req.helpers.json.merge(rval || {}, {
        "props/details/v1/byMap/fetch":await detailsByMap.get(appConfig, req),
        "props/configs/v1/byMap/fetch":await configsByMap.get(appConfig, req)
    });
}