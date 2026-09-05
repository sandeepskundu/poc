const {appDetails} = require('./../../common-configs');  

const getSchema = async (parent, appConfig, req) => {
    const ui = req.helpers.json.val(appDetails, 'model.schema.ui', {});
    const common = req.helpers.json.val(appDetails, 'model.schema.common', {});
    return {...common, ...ui}
}

module.exports = async (parent, appConfig, req) => {
    return {
        schema:await getSchema(parent, appConfig, req),
        md5Hash:req.helpers.json.merge((appDetails?.model?.md5Hash || {}), {}),
        valuemap:req.helpers.json.merge((appDetails?.model?.valuemap?.defaultValMap || {}), {}),
    }
}