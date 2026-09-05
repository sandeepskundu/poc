
const fetchDetailsByMapId = require('./details_v1_byMapId_fetch');
const createDetailsByMapId = require('./details_v1_byMapId_create');
const updateDetailsByMapId = require('./details_v1_byMapId_update');

exports.get = async (rval, appConfig, req) => {
    return req.helpers.json.merge(rval || {}, {
        "employmentInfo/details/v1/byMapId/fetch":await fetchDetailsByMapId.get(appConfig, req),
        "employmentInfo/details/v1/byMapId/create":await createDetailsByMapId.get(appConfig, req),
        "employmentInfo/details/v1/byMapId/update":await updateDetailsByMapId.get(appConfig, req)
    });
}