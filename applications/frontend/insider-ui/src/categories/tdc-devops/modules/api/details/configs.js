const defaultConfigs = {
    common:{
        "appConfig":{
            "PORT":'',
            "APP_ENV":"",
            "INSPECT_AT":21,
            "NO_OF_INSTANCES":1,
            "applicationType": '',
        },
        "appName":""
    },
    ui:{
        appConfig:{
            entries:{},
            alias:{},
            appWebCacheTime:"5d",
        },
        scssConfig:{
            hasTheme:true,
            hasDesignSystem:true,
            additionalData:{
                "$sandeep":"kundu"
            },
            additionalDataMap:{
                $fontsCdnPath:"appConfig.fontsCdnPath",
                $pathPrefix:"appConfig.pathPrefix",
                $imagesCdnPath:"appConfig.imagesCdnPath",
                $assetsCdnPath:"appConfig.assetsCdnPath"
            }
        },
    },
    express:{
        "appConfig":{
            "dbConfigs":{
                "defaultCollections":{
                    "merchant":false,
                    "apiSchema":false,
                    "collections":false,
                    "appDetails":false
                }
            }
        },
    }
}

module.exports = defaultConfigs;