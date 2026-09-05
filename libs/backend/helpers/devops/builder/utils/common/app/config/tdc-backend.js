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
            "public": 2800,
            "partner": 2850,
            "internal": 2900,
            "scheduler": 2950
        },
        "dbConfigs": {
            "defaultCollections": {
                "merchant": false,
                "apiSchema": true,
                "collections": false,
                "appDetails": false
            }
        },
        "applicationType": "api",
        "category": "api",
        "appName": "tdc-backend"
    },
    "appInfo": {
        "author": "sandeep-kundu",
        "version": "0.0.1",
        "description": "TDC backend application",
        "appId": "68260b3522b1cf19a93b6246"
    },
    "category": "api",
    "appName": "tdc-backend"
}