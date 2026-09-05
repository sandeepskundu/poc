const {appDetails} = require('./../../common-configs');

const categoryChecks = () => {
    return {
        "checks":{
            "enums":{
                "value":{
                    "ui":false
                },
                "uivalue":{
                    "ui":false
                }
            }
        }
    }
}

const body = async (parent, appConfig, req) => {
    const common = req.helpers.json.val(appDetails, 'validation.appCommon', {});
    const uiAppBody = req.helpers.json.merge(req.helpers.json.val(appDetails, 'validation.apiAppBody', {}), {
        "category":categoryChecks(),
        "appConfig.applicationType":categoryChecks()
    });

    return req.helpers.json.merge(common, uiAppBody);
}

const request = async (parent, appConfig, req) => {
    return {
        body:req.helpers.json.val(appDetails, 'request.body', {}),
        methods:{
            post:req.helpers.json.val(appDetails, 'request.methods.post', {})
        }
    }
}

module.exports = async (parent, appConfig, req) => {
    return {
        validation:{
            body:await body(parent, appConfig, req),
        },
        request:await request(parent, appConfig, req),
    }
}