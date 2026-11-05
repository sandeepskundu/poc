const cluster = require('./cluster');
const runners = require('./runners');
const scriptRunCreate = require('./script_v1_run_create');

exports.get = async (rval, appConfig, req) => {
    rval = req.helpers.json.merge(rval || {}, {
        "devOps/script/v1/run/create":await scriptRunCreate.get(appConfig, req)
    });

    rval = await cluster.get(rval, appConfig, req);
    rval = await runners.get(rval, appConfig, req);

    return rval;
}