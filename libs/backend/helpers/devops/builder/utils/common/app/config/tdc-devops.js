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
            "public": 2600,
            "partner": 2650,
            "internal": 2700,
            "scheduler": 2750
        },
        "dbConfigs": {
            "defaultCollections": {
                "merchant": false,
                "apiSchema": false,
                "collections": false,
                "appDetails": false
            }
        },
        "applicationType": "api",
        "category": "api",
        "appName": "tdc-devops"
    },
    "appInfo": {
        "author": "sandeep-kundu",
        "version": "0.0.1",
        "description": "TDC Devops application",
        "appId": "68260aef22b1cf19a93b623e"
    },
    "category": "api",
    "appName": "tdc-devops"
}