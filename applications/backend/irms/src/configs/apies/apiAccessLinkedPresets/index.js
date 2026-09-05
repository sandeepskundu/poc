const createInfo = require('./preset_v1_details_create');
const updateInfo = require('./preset_v1_details_update');
const getByHashId = require('./preset_v1_getByHashId_fetch');
const getByPresetHash = require('./preset_v1_getByPresetHash_fetch');

exports.get = async (rval, appConfig, req) => {
    return req.helpers.json.merge(rval || {}, {
        "apiAccessLinkedPresets/preset/v1/details/update":await updateInfo.get(appConfig, req),
        "apiAccessLinkedPresets/preset/v1/details/create":await createInfo.get(appConfig, req),
        "apiAccessLinkedPresets/preset/v1/getByHashId/fetch":await getByHashId.get(appConfig, req),
        "apiAccessLinkedPresets/preset/v1/getByPresetHash/fetch":await getByPresetHash.get(appConfig, req)
    });
}