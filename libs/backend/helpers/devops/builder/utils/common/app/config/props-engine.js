module.exports = {
    "appConfig": {
        "appExposedIn": {
            "public": true,
            "partner": false,
            "internal": false,
            "scheduler": false
        },
        "instances": {
            "public":1,
            "partner":1,
            "internal":1,
            "scheduler":1
        },
        "ports": {
            "public":5000,
            "partner":5050,
            "internal":5100,
            "scheduler":5150
        },
        "dbConfigs": {
            "defaultCollections": {}
        },
        "applicationType": "api",
        "category": "api",
        "appName": "props-engine"
    },
    "appInfo": {
        "author": "sandeep-kundu",
        "version": "0.0.1",
        "description": "propsEngine backend application",
        "appId": "68260b3522b1cf19a93d87809"
    },
    "category": "api",
    "appName": "props-engine"
}