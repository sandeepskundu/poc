const getProfileDetails = require('./profile_v1_details_fetch');
const profileallByMerchant = require('./profile_v1_allByMerchant_fetch');
const fetchPersonalDetailByMapId = require('./personal_v1_detailsByMapId_fetch');
const createPersonalDetailByMapId = require('./personal_v1_detailsByMapId_create');
const updatePersonalDetailByMapId = require('./personal_v1_detailsByMapId_update');
const fetchAllProfileDetailByMapId = require('./profile_v1_allDetailsByMapId_fetch');

exports.get = async (rval, appConfig, req) => {
    return req.helpers.json.merge(rval || {}, {
        "empInfo/profile/v1/details/fetch":await getProfileDetails.get(appConfig, req),
        "empInfo/profile/v1/allByMerchant/fetch":await profileallByMerchant.get(appConfig, req),
        "empInfo/personal/v1/detailsByMapId/fetch":await fetchPersonalDetailByMapId.get(appConfig, req),
        "empInfo/personal/v1/detailsByMapId/create":await createPersonalDetailByMapId.get(appConfig, req),
        "empInfo/personal/v1/detailsByMapId/update":await updatePersonalDetailByMapId.get(appConfig, req),
        "empInfo/profile/v1/allDetailsByMapId/fetch":await fetchAllProfileDetailByMapId.get(appConfig, req)
    });
}