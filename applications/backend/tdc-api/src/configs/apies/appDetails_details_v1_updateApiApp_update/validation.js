const {appDetails} = require('./../../common-configs');

const optional = () => {
    return {
        "value":"optional",
        "uivalue":"optional",
        "bothAreSame":true
    }
}

const bodyValidation = () => {
    return {
        "appConfig.dbConfigs.defaultCollections":{
            "checks":{
                "required":optional()
            }
        },
        "appConfig.dbConfigs.defaultCollections.merchant":{
            "checks":{
                "required":optional()
            }
        },
        "appConfig.dbConfigs.defaultCollections.apiSchema":{
            "checks":{
                "required":optional()
            }
        },
        "appConfig.dbConfigs.defaultCollections.appDetails":{
            "checks":{
                "required":optional()
            }
        },
        "appConfig.dbConfigs.defaultCollections.collections":{
            "checks":{
                "required":optional()
            }
        },
        "appConfig.dbConfigs.defaultCollections.internalMasterData":{
            "checks":{
                "required":optional()
            }
        }
    }
}

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

const commonValidation = async (parent, appConfig, req) => {
    const common = req.helpers.json.val(appDetails, 'validation.appCommon', {});
    const updateCommon = req.helpers.json.val(appDetails, 'validation.updateAppCommon', {});

    return req.helpers.json.merge(common, updateCommon);
}

const body = async (parent, appConfig, req) => {
    const common = await commonValidation(parent, appConfig, req);
    const apiAppBody = req.helpers.json.merge(req.helpers.json.val(appDetails, 'validation.apiAppBody', {}), {...{
        "category":categoryChecks(),
        "appConfig.applicationType":categoryChecks()
    }, ...bodyValidation()});

    return req.helpers.json.merge(common, apiAppBody);
}

const request = async (parent, appConfig, req) => {
    return {
        body:req.helpers.json.val(appDetails, 'request.body', {}),
        methods:{
            put:req.helpers.json.val(appDetails, 'request.methods.put', {})
        }
    }
}

module.exports = async (parent, appConfig, req) => {
    return {
        validation:{
            body:await body(parent, appConfig, req),
            params:{
                id:req.helpers.json.val(appDetails, 'validation.params.id', {})
            },
        },
        request:await request(parent, appConfig, req)
    }
}