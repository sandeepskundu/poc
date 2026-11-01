const scriptRunCreate = require('./script_v1_run_create');

exports.get = async (rval, appConfig, req) => {
    return req.helpers.json.merge(rval || {}, {
        "devOps/script/v1/run/create":await scriptRunCreate.get(appConfig, req)
    });
}