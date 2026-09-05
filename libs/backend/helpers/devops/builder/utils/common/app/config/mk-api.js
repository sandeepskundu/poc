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
            "public":7300,
            "partner": 7350,
            "internal": 7400,
            "scheduler": 7450
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
        "appId": "6825d643b319b887ba733dg4"
    },
    "category": "ui",
    "appName": "mk-ui"
}