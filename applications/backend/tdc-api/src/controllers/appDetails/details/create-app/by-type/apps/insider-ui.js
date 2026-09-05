const details = {
    "data":{
        "category":"ui",
        "appName":"insider-ui",
        "htmlPlaceholders":{},
        "webpackConfigs":{
            "libsDirsMapConfig":{}
        },
        "appConfig":{
            "applicationType":"ui",
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
                "public":2000,
                "partner":2050,
                "internal":2100,
                "scheduler":2150
            }
        },
        "appInfo":{
            "version":"0.0.1",
            "author":"sandeep-kundu",
            "description":"Insider UI application"
        }
    }
}

exports.data = details;
exports.model = require('./ui-app-model');