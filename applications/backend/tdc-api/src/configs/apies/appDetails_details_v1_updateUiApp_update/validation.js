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
        "appConfig.assetsCdnPath":{
            "checks":{
                "required":optional()
            }
        },
        "appConfig.imagesCdnPath":{
            "checks":{
                "required":optional()
            }
        },
        "appConfig.fontsCdnPath":{
            "checks":{
                "required":optional()
            }
        },
        "appConfig.apiBasePath":{
            "checks":{
                "required":optional()
            }
        },
        "appConfig.cssCdnPath":{
            "checks":{
                "required":optional()
            }
        },
        "appConfig.cdnPath":{
            "checks":{
                "required":optional()
            }
        },
        "appConfig.appWebCacheTime":{
            "checks":{
                "required":optional()
            }
        },
        "appConfig.appWebCacheVersion":{
            "checks":{
                "required":optional()
            }
        },
        "appConfig.applicationType":{
            "checks":{
                "required":optional()
            }
        },
        "appConfig.buildBundles.uncompressed":{
            "checks":{
                "required":optional()
            }
        },
        "appConfig.buildBundles.compressed":{
            "checks":{
                "required":optional()
            }
        },
        "appConfig.alias":{
            "checks":{
                "required":optional()
            }
        },
        "appConfig.entries":{
            "checks":{
                "required":optional()
            }
        },
        "appConfig.ports.public":{
            "checks":{
                "required":optional()
            }
        },
        "scssConfig.additionalData":{
            "checks":{
                "required":optional()
            }
        },
        "scssConfig.additionalDataMap":{
            "checks":{
                "required":optional()
            }
        },
        "scssConfig.hasTheme":{
            "checks":{
                "required":optional()
            }
        },
        "scssConfig.hasDesignSystem":{
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
                    "api":false
                },
                "uivalue":{
                    "api":false
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
    const uiAppBody = req.helpers.json.merge(req.helpers.json.val(appDetails, 'validation.uiAppBody', {}), {...{
        "category":categoryChecks(),
        "appConfig.applicationType":categoryChecks()
    }, ...bodyValidation()});

    return req.helpers.json.merge(common, uiAppBody);
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