//const treeDetails = require('./tree_v1_details_fetch');
const v1_details_create = require('./v1_details_create');

exports.get = async (rval, appConfig, req) => {
    return req.helpers.json.merge(rval || {}, {
        //"db/catalog/v1/details/fetch":await treeDetails.get(appConfig, req),
        "db/catalog/v1/details/create":await v1_details_create.get(appConfig, req)
    });
}