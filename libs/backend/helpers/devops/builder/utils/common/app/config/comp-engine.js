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
            "public":5200,
            "partner":5250,
            "internal":5300,
            "scheduler":5350
        },
        "applicationType": "ui",
        "category": "ui",
        "appName": "comp-engine",
        "appWebCacheTime": "5d"
    },
    "appInfo": {
        "author": "sandeep-kundu-kinala",
        "version": "0.0.1",
        "description": "comp-engine frontend application",
        "appId": "6825d643b319b887ba733ad4"
    },
    "category": "ui",
    "appName": "comp-engine"
}