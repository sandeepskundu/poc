module.exports = {
    "valuemap": {
        "_merchantId": {
            "valuemap": {
                "map": "id",
                "from": "merchant"
            }
        },
        "appConfig.appName": {
            "valuemap": {
                "map": "appName",
                "from": "body-item"
            }
        },
        "appConfig.category": {
            "valuemap": {
                "map": "category",
                "from": "body-item"
            }
        }
    },
    "query": {
        "hidden": {
            "enable": true,
            "configs": {
                "columns": {
                    "merchantId": {
                        "enable": true
                    }
                }
            }
        }
    },
    "schema": {
        "category": true,
        "appName": true,
        "appConfig.srcDir": true,
        "appConfig.buildDir": true,
        "appConfig.applicationType": true,
        "appConfig.scriptDir": true,
        "appConfig.appScriptsDir": true,
        "appConfig.staticsDir": true,
        "appConfig.compress": true,
        "appConfig.languages": true,
        "appConfig.appEnv": true,
        "appConfig.category": true,
        "appConfig.appName": true,
        "appConfig.ports.public": true,
        "appConfig.ports.partner": true,
        "appConfig.ports.internal": true,
        "appConfig.ports.scheduler": true,
        "appConfig.instances.public": true,
        "appConfig.instances.partner": true,
        "appConfig.instances.internal": true,
        "appConfig.instances.scheduler": true,
        "appConfig.appExposedIn.public": true,
        "appConfig.appExposedIn.partner": true,
        "appConfig.appExposedIn.internal": true,
        "appConfig.appExposedIn.scheduler": true,
        "packageJson.scripts": true,
        "packageJson.dependencies": true,
        "packageJson.devDependencies": true,
        "packageJson.license": true,
        "appInfo.author": true,
        "appInfo.version": true,
        "appInfo.description": true,
        "appInfo.appId": true,
        "hashId": true,
        "portHashId": true,
        "partnerPortHashId": true,
        "internalPortHashId": true,
        "schedulerPortHashId": true,
        "htmlPlaceholders": true,
        "webpackConfigs.libsDirsMapConfig": true,
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
        "appConfig.fontsDir": true,
        "appConfig.imagesDir": true,
        "appConfig.iconFontsDir": true,
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
        "appConfig.defaultCategory": true,
        "appConfig.chunksDomainPlaceholder": true,
        "appConfig.gtmId": true,
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
        "hooks.serverSideHooks._____SERVER__SIDE__HOOKS_____AIO__APP__FOOTER__SCRIPT__HOOK_____": true
    },
    "md5Hash": {
        "hashId": {
            "nodes": {
                "0": {
                    "map": "id",
                    "from": "merchant"
                },
                "1": {
                    "map": "appConfig.applicationType",
                    "from": "body-item"
                },
                "2": {
                    "map": "appName",
                    "from": "body-item"
                }
            }
        },
        "portHashId": {
            "nodes": {
                "0": {
                    "map": "id",
                    "from": "merchant"
                },
                "1": {
                    "map": "appConfig.ports.public",
                    "from": "body-item"
                }
            }
        },
        "internalPortHashId": {
            "nodes": {
                "0": {
                    "map": "id",
                    "from": "merchant"
                },
                "1": {
                    "map": "appConfig.ports.internal",
                    "from": "body-item"
                }
            }
        },
        "partnerPortHashId": {
            "nodes": {
                "0": {
                    "map": "id",
                    "from": "merchant"
                },
                "1": {
                    "map": "appConfig.ports.partner",
                    "from": "body-item"
                }
            }
        },
        "schedulerPortHashId": {
            "nodes": {
                "0": {
                    "map": "id",
                    "from": "merchant"
                },
                "1": {
                    "map": "appConfig.ports.scheduler",
                    "from": "body-item"
                }
            }
        }
    }
}