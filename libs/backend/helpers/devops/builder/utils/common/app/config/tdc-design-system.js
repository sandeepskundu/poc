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
            "public": 3400,
            "partner": 3450,
            "internal": 3500,
            "scheduler": 3550
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
        "appName": "tdc-design-system"
    },
    "appInfo": {
        "author": "sandeep-kundu",
        "version": "0.0.1",
        "description": "TDC frontend application",
        "appId": "682c6ab0258ddafd61c9a026"
    },
    "category": "api",
    "appName": "tdc-design-system"
}