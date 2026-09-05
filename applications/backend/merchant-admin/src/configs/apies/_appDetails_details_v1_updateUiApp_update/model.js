module.exports = {
    "md5Hash":{
        "hashId":{
            "nodes":{
                "0":{
                    "map": "id",
                    "from": "merchant"
                },
                "1":{
                    "map":"appConfig.applicationType",
                    "from":"body-item"
                },
                "2":{
                    "map":"appName",
                    "from":"body-item"
                },
            }
        },
        "portHashId":{
            "nodes":{
                "0":{
                    "map": "id",
                    "from": "merchant"
                },
                "1":{
                    "map":"appConfig.ports.public",
                    "from":"body-item"
                }
            }
        },
        "internalPortHashId":{
            "nodes":{
                "0":{
                    "map": "id",
                    "from": "merchant"
                },
                "1":{
                    "map":"appConfig.ports.internal",
                    "from":"body-item"
                }
            }
        },
        "partnerPortHashId":{
            "nodes":{
                "0":{
                    "map": "id",
                    "from": "merchant"
                },
                "1":{
                    "map":"appConfig.ports.partner",
                    "from":"body-item"
                }
            }
        },
        "schedulerPortHashId":{
            "nodes":{
                "0":{
                    "map": "id",
                    "from": "merchant"
                },
                "1":{
                    "map":"appConfig.ports.scheduler",
                    "from":"body-item"
                }
            }
        }
    },

    "valuemap": {
        "appConfig.appName":{
            "valuemap": {
                "map": "appName",
                "from": "body-item"
            }
        },
        "appConfig.category":{
            "valuemap": {
                "map": "category",
                "from": "body-item"
            }
        }
    },

    "query":{
        "hidden":{
            "merchantId":true
        },
        "runtime":{
            "enable":true,
            "configs":{
                "query":{
                    "0":{
                        "cloumn":"_id",
                        "value":{
                            "map":"id",
                            "from":"params",
                        },
                        "operation":{
                            "eq":{
                                "enable":true,
                                "opType":"eq"
                            }
                        }
                    }
                }
            }
        }
    },

    "signature":{
        "creation":{
            "enable":true,
            "nodes":{
                "_id":{
                    "enable":true,
                    "valueType":"objectId"
                },
                "_userId":{
                    "enable":false,
                    "valueType":"objectId"
                },
                "_mapId":{
                    "enable":false,
                    "valueType":"objectId"
                },
                "_merchantId":{
                    "enable":true,
                    "valueType":"objectId"
                }
            }
        }
    },

    "schema":{
        "htmlPlaceholders": true,
        "webpackConfigs.libsDirsMapConfig": true,
        "category": true,
        "appName": true,
        "scssConfig.hasTheme": true,
        "scssConfig.hasDesignSystem": true,
        "scssConfig.scssDir": true,
        "scssConfig.fontsDir": true,
        "scssConfig.imagesDir": true,
        "scssConfig.themesDir": true,
        "scssConfig.staticsDir": true,
        "scssConfig.themeColorDir": true,
        "scssConfig.designSystemDir": true,
        "scssConfig.additionalData": true,
        "scssConfig.additionalDataMap": true,
        "appConfig.alias": true,
        "appConfig.entries": true,
        "appConfig.srcDir": true,
        "appConfig.buildDir": true,
        "appConfig.fontsDir": true,
        "appConfig.imagesDir": true,
        "appConfig.scriptDir": true,
        "appConfig.iconFontsDir": true,
        "appConfig.applicationType": true,
        "appConfig.staticsDir": true,
        "appConfig.appScriptsDir": true,
        "appConfig.compress": true,
        "appConfig.appWebCacheVersion": true,
        "appConfig.appWebCacheTime": true,
        "appConfig.cdnPath": true,
        "appConfig.cssCdnPath": true,
        "appConfig.apiBasePath": true,
        "appConfig.fontsCdnPath": true,
        "appConfig.imagesCdnPath": true,
        "appConfig.assetsCdnPath": true,
        "appConfig.buildBundles.compressed": true,
        "appConfig.buildBundles.uncompressed": true,
        "appConfig.languages": true,
        "appConfig.defaultCategory": true,
        "appConfig.chunksDomainPlaceholder": true,
        "appConfig.appEnv": true,
        "appConfig.gtmId": true,
        "appConfig.category": true,
        "appConfig.appName": true,
        "appConfig.dbConfigs.defaultCollections.merchant": true,
        "appConfig.dbConfigs.defaultCollections.apiSchema": true,
        "appConfig.dbConfigs.defaultCollections.collections": true,
        "appConfig.dbConfigs.defaultCollections.appDetails": true,
        "packageJson.scripts": true,
        "packageJson.dependencies": true,
        "packageJson.devDependencies": true,
        "packageJson.license": true,
        "appInfo.author": true,
        "appInfo.version": true,
        "appInfo.description": true,
        "appInfo.appId": true,
        "hooksKeyNames._____AIO__GLOBAL__HEAD__CSS__HOOK_____": true,
        "hooksKeyNames._____AIO__APP__HEAD__CSS__HOOK_____": true,
        "hooksKeyNames._____AIO__GLOBAL__PAGE__HEADER__HOOK_____": true,
        "hooksKeyNames._____AIO__GLOBAL__APP__HEADER__HOOK_____": true,
        "hooksKeyNames._____AIO__GLOBAL__BODY__HOOK_____": true,
        "hooksKeyNames._____AIO__APP__BODY__HOOK_____": true,
        "hooksKeyNames._____AIO__GLOBAL__APP__FOOTER__HOOK_____": true,
        "hooksKeyNames._____AIO__GLOBAL__PAGE__FOOTER__HOOK_____": true,
        "hooksKeyNames._____AIO__GLOBAL__FOOTER__SCRIPT__HOOK_____": true,
        "hooksKeyNames._____AIO__APP__FOOTER__SCRIPT__HOOK_____": true,
        "hooks.appCreateTimeHooks._____APP__CREATE__TIME__HOOKS_____AIO__GLOBAL__HEAD__CSS__HOOK_____": true,
        "hooks.appCreateTimeHooks._____APP__CREATE__TIME__HOOKS_____AIO__APP__HEAD__CSS__HOOK_____": true,
        "hooks.appCreateTimeHooks._____APP__CREATE__TIME__HOOKS_____AIO__GLOBAL__PAGE__HEADER__HOOK_____": true,
        "hooks.appCreateTimeHooks._____APP__CREATE__TIME__HOOKS_____AIO__GLOBAL__APP__HEADER__HOOK_____": true,
        "hooks.appCreateTimeHooks._____APP__CREATE__TIME__HOOKS_____AIO__GLOBAL__BODY__HOOK_____": true,
        "hooks.appCreateTimeHooks._____APP__CREATE__TIME__HOOKS_____AIO__APP__BODY__HOOK_____": true,
        "hooks.appCreateTimeHooks._____APP__CREATE__TIME__HOOKS_____AIO__GLOBAL__APP__FOOTER__HOOK_____": true,
        "hooks.appCreateTimeHooks._____APP__CREATE__TIME__HOOKS_____AIO__GLOBAL__PAGE__FOOTER__HOOK_____": true,
        "hooks.appCreateTimeHooks._____APP__CREATE__TIME__HOOKS_____AIO__GLOBAL__FOOTER__SCRIPT__HOOK_____": true,
        "hooks.appCreateTimeHooks._____APP__CREATE__TIME__HOOKS_____AIO__APP__FOOTER__SCRIPT__HOOK_____": true,
        "hooks.webpackCompileTimeHooks._____WEBPACK__COMPILE__TIME__HOOKS_____AIO__GLOBAL__HEAD__CSS__HOOK_____": true,
        "hooks.webpackCompileTimeHooks._____WEBPACK__COMPILE__TIME__HOOKS_____AIO__APP__HEAD__CSS__HOOK_____": true,
        "hooks.webpackCompileTimeHooks._____WEBPACK__COMPILE__TIME__HOOKS_____AIO__GLOBAL__PAGE__HEADER__HOOK_____": true,
        "hooks.webpackCompileTimeHooks._____WEBPACK__COMPILE__TIME__HOOKS_____AIO__GLOBAL__APP__HEADER__HOOK_____": true,
        "hooks.webpackCompileTimeHooks._____WEBPACK__COMPILE__TIME__HOOKS_____AIO__GLOBAL__BODY__HOOK_____": true,
        "hooks.webpackCompileTimeHooks._____WEBPACK__COMPILE__TIME__HOOKS_____AIO__APP__BODY__HOOK_____": true,
        "hooks.webpackCompileTimeHooks._____WEBPACK__COMPILE__TIME__HOOKS_____AIO__GLOBAL__APP__FOOTER__HOOK_____": true,
        "hooks.webpackCompileTimeHooks._____WEBPACK__COMPILE__TIME__HOOKS_____AIO__GLOBAL__PAGE__FOOTER__HOOK_____": true,
        "hooks.webpackCompileTimeHooks._____WEBPACK__COMPILE__TIME__HOOKS_____AIO__GLOBAL__FOOTER__SCRIPT__HOOK_____": true,
        "hooks.webpackCompileTimeHooks._____WEBPACK__COMPILE__TIME__HOOKS_____AIO__APP__FOOTER__SCRIPT__HOOK_____": true,
        "hooks.serverSideHooks._____SERVER__SIDE__HOOKS_____AIO__GLOBAL__HEAD__CSS__HOOK_____": true,
        "hooks.serverSideHooks._____SERVER__SIDE__HOOKS_____AIO__APP__HEAD__CSS__HOOK_____": true,
        "hooks.serverSideHooks._____SERVER__SIDE__HOOKS_____AIO__GLOBAL__PAGE__HEADER__HOOK_____": true,
        "hooks.serverSideHooks._____SERVER__SIDE__HOOKS_____AIO__GLOBAL__APP__HEADER__HOOK_____": true,
        "hooks.serverSideHooks._____SERVER__SIDE__HOOKS_____AIO__GLOBAL__BODY__HOOK_____": true,
        "hooks.serverSideHooks._____SERVER__SIDE__HOOKS_____AIO__APP__BODY__HOOK_____": true,
        "hooks.serverSideHooks._____SERVER__SIDE__HOOKS_____AIO__GLOBAL__APP__FOOTER__HOOK_____": true,
        "hooks.serverSideHooks._____SERVER__SIDE__HOOKS_____AIO__GLOBAL__PAGE__FOOTER__HOOK_____": true,
        "hooks.serverSideHooks._____SERVER__SIDE__HOOKS_____AIO__GLOBAL__FOOTER__SCRIPT__HOOK_____": true,
        "hooks.serverSideHooks._____SERVER__SIDE__HOOKS_____AIO__APP__FOOTER__SCRIPT__HOOK_____": true,
        "hashId": true,
        "portHashId": true,
        "partnerPortHashId":true,
        "internalPortHashId":true,
    }
}