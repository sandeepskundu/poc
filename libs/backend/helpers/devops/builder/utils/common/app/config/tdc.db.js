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
            "public": 3000,
            "partner": 3050,
            "internal": 3100,
            "scheduler": 3150
        },
        "dbConfigs": {
            "defaultCollections": {
                "merchant": false,
                "apiSchema": false,
                "collections": true,
                "appDetails": false
            }
        },
        "applicationType": "api",
        "category": "api",
        "appName": "tdc-db"
    },
    "appInfo": {
        "author": "sandeep-kundu",
        "version": "0.0.1",
        "description": "TDC backend application",
        "appId": "68260b5822b1cf19a93b624e"
    },
    "category": "api",
    "appName": "tdc-db"
}