const createUi = require('./details_v1_ui_create');
const updateUi = require('./details_v1_ui_update');
const listByCate = require('./list_v1_byCate_fetch');
const createApi = require('./details_v1_api_create');
const updateApi = require('./details_v1_api_update');
const getById = require('./details_v1_getById_fetch');

exports.get = async (rval, appConfig, req) => {
    return req.helpers.json.merge(rval || {}, {
        'app/details/v1/ui/create':await createUi.get(req),
        'app/details/v1/ui/update':await updateUi.get(req),
        'app/list/v1/byCate/fetch':await listByCate.get(req),
        'app/details/v1/api/create':await createApi.get(req),
        'app/details/v1/api/update':await updateApi.get(req),
        'app/details/v1/getById/fetch':await getById.get(req)
    });
}