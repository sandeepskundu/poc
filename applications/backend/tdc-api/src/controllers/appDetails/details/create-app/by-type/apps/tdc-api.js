const details = {
    "data":{
        "category":"api",
        "appName":"tdc-api",
        "appConfig":{
            "applicationType":"api",
            "dbConfigs":{
                "defaultCollections":{
                    "merchant":false,
                    "apiSchema":false,
                    "appDetails":true,
                    "collections":false,
                    "internalMasterData":false
                }
            },
            "appExposedIn":{
                "public":true,
                "partner":false,
                "internal":false,
                "scheduler":false
            },
            "instances":{
                "public":1,
                "partner":1,
                "internal":1,
                "scheduler":1
            },
            "ports":{
                "public":2400,
                "partner":2450,
                "internal":2500,
                "scheduler":2550
            }
        },
        "appInfo":{
            "version":"0.0.1",
            "author":"sandeep-kundu",
            "description":"TDC API is a master api application which handle and provide information releated to Devops releated api"
        }
    }
}

exports.data = details;
exports.model = require('./api-app-model');