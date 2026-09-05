const configMap = () => {
    return {
        "message":{
            "error":{
                "checks":{
                    "boolean":"Theme flag can have only boolean values.",
                    "required":"Theme is required."
                }
            }
        },
        "checks":{
            "boolean":{
                "value":'required',
                "uivalue":'required',
                "bothAreSame":true
            },
            "required":{
                "value":"optional",
                "uivalue":"optional",
                "bothAreSame":true
            }
        }
    }
}

const objectConf = () => {
    return {
        "message":{
            "error":{
                "checks":{
                    "object":"Additional data can have only object values",
                    "required":"Default collections object is required filed"
                }
            }
        },
        "checks":{
            "object":{
                "value":'required',
                "uivalue":'required',
                "bothAreSame":true
            },
            "required":{
                "value":"optional",
                "uivalue":"optional",
                "bothAreSame":true
            }
        }
    }
}

const dbId = () => {
    return {
        "message":{
            "error":{
                "checks":{
                    "required":"Assets cdn path is optional"
                }
            }
        },
        "checks":{
            "minLength":{
                "value":24,
                "uivalue":24,
                "bothAreSame":true
            },
            "maxLength":{
                "value":24,
                "uivalue":24,
                "bothAreSame":true
            },
            "required":{
                "value":"optional",
                "uivalue":"optional",
                "bothAreSame":true
            }
        }
    }
}

module.exports = {
    "appConfig.dbConfigs.dbId":dbId(),
    "appConfig.dbConfigs.defaultCollections":objectConf(),
    "appConfig.dbConfigs.defaultCollections.merchant":configMap(),
    "appConfig.dbConfigs.defaultCollections.apiSchema":configMap(),
    "appConfig.dbConfigs.defaultCollections.appDetails":configMap(),
    "appConfig.dbConfigs.defaultCollections.collections":configMap(),
    "appConfig.dbConfigs.defaultCollections.internalMasterData":configMap(),
}