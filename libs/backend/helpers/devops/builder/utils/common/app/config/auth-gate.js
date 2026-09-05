module.exports = {
    "appConfig": {
        "appExposedIn": {
            "public": true,
            "partner": false,
            "internal": true,
            "scheduler": false
        },
        "instances": {
            "public": 1,
            "partner": 1,
            "internal": 1,
            "scheduler": 1
        },
        "ports": {
            "public":3800,
            "partner":3850,
            "internal":3900,
            "scheduler":3950
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
        "appName": "auth-gate"
    },
    "appInfo": {
        "author": "sandeep-kundu",
        "version": "0.0.1",
        "description": "TDC backend application",
        "appId": "68260b3522b1cf19a93b6246"
    },
    "category": "api",
    "appName": "auth-gate"
}