const details = {
    "data":{
        "category":"ui",
        "appName":"insider-cdn",
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
                "public":2200,
                "partner":2250,
                "internal":2300,
                "scheduler":2350
            }
        },
        "appInfo":{
            "version":"0.0.1",
            "author":"sandeep-kundu",
            "description":"Insider CDN application"
        }
    }
}

exports.data = details;
exports.model = require('./ui-app-model');