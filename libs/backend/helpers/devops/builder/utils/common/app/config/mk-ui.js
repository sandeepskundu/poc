module.exports = {
    "scssConfig": {
        "hasTheme": true,
        "hasDesignSystem": true
    },
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
            "public":7100,
            "partner": 7150,
            "internal": 7200,
            "scheduler": 7250
        },
        "applicationType": "ui",
        "category": "ui",
        "appName": "mk-ui",
        "appWebCacheTime": "5d"
    },
    "appInfo": {
        "author": "sandeep-kundu-kinala",
        "version": "0.0.1",
        "description": "Insider CDN application",
        "appId": "6825d643b319b887ba733ad4"
    },
    "category": "ui",
    "appName": "mk-ui"
}