
const v1_byId_fetch = require('./v1_byId_fetch');
const v1_config_create = require('./v1_config_create');
const v1_byMapId_fetch = require('./v1_byMapId_fetch');
const v1_updateById_update = require('./v1_updateById_update');

exports.get = async (rval, appConfig, req) => {
    return req.helpers.json.merge(rval || {}, {
        "devOps/cluster/v1/byId/fetch":await v1_byId_fetch.get(appConfig, req),
        "devOps/cluster/v1/byMapId/fetch":await v1_byMapId_fetch.get(appConfig, req),
        'devOps/cluster/v1/config/create':await v1_config_create.get(appConfig, req),
        'devOps/cluster/v1/updateById/update':await v1_updateById_update.get(appConfig, req),
    });
}