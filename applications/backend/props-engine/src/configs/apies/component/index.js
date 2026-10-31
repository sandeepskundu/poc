const treeDetails = require('./tree_v1_details_fetch');
const configsDetails = require('./configs_v1_details_create');

exports.get = async (rval, appConfig, req) => {
    return req.helpers.json.merge(rval || {}, {
        "component/tree/v1/details/fetch":await treeDetails.get(appConfig, req),
        "component/configs/v1/details/create":await configsDetails.get(appConfig, req)
    });
}