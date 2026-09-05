module.exports = {
    "appConfig": {
        "appExposedIn": {
            "public": true,
            "partner": false,
            "internal": false,
            "scheduler": false
        },
        "instances": {
            "public": 1,
            "partner": 1,
            "internal": 1,
            "scheduler": 1
        },
        "ports": {
            "public":4000,
            "partner":4050,
            "internal":4100,
            "scheduler":4150
        },
        "dbConfigs": {
            "defaultCollections": {}
        },
        "applicationType": "api",
        "category": "api",
        "appName": "irms"
    },
    "appInfo": {
        "author": "sandeep-kundu",
        "version": "0.0.1",
        "description": "IRM backend application",
        "appId": "68260b3522b1cf19a93b9532"
    },
    "category": "api",
    "appName": "irms"
}