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
            "public": 2200,
            "partner": 2250,
            "internal": 2300,
            "scheduler": 2350
        },
        "applicationType": "ui",
        "category": "ui",
        "appName": "insider-cdn",
        "appWebCacheTime": "5d"
    },
    "appInfo": {
        "author": "sandeep-kundu-kinala",
        "version": "0.0.1",
        "description": "Insider CDN application",
        "appId": "6825d643b319b887ba733ff4"
    },
    "category": "ui",
    "appName": "insider-cdn"
}