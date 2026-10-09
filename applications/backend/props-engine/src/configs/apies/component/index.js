const treeDetails = require('./tree_v1_details_fetch');

exports.get = async (rval, appConfig, req) => {
    return req.helpers.json.merge(rval || {}, {
        "component/tree/v1/details/fetch":await treeDetails.get(appConfig, req)
    });
}