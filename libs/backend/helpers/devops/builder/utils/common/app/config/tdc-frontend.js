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
            "public": 3200,
            "partner": 3250,
            "internal": 3300,
            "scheduler": 3350
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
        "appName": "tdc-frontend"
    },
    "appInfo": {
        "author": "sandeep-kundu",
        "version": "0.0.1",
        "description": "TDC frontend application",
        "appId": "682c69f9258ddafd61c9a016"
    },
    "category": "api",
    "appName": "tdc-frontend"
}