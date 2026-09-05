const {appDetails} = require('./../../common-configs');  

const getSchema = async (parent, appConfig, req) => {
    const ui = req.helpers.json.val(appDetails, 'model.schema.api', {});
    const common = req.helpers.json.val(appDetails, 'model.schema.common', {});
    const overwrite = {
        "appName":false,
        "category":false,
        "appConfig.applicationType":false
    }
    return {...common, ...{...ui, ...overwrite}}
}

module.exports = async (parent, appConfig, req) => {
    return {
        schema:await getSchema(parent, appConfig, req),
        md5Hash:req.helpers.json.merge((appDetails?.model?.md5Hash || {}), {}),
        query:req.helpers.json.merge((appDetails?.model?.query?.getAppById || {}), {}),
        signature:req.helpers.json.merge((appDetails?.model?.signature?.create || {}), {}),
        valuemap:req.helpers.json.merge((appDetails?.model?.valuemap?.defaultValMap || {}), {}),
    }
}