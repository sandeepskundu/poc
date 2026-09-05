const temp = {
    "htmlPlaceholders": {
        "__AIO__APP__CHUNKS__DOMAIN__PLACEHOLDER__": {
            "node": "appConfig.cdnPath",
            "fallback": "/"
        }
    },
    "appConfig": {
        "appWebCacheVersion": "0001", // tb add
        "appWebCacheTime": "5d",
        "cdnPath": "/",
        "cssCdnPath": "/",
        "apiBasePath": "/",
        "fontsCdnPath": "/",
        "imagesCdnPath": "/",
        "assetsCdnPath": "/",
        "languages": {
            "en": true
        },
        "copyStaticsDirInBuild": [
            "fonts",
            "images",
            "icons"
        ],
        "pathPrefix": "cdn",
        "paths": {
            "docs": "build/docs",
            "schema": "build/docs/schema"
        },
        "appElementId": "apId1RKAy1Dk",
        "appExposedIn":{
            "public":true,
            "partner":true,
            "internal":true,
        },
        "instances":{
            "public":10,
            "partner":10,
            "internal":10
        },
        "ports":{
            "public":2000,
            "partner":2100,
            "internal":2200
        }
    },
    "appInfo": {
        "id": "",
        "cate": "",
        "prefix": "",
        "disabled": "",
        "name": "Cdn Application",
        "appId": "6738829afbe779c7746626aa",
        "description": "This is sample description and will be replaced with original content"
    },
    "hooksKeyNames": {
        "_____AIO__GLOBAL__HEAD__CSS__HOOK_____": "",
        "_____AIO__APP__HEAD__CSS__HOOK_____": "",
        "_____AIO__GLOBAL__PAGE__HEADER__HOOK_____": "",
        "_____AIO__GLOBAL__APP__HEADER__HOOK_____": "",
        "_____AIO__GLOBAL__BODY__HOOK_____": "",
        "_____AIO__APP__BODY__HOOK_____": "",
        "_____AIO__GLOBAL__APP__FOOTER__HOOK_____": "",
        "_____AIO__GLOBAL__PAGE__FOOTER__HOOK_____": "",
        "_____AIO__GLOBAL__FOOTER__SCRIPT__HOOK_____": "",
        "_____AIO__APP__FOOTER__SCRIPT__HOOK_____": ""
    },
    "hooks": {
        "webpackCompileTimeHooks": {
            "_____WEBPACK__COMPILE__TIME__HOOKS_____AIO__GLOBAL__HEAD__CSS__HOOK_____": "",
            "_____WEBPACK__COMPILE__TIME__HOOKS_____AIO__APP__HEAD__CSS__HOOK_____": "",
            "_____WEBPACK__COMPILE__TIME__HOOKS_____AIO__GLOBAL__PAGE__HEADER__HOOK_____": "",
            "_____WEBPACK__COMPILE__TIME__HOOKS_____AIO__GLOBAL__APP__HEADER__HOOK_____": "",
            "_____WEBPACK__COMPILE__TIME__HOOKS_____AIO__GLOBAL__BODY__HOOK_____": "",
            "_____WEBPACK__COMPILE__TIME__HOOKS_____AIO__APP__BODY__HOOK_____": "",
            "_____WEBPACK__COMPILE__TIME__HOOKS_____AIO__GLOBAL__APP__FOOTER__HOOK_____": "",
            "_____WEBPACK__COMPILE__TIME__HOOKS_____AIO__GLOBAL__PAGE__FOOTER__HOOK_____": "",
            "_____WEBPACK__COMPILE__TIME__HOOKS_____AIO__GLOBAL__FOOTER__SCRIPT__HOOK_____": "",
            "_____WEBPACK__COMPILE__TIME__HOOKS_____AIO__APP__FOOTER__SCRIPT__HOOK_____": ""
        },
        "serverSideHooks": {
            "_____SERVER__SIDE__HOOKS_____AIO__GLOBAL__HEAD__CSS__HOOK_____": "",
            "_____SERVER__SIDE__HOOKS_____AIO__APP__HEAD__CSS__HOOK_____": "",
            "_____SERVER__SIDE__HOOKS_____AIO__GLOBAL__PAGE__HEADER__HOOK_____": "",
            "_____SERVER__SIDE__HOOKS_____AIO__GLOBAL__APP__HEADER__HOOK_____": "",
            "_____SERVER__SIDE__HOOKS_____AIO__GLOBAL__BODY__HOOK_____": "",
            "_____SERVER__SIDE__HOOKS_____AIO__APP__BODY__HOOK_____": "",
            "_____SERVER__SIDE__HOOKS_____AIO__GLOBAL__APP__FOOTER__HOOK_____": "",
            "_____SERVER__SIDE__HOOKS_____AIO__GLOBAL__PAGE__FOOTER__HOOK_____": "",
            "_____SERVER__SIDE__HOOKS_____AIO__GLOBAL__FOOTER__SCRIPT__HOOK_____": "",
            "_____SERVER__SIDE__HOOKS_____AIO__APP__FOOTER__SCRIPT__HOOK_____": ""
        }
    },
    "exposedSiteProps": {
        "appEnv": "appConfig.APP_ENV",
        "appType": "appConfig.applicationType",
        "fontsCdnPath": "appConfig.fontsCdnPath",
        "pathPrefix": "appConfig.pathPrefix",
        "imagesCdnPath": "appConfig.imagesCdnPath",
        "assetsCdnPath": "appConfig.assetsCdnPath",
        "apiBasePath": "appConfig.apiBasePath",
        "appWebCacheTime": "appConfig.appWebCacheTime",
        "appWebCacheVersion": "appConfig.appWebCacheVersion"
    },
    "runtimeEnvsBeCanUpdate": {
        "appConfig.cdnPath": true,
        "appConfig.cssCdnPath": true,
        "appConfig.apiBasePath": true,
        "appConfig.fontsCdnPath": true,
        "appConfig.imagesCdnPath": true,
        "appConfig.assetsCdnPath": true,
        "appConfig.appWebCacheTime": true,
        "appConfig.appWebCacheVersion": true,
        "appConfig.NO_OF_INSTANCES": true
    },
    "runtimeSitePropsCanBeUpdate": {
        "appConfig.cdnPath": true,
        "appConfig.cssCdnPath": true,
        "appConfig.apiBasePath": true,
        "appConfig.fontsCdnPath": true,
        "appConfig.imagesCdnPath": true,
        "appConfig.assetsCdnPath": true,
        "appConfig.appWebCacheTime": true,
        "appConfig.appWebCacheVersion": true,
        "appConfig.NO_OF_INSTANCES": true
    },
    "tokens": {
        "marchant": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb2RlIjoiQUlPQ0FSVCIsImlkIjoiNjcyY2FjNjQ0YTBkZGVkNzY1YjVjM2IyIiwiTUVSQ0hBTlRfQVVUSF9UT0tFTiI6IiIsIk1FUkNIQU5UX1NJR05BVFVSRV9UT0tFTiI6IjY3MmNhZDUwMDcwOGNmZDNjMzA3ZTg4ZiIsIk1FUkNIQU5UX0FQUF9FTlZJUk9OTUVOVCI6ImxvY2FsIiwiaWF0IjoxNzQxNjA5NjgyfQ.2-Rh_iAXyBHYmshDmE5Dh9g3OHrid70_w8YZ0Y3Y0fU"
    },
    "dirs": {
        "build": "/Users/30057943/Documents/LIB/Personal/poc/applications/frontend/cdn/build",
        "app": "/Users/30057943/Documents/LIB/Personal/poc/applications/frontend/cdn",
        "beLib": "/Users/30057943/Documents/LIB/Personal/poc/libs/backend",
        "uiLib": "/Users/30057943/Documents/LIB/Personal/poc/libs/frontend",
        "root": "/Users/30057943/Documents/LIB/Personal/poc",
        "configDir": "/Users/30057943/Documents/LIB/Personal/poc/applications/frontend/cdn/configs",
        "applications": "/Users/30057943/Documents/LIB/Personal/poc/applications",
        "category": "/Users/30057943/Documents/LIB/Personal/poc/applications/frontend",
        "scriptDir": "/Users/30057943/Documents/LIB/Personal/poc/applications/frontend/cdn/build/scripts",
        "srcDir": "/Users/30057943/Documents/LIB/Personal/poc/applications/frontend/cdn/src",
        "categoryDir": "/Users/30057943/Documents/LIB/Personal/poc/applications/frontend/cdn/src/categories",
        "storybookDir": "/Users/30057943/Documents/LIB/Personal/poc/applications/frontend/cdn/src/storybook",
        "routesDir": "/Users/30057943/Documents/LIB/Personal/poc/applications/frontend/cdn/src/routes",
        "scrapDir": "/Users/30057943/Documents/LIB/Personal/poc/applications/frontend/cdn/scrap",
        "staticsDir": "/Users/30057943/Documents/LIB/Personal/poc/applications/frontend/cdn/statics"
    }
}

const json = {
    "appId":"",
    "merchantId":"",
    "type":"FRONTEND|BACKEND",
    "name":"AIO Online travel agency",
    "description":"Detailed description about AIO online travel agency",
    "appConfigs":{
        "appConfig":{
            "entries":{},
            "alias":{},
            "compress":false,
            "NO_OF_INSTANCES":1,
            "PORT":1300,
            "APP_ENV":"local",
            "appWebCacheTime":"5d",
            "appExposedIn":{
                "public":true,
                "partner":true,
                "internal":true
            },
            "instances":{
                "public":10,
                "partner":10,
                "internal":10
            },
            "ports":{
                "public":2000,
                "partner":2100,
                "internal":2200
            }
        },
        "scssConfig":{
            "hasDesignSystem":false
        },
        "appName":"_cdn_"
    }
}

const appDetails = {
    "collection":{
        "name":"appDetails"
    },
    "schema":{
        "htmlPlaceholders": {
            "type": "object",
            "configs": {
                "aioconfig": {},
                "mongodb": {}
            },
            "schema": {
                "config": {
                    "description": ""
                }
            }
        },
        "webpackConfigs": {
            "type": "nested",
            "schema": {
                "libsDirsMapConfig": {
                    "type": "object",
                    "configs": {
                        "aioconfig": {},
                        "mongodb": {}
                    }
                }
            }
        },
        "category": {
            "type": "stringKey",
            "configs": {
                "aioconfig": {},
                "mongodb": {
                    "trim": true,
                    "lowercase": true,
                    "required": {
                        "value": true,
                        "enable": true,
                        "message": "This field is required"
                    }
                }
            }
        },
        "appName": {
            "type": "stringKey",
            "configs": {
                "aioconfig": {},
                "mongodb": {
                    "trim": true,
                    "lowercase": true,
                    "required": {
                        "value": true,
                        "enable": true,
                        "message": "This field is required"
                    },
                    "minLength": {
                        "value": "6",
                        "enable": true,
                        "message": "Min length is not valid"
                    },
                    "maxLength": {
                        "value": "20",
                        "enable": true,
                        "message": "Max length is not valid"
                    }
                }
            }
        },
        "scssConfig": {
            "type": "nested",
            "schema":{
                "hasTheme":{
                    "type":"boolean",
                    "configs": {
                        "aioconfig":{},
                        "mongodb":{
                            "default":{
                                "value": true
                            }
                        }
                    }
                },
                "hasDesignSystem": {
                    "type": "boolean",
                    "configs": {
                        "aioconfig": {},
                            "mongodb": {
                                "default": {
                                    "value": false
                                }
                            }
                    }
                },
                "scssDir": {
                    "type": "stringKey",
                    "configs":{
                        "aioconfig":{},
                        "mongodb": {
                            "trim": true,
                            "default": {
                                "value": "scss"
                            }
                        }
                    }
                },
                "fontsDir": {
                    "type": "stringKey",
                    "configs": {
                        "aioconfig": {},
                        "mongodb": {
                            "trim": true,
                            "default": {
                                "value": "fonts"
                            }
                        }
                    }
                },
                "imagesDir": {
                    "type": "stringKey",
                    "configs": {
                        "aioconfig": {},
                        "mongodb": {
                            "trim": true,
                            "default": {
                                "value": "images"
                            }
                        }
                    }
                },
                "themesDir": {
                    "type": "stringKey",
                    "configs": {
                        "aioconfig": {},
                        "mongodb": {
                            "trim": true,
                            "default": {
                                "value": "themes"
                            }
                        }
                    }
                },
                "staticsDir": {
                    "type": "stringKey",
                    "configs": {
                        "aioconfig": {},
                        "mongodb": {
                            "trim": true,
                            "default": {
                                "value": "statics"
                            }
                        }
                    }
                },
                "themeColorDir": {
                    "type": "stringKey",
                    "configs": {
                        "aioconfig": {},
                        "mongodb": {
                            "trim": true,
                            "default": {
                                "value": "theme-colors"
                            }
                        }
                    }
                },
                "designSystemDir": {
                    "type": "stringKey",
                    "configs": {
                        "aioconfig": {},
                        "mongodb": {
                            "trim": true,
                            "default": {
                                "value": "dsystem"
                            }
                        }
                    }
                },
                "additionalData": {
                    "type": "object",
                    "configs": {
                        "aioconfig": {},
                        "mongodb": {}
                    },
                    "schema": {
                        "$test": {
                            "type": "stringKey",
                            "configs": {
                                "aioconfig": {},
                                "mongodb": {
                                    "trim": true
                                }
                            }
                        }
                    }
                },
                "additionalDataMap": {
                    "type": "object",
                    "configs": {
                        "aioconfig": {},
                        "mongodb": {}
                    }
                }
            }
        },
        "appConfig": {
            "type": "nested",
            "schema": {
                "appExposedIn":{
                    "type": "nested",
                    "schema": {
                        "public":{
                            "type": "boolean",
                            "configs": {
                                "aioconfig": {},
                                "mongodb": {
                                    "default": {
                                        "value": false
                                    }
                                }
                            }
                        },
                        "partner":{
                            "type": "boolean",
                            "configs": {
                                "aioconfig": {},
                                "mongodb": {
                                    "default": {
                                        "value": false
                                    }
                                }
                            }
                        },
                        "internal":{
                            "type": "boolean",
                            "configs": {
                                "aioconfig": {},
                                "mongodb": {
                                    "default": {
                                        "value": false
                                    }
                                }
                            }
                        },
                        "scheduler":{
                            "type": "boolean",
                            "configs": {
                                "aioconfig": {},
                                "mongodb": {
                                    "default": {
                                        "value": false
                                    }
                                }
                            }
                        },
                    }
                },
                "instances":{
                    "type": "nested",
                    "schema": {
                        "public":{
                            "type": "number",
                            "configs": {
                                "aioconfig": {},
                                "mongodb": {
                                    "default": {
                                        "value":1
                                    },
                                    "required": {
                                        "value": true,
                                        "enable": true,
                                        "message": "This field is required"
                                    }
                                }
                            }
                        },
                        "partner":{
                            "type": "number",
                            "configs": {
                                "aioconfig": {},
                                "mongodb": {
                                    "default": {
                                        "value":1
                                    },
                                    "required": {
                                        "value": true,
                                        "enable": true,
                                        "message": "This field is required"
                                    }
                                }
                            }
                        },
                        "internal":{
                            "type": "number",
                            "configs": {
                                "aioconfig": {},
                                "mongodb": {
                                    "default": {
                                        "value":1
                                    },
                                    "required": {
                                        "value": true,
                                        "enable": true,
                                        "message": "This field is required"
                                    }
                                }
                            }
                        },
                        "scheduler":{
                            "type": "number",
                            "configs": {
                                "aioconfig": {},
                                "mongodb": {
                                    "default": {
                                        "value":1
                                    },
                                    "required": {
                                        "value": true,
                                        "enable": true,
                                        "message": "This field is required"
                                    }
                                }
                            }
                        }
                    }
                },
                "ports":{
                    "type": "nested",
                    "schema": {
                        "public":{
                            "type": "number",
                            "configs": {
                                "aioconfig": {},
                                "mongodb": {
                                    "required": {
                                        "value": true,
                                        "enable": true,
                                        "message": "This field is required"
                                    }
                                }
                            }
                        },
                        "partner":{
                            "type": "number",
                            "configs": {
                                "aioconfig": {},
                                "mongodb": {
                                    "required": {
                                        "value": true,
                                        "enable": true,
                                        "message": "This field is required"
                                    }
                                }
                            }
                        },
                        "internal":{
                            "type": "number",
                            "configs": {
                                "aioconfig": {},
                                "mongodb": {
                                    "required": {
                                        "value": true,
                                        "enable": true,
                                        "message": "This field is required"
                                    }
                                }
                            }
                        },
                        "scheduler":{
                            "type": "number",
                            "configs": {
                                "aioconfig": {},
                                "mongodb": {
                                    "required": {
                                        "value": true,
                                        "enable": true,
                                        "message": "This field is required"
                                    }
                                }
                            }
                        }
                    }
                },
                "alias": {
                    "type": "object",
                    "configs": {
                        "aioconfig": {},
                        "mongodb": {}
                    }
                },
                "entries": {
                    "type": "object",
                    "configs": {
                        "aioconfig": {},
                        "mongodb": {}
                    }
                },
                "srcDir": {
                    "type": "stringKey",
                    "configs": {
                        "aioconfig": {},
                        "mongodb": {
                            "trim": true,
                            "default": {
                                "value": "src"
                            }
                        }
                    }
                },
                "buildDir": {
                    "type": "stringKey",
                    "configs": {
                        "aioconfig": {},
                        "mongodb": {
                            "trim": true,
                            "default": {
                                "value": "build"
                            }
                        }
                    }
                },
                "fontsDir": {
                    "type": "stringKey",
                    "configs": {
                        "aioconfig": {},
                        "mongodb": {
                            "trim": true,
                            "default": {
                                "value": "fonts"
                            }
                        }
                    }
                },
                "imagesDir": {
                    "type": "stringKey",
                    "configs": {
                        "aioconfig": {},
                        "mongodb": {
                            "trim": true,
                            "default": {
                                "value": "images"
                            }
                        }
                    }
                },
                "scriptDir": {
                    "type": "stringKey",
                    "configs": {
                        "aioconfig": {},
                        "mongodb": {
                            "trim": true,
                            "default": {
                                "value": "scripts"
                            }
                        }
                    }
                },
                "iconFontsDir": {
                    "type": "stringKey",
                    "configs": {
                        "aioconfig": {},
                        "mongodb": {
                            "trim": true,
                            "default": {
                                "value": "icons"
                            }
                        }
                    }
                },
                "applicationType": {
                    "type": "stringKey",
                    "configs": {
                        "aioconfig": {},
                        "mongodb": {
                            "trim": true,
                            "default": {
                                "value": "ui"
                            }
                        }
                    }
                },
                "staticsDir": {
                    "type": "stringKey",
                    "configs": {
                        "aioconfig": {},
                        "mongodb": {
                            "trim": true,
                            "default": {
                                "value": "statics"
                            }
                        }
                    }
                },
                "appScriptsDir": {
                    "type": "stringKey",
                    "configs": {
                        "aioconfig": {},
                        "mongodb": {
                            "trim": true,
                            "default": {
                                "value": "scripts"
                            }
                        }
                    }
                },
                "compress": {
                    "type": "boolean",
                    "configs": {
                        "aioconfig": {},
                        "mongodb": {
                            "default": {
                                "value": true
                            }
                        }
                    }
                },
                "appWebCacheVersion": {
                    "type": "stringKey",
                    "configs": {
                        "aioconfig": {},
                        "mongodb": {
                            "trim": true,
                            "default": {
                                "value": "0001"
                            }
                        }
                    }
                },
                "appWebCacheTime": {
                    "type": "stringKey",
                    "configs": {
                        "aioconfig": {},
                        "mongodb": {
                            "trim": true
                        }
                    }
                },
                "cdnPath": {
                    "type": "stringKey",
                    "configs": {
                        "aioconfig": {},
                        "mongodb": {
                            "trim": true,
                            "default": {
                                "value": "/"
                            }
                        }
                    }
                },
                "cssCdnPath": {
                    "type": "stringKey",
                    "configs": {
                        "aioconfig": {},
                        "mongodb": {
                            "trim": true,
                            "default": {
                                "value": "/"
                            }
                        }
                    }
                },
                "apiBasePath": {
                    "type": "stringKey",
                    "configs": {
                        "aioconfig": {},
                        "mongodb": {
                            "trim": true,
                            "default": {
                                "value": "/"
                            }
                        }
                    }
                },
                "fontsCdnPath": {
                    "type": "stringKey",
                    "configs": {
                        "aioconfig": {},
                        "mongodb": {
                            "trim": true,
                            "default": {
                                "value": "/"
                            }
                        }
                    }
                },
                "imagesCdnPath": {
                    "type": "stringKey",
                    "configs": {
                        "aioconfig": {},
                        "mongodb": {
                            "trim": true,
                            "default": {
                                "value": "/"
                            }
                        }
                    }
                },
                "assetsCdnPath": {
                    "type": "stringKey",
                    "configs": {
                        "aioconfig": {},
                        "mongodb": {
                            "trim": true,
                            "default": {
                                "value": "/"
                            }
                        }
                    }
                },
                "buildBundles": {
                    "type": "nested",
                    "schema": {
                        "compressed": {
                            "type": "boolean",
                            "configs": {
                                "aioconfig": {},
                                "mongodb": {
                                    "default": {
                                        "value": true
                                    }
                                }
                            }
                        },
                        "uncompressed": {
                            "type": "boolean",
                            "configs": {
                                "aioconfig": {},
                                "mongodb": {
                                    "default": {
                                        "value": true
                                    }
                                }
                            }
                        }
                    }
                },
                "languages": {
                    "type": "object",
                    "configs": {
                        "aioconfig": {},
                        "mongodb": {}
                    },
                    "schema": {
                        "en": {
                            "type": "boolean",
                            "configs": {
                                "aioconfig": {},
                                "mongodb": {}
                            }
                        }
                    }
                },
                "defaultCategory": {
                    "type": "stringKey",
                    "configs": {
                        "aioconfig": {},
                        "mongodb": {
                            "trim": true,
                            "default": {
                                "value": "home"
                            }
                        }
                    }
                },
                "chunksDomainPlaceholder": {
                    "type": "stringKey",
                    "configs": {
                        "aioconfig": {},
                        "mongodb": {
                            "trim": true,
                            "default": {
                                "value": "__AIO__APP__CHUNKS__DOMAIN__PLACEHOLDER__"
                            }
                        }
                    }
                },
                "appEnv": {
                    "type": "stringKey",
                    "configs": {
                        "aioconfig": {},
                        "mongodb": {
                            "trim": true,
                            "default": {
                                "value": "prod"
                            }
                        }
                    }
                },
                "gtmId": {
                    "type": "stringKey",
                    "configs": {
                        "aioconfig": {},
                        "mongodb": {
                            "trim": true,
                            "default": {
                                "value": "NA"
                            }
                        }
                    }
                },
                "category": {
                    "type": "stringKey",
                    "configs": {
                        "aioconfig": {},
                        "mongodb": {
                            "trim": true,
                            "required": {
                                "value": true,
                                "enable": true,
                                "message": "This field is required"
                            }
                        }
                    }
                },
                "appName": {
                    "type": "stringKey",
                    "configs": {
                        "aioconfig": {},
                        "mongodb": {
                            "trim": true,
                            "required": {
                                "value": true,
                                "enable": true,
                                "message": "This field is required"
                            }
                        }
                    }
                },
                "dbConfigs": {
                    "type": "nested",
                    "schema": {
                        "dbId":{
                            "type":"objectId",
                            "configs":{
                                "aioconfig":{},
                                "mongodb":{
                                    "minLength": {
                                        "value": "24",
                                        "enable": true,
                                        "message": "Min length is not valid"
                                    },
                                    "maxLength": {
                                        "value": "24",
                                        "enable": true,
                                        "message": "Max length is not valid"
                                    }
                                }
                            }
                        },
                        "defaultCollections": {
                            "type": "nested",
                            "schema": {
                            "merchant": {
                                "type": "boolean",
                                "configs": {
                                    "aioconfig": {},
                                    "mongodb": {
                                        "default": {
                                            "value": false
                                        }
                                    }
                                }
                            },
                            "apiSchema": {
                                "type": "boolean",
                                "configs": {
                                "aioconfig": {},
                                    "mongodb": {
                                        "default": {
                                            "value": false
                                        }
                                    }
                                }
                            },
                            "collections": {
                                "type": "boolean",
                                "configs": {
                                "aioconfig": {},
                                    "mongodb": {
                                        "default": {
                                            "value": false
                                        }
                                    }
                                }
                            },
                            "appDetails": {
                                "type": "boolean",
                                "configs": {
                                "aioconfig": {},
                                    "mongodb": {
                                        "default": {
                                            "value": false
                                        }
                                    }
                                }
                            }
                            }
                        }
                    }
                }
            }
        },
        "packageJson": {
            "type": "nested",
            "schema": {
                "scripts": {
                    "type": "object",
                    "configs": {
                        "aioconfig": {},
                        "mongodb": {}
                    }
                },
                "dependencies": {
                    "type": "object",
                    "configs": {
                        "aioconfig": {},
                        "mongodb": {}
                    }
                },
                "devDependencies": {
                    "type": "object",
                    "configs": {
                        "aioconfig": {},
                        "mongodb": {}
                    }
                },
                "license": {
                    "type": "string",
                    "configs": {
                        "aioconfig": {},
                        "mongodb": {
                            "trim": true,
                            "default": {
                                "value": "ISC"
                            }
                        }
                    }
                }
            }
        },
        "appInfo": {
            "type": "nested",
            "schema": {
                "author": {
                    "type": "string",
                    "configs": {
                        "aioconfig": {},
                        "mongodb": {
                            "trim": true,
                            "required": {
                                "value": true,
                                "enable": true,
                                "message": "This field is required"
                            }
                        }
                    }
                },
                "version": {
                    "type": "stringKey",
                    "configs": {
                        "aioconfig": {},
                        "mongodb": {
                            "trim": true,
                            "required": {
                                "value": true,
                                "enable": true,
                                "message": "This field is required"
                            },
                            "default": {
                                "value": "0.0.0.1"
                            }
                        }
                    }
                },
                "description": {
                    "type": "paragraph",
                    "configs": {
                        "aioconfig": {},
                        "mongodb": {
                            "trim": true,
                            "required": {
                                "value": true,
                                "enable": true,
                                "message": "This field is required"
                            }
                        }
                    }
                },
                "appId":{
                    "type":"objectId",
                    "configs":{
                        "aioconfig":{},
                        "mongodb":{
                            "unique":true,
                            "auto":true
                        }
                    }
                }
            }
        },
        "hooksKeyNames": {
            "type": "nested",
            "schema": {
                "_____AIO__GLOBAL__HEAD__CSS__HOOK_____": {
                    "type": "string",
                    "configs": {
                        "aioconfig": {},
                        "mongodb": {
                            "trim": true
                        }
                    }
                },
                "_____AIO__APP__HEAD__CSS__HOOK_____": {
                    "type": "string",
                    "configs": {
                        "aioconfig":{},
                        "mongodb": {
                            "trim":true
                        }
                    }
                },
                "_____AIO__GLOBAL__PAGE__HEADER__HOOK_____": {
                    "type": "string",
                    "configs": {
                        "aioconfig":{},
                        "mongodb": {
                            "trim":true
                        }
                    }
                },
                "_____AIO__GLOBAL__APP__HEADER__HOOK_____": {
                    "type": "string",
                    "configs": {
                        "aioconfig":{},
                        "mongodb": {
                            "trim":true
                        }
                    }
                },
                "_____AIO__GLOBAL__BODY__HOOK_____": {
                    "type": "string",
                    "configs": {
                        "aioconfig":{},
                        "mongodb": {
                            "trim":true
                        }
                    }
                },
                "_____AIO__APP__BODY__HOOK_____": {
                    "type": "string",
                    "configs": {
                        "aioconfig":{},
                        "mongodb": {
                            "trim":true
                        }
                    }
                },
                "_____AIO__GLOBAL__APP__FOOTER__HOOK_____": {
                    "type": "string",
                    "configs": {
                        "aioconfig":{},
                        "mongodb": {
                            "trim":true
                        }
                    }
                },
                "_____AIO__GLOBAL__PAGE__FOOTER__HOOK_____": {
                    "type": "string",
                    "configs": {
                        "aioconfig":{},
                        "mongodb": {
                            "trim":true
                        }
                    }
                },
                "_____AIO__GLOBAL__FOOTER__SCRIPT__HOOK_____": {
                    "type": "string",
                    "configs": {
                        "aioconfig": {},
                        "mongodb": {
                            "trim": true
                        }
                }
            },
            "_____AIO__APP__FOOTER__SCRIPT__HOOK_____": {
                    "type": "string",
                    "configs": {
                        "aioconfig":{},
                        "mongodb": {
                            "trim":true
                        }
                    }
                }
            }
        },
        "hooks": {
            "type": "nested",
            "schema": {
                "appCreateTimeHooks": {
                    "type": "nested",
                    "schema": {
                        "_____APP__CREATE__TIME__HOOKS_____AIO__GLOBAL__HEAD__CSS__HOOK_____": {
                            "type": "stringKey",
                            "configs": {
                                "aioconfig": {},
                                "mongodb": {
                                    "trim": true
                                }
                            }
                        },
                        "_____APP__CREATE__TIME__HOOKS_____AIO__APP__HEAD__CSS__HOOK_____": {
                            "type": "stringKey",
                            "configs": {
                                "aioconfig": {},
                                "mongodb": {
                                    "trim": true
                                }
                            }
                        },
                        "_____APP__CREATE__TIME__HOOKS_____AIO__GLOBAL__PAGE__HEADER__HOOK_____": {
                            "type": "stringKey",
                            "configs": {
                                "aioconfig": {},
                                "mongodb": {
                                    "trim": true
                                }
                            }
                        },
                        "_____APP__CREATE__TIME__HOOKS_____AIO__GLOBAL__APP__HEADER__HOOK_____": {
                            "type": "stringKey",
                            "configs": {
                                "aioconfig": {},
                                "mongodb": {
                                    "trim": true
                                }
                            }
                        },
                        "_____APP__CREATE__TIME__HOOKS_____AIO__GLOBAL__BODY__HOOK_____": {
                            "type": "stringKey",
                            "configs": {
                                "aioconfig": {},
                                "mongodb": {
                                    "trim": true
                                }
                            }
                        },
                        "_____APP__CREATE__TIME__HOOKS_____AIO__APP__BODY__HOOK_____": {
                            "type": "stringKey",
                            "configs": {
                                "aioconfig": {},
                                "mongodb": {
                                    "trim": true
                                }
                            }
                        },
                        "_____APP__CREATE__TIME__HOOKS_____AIO__GLOBAL__APP__FOOTER__HOOK_____": {
                            "type": "stringKey",
                            "configs": {
                                "aioconfig": {},
                                "mongodb": {
                                    "trim": true
                                }
                            }
                        },
                        "_____APP__CREATE__TIME__HOOKS_____AIO__GLOBAL__PAGE__FOOTER__HOOK_____": {
                            "type": "stringKey",
                            "configs": {
                                "aioconfig": {},
                                "mongodb": {
                                    "trim": true
                                }
                            }
                        },
                        "_____APP__CREATE__TIME__HOOKS_____AIO__GLOBAL__FOOTER__SCRIPT__HOOK_____": {
                            "type": "stringKey",
                            "configs": {
                                "aioconfig": {},
                                "mongodb": {
                                    "trim": true
                                }
                            }
                        },
                        "_____APP__CREATE__TIME__HOOKS_____AIO__APP__FOOTER__SCRIPT__HOOK_____": {
                            "type": "stringKey",
                            "configs": {
                                "aioconfig": {},
                                "mongodb": {
                                    "trim": true
                                }
                            }
                        }
                }
            },
            "webpackCompileTimeHooks": {
                "type": "nested",
                "schema": {
                    "_____WEBPACK__COMPILE__TIME__HOOKS_____AIO__GLOBAL__HEAD__CSS__HOOK_____": {
                        "type": "stringKey",
                        "configs": {
                            "aioconfig": {},
                            "mongodb": {
                                "trim": true
                            }
                        }
                    },
                    "_____WEBPACK__COMPILE__TIME__HOOKS_____AIO__APP__HEAD__CSS__HOOK_____": {
                        "type": "stringKey",
                        "configs": {
                            "aioconfig": {},
                            "mongodb": {
                                "trim": true
                            }
                        }
                    },
                    "_____WEBPACK__COMPILE__TIME__HOOKS_____AIO__GLOBAL__PAGE__HEADER__HOOK_____": {
                        "type": "stringKey",
                        "configs": {
                            "aioconfig": {},
                            "mongodb": {
                                "trim": true
                            }
                        }
                    },
                    "_____WEBPACK__COMPILE__TIME__HOOKS_____AIO__GLOBAL__APP__HEADER__HOOK_____": {
                        "type": "stringKey",
                        "configs": {
                            "aioconfig": {},
                            "mongodb": {
                                "trim": true
                            }
                        }
                    },
                    "_____WEBPACK__COMPILE__TIME__HOOKS_____AIO__GLOBAL__BODY__HOOK_____": {
                        "type": "stringKey",
                        "configs": {
                            "aioconfig": {},
                            "mongodb": {
                                "trim": true
                            }
                        }
                    },
                    "_____WEBPACK__COMPILE__TIME__HOOKS_____AIO__APP__BODY__HOOK_____": {
                        "type": "stringKey",
                        "configs": {
                            "aioconfig": {},
                            "mongodb": {
                                "trim": true
                            }
                        }
                    },
                    "_____WEBPACK__COMPILE__TIME__HOOKS_____AIO__GLOBAL__APP__FOOTER__HOOK_____": {
                        "type": "stringKey",
                        "configs": {
                            "aioconfig": {},
                            "mongodb": {
                                "trim": true
                            }
                        }
                    },
                    "_____WEBPACK__COMPILE__TIME__HOOKS_____AIO__GLOBAL__PAGE__FOOTER__HOOK_____": {
                        "type": "stringKey",
                        "configs": {
                            "aioconfig": {},
                            "mongodb": {
                                "trim": true
                            }
                        }
                    },
                    "_____WEBPACK__COMPILE__TIME__HOOKS_____AIO__GLOBAL__FOOTER__SCRIPT__HOOK_____": {
                        "type": "stringKey",
                        "configs": {
                            "aioconfig": {},
                            "mongodb": {
                                "trim": true
                            }
                        }
                    },
                    "_____WEBPACK__COMPILE__TIME__HOOKS_____AIO__APP__FOOTER__SCRIPT__HOOK_____": {
                        "type": "stringKey",
                        "configs": {
                            "aioconfig": {},
                            "mongodb": {
                                "trim": true
                            }
                        }
                    }
                }
            },
            "serverSideHooks": {
                "type": "nested",
                "schema": {
                    "_____SERVER__SIDE__HOOKS_____AIO__GLOBAL__HEAD__CSS__HOOK_____": {
                        "type": "stringKey",
                        "configs": {
                            "aioconfig": {},
                            "mongodb": {
                                "trim": true
                            }
                        }
                    },
                    "_____SERVER__SIDE__HOOKS_____AIO__APP__HEAD__CSS__HOOK_____": {
                        "type": "stringKey",
                        "configs": {
                            "aioconfig": {},
                            "mongodb": {
                                "trim": true
                            }
                        }
                    },
                    "_____SERVER__SIDE__HOOKS_____AIO__GLOBAL__PAGE__HEADER__HOOK_____": {
                        "type": "stringKey",
                        "configs": {
                            "aioconfig": {},
                            "mongodb": {
                                "trim": true
                            }
                        }
                    },
                    "_____SERVER__SIDE__HOOKS_____AIO__GLOBAL__APP__HEADER__HOOK_____": {
                        "type": "stringKey",
                        "configs": {
                            "aioconfig": {},
                            "mongodb": {
                                "trim": true
                            }
                        }
                    },
                    "_____SERVER__SIDE__HOOKS_____AIO__GLOBAL__BODY__HOOK_____": {
                        "type": "stringKey",
                        "configs": {
                            "aioconfig": {},
                            "mongodb": {
                                "trim": true
                            }
                        }
                    },
                    "_____SERVER__SIDE__HOOKS_____AIO__APP__BODY__HOOK_____": {
                        "type": "stringKey",
                        "configs": {
                            "aioconfig": {},
                            "mongodb": {
                                "trim": true
                            }
                        }
                    },
                    "_____SERVER__SIDE__HOOKS_____AIO__GLOBAL__APP__FOOTER__HOOK_____": {
                        "type": "stringKey",
                        "configs": {
                            "aioconfig": {},
                            "mongodb": {
                                "trim": true
                            }
                        }
                    },
                    "_____SERVER__SIDE__HOOKS_____AIO__GLOBAL__PAGE__FOOTER__HOOK_____": {
                        "type": "stringKey",
                        "configs": {
                            "aioconfig": {},
                            "mongodb": {
                                "trim": true
                            }
                        }
                    },
                    "_____SERVER__SIDE__HOOKS_____AIO__GLOBAL__FOOTER__SCRIPT__HOOK_____": {
                        "type": "stringKey",
                        "configs": {
                            "aioconfig": {},
                            "mongodb": {
                                "trim": true
                            }
                        }
                    },
                    "_____SERVER__SIDE__HOOKS_____AIO__APP__FOOTER__SCRIPT__HOOK_____": {
                        "type": "stringKey",
                        "configs": {
                            "aioconfig": {},
                            "mongodb": {
                                "trim": true
                            }
                        }
                    }
                }
            }
            }
        },
        "hashId": {
            "type": "stringKey",
            "configs": {
                "aioconfig": {
                    "private":false
                },
                "mongodb": {
                    "trim": true,
                    "required": {
                        "value": true,
                        "enable": true,
                        "message": "This field is required"
                    },
                    "unique": true,
                    "minLength": {
                        "value": "32",
                        "enable": true,
                        "message": "Min length is not valid"
                    },
                    "maxLength": {
                        "value": "32",
                        "enable": true,
                        "message": "Max length is not valid"
                    }
                }
            }
        },
        "portHashId": {
            "type":"stringKey",
            "configs": {
                "aioconfig": {
                    "private":false
                },
                "mongodb": {
                    "trim": true,
                    "unique": true,
                    "required": {
                        "value": true,
                        "enable": true,
                        "message": "This field is required"
                    },
                    "minLength": {
                        "value": "32",
                        "enable": true,
                        "message": "Min length is not valid"
                    },
                    "maxLength": {
                        "value": "32",
                        "enable": true,
                        "message": "Max length is not valid"
                    }
                }
            }
        },
        "internalPortHashId": {
            "type":"stringKey",
            "configs": {
                "aioconfig": {
                    "private":false
                },
                "mongodb": {
                    "trim": true,
                    "unique": true,
                    "required": {
                        "value": true,
                        "enable": true,
                        "message": "This field is required"
                    },
                    "minLength": {
                        "value": "32",
                        "enable": true,
                        "message": "Min length is not valid"
                    },
                    "maxLength": {
                        "value": "32",
                        "enable": true,
                        "message": "Max length is not valid"
                    }
                }
            }
        },
        "partnerPortHashId": {
            "type":"stringKey",
            "configs": {
                "aioconfig": {
                    "private":false
                },
                "mongodb": {
                    "trim": true,
                    "unique": true,
                    "required": {
                        "value": true,
                        "enable": true,
                        "message": "This field is required"
                    },
                    "minLength": {
                        "value": "32",
                        "enable": true,
                        "message": "Min length is not valid"
                    },
                    "maxLength": {
                        "value": "32",
                        "enable": true,
                        "message": "Max length is not valid"
                    }
                }
            }
        },
        "schedulerPortHashId": {
            "type":"stringKey",
            "configs": {
                "aioconfig": {
                    "private":false
                },
                "mongodb": {
                    "trim": true,
                    "unique": true,
                    "minLength": {
                        "value": "32",
                        "enable": true,
                        "message": "Min length is not valid"
                    },
                    "maxLength": {
                        "value": "32",
                        "enable": true,
                        "message": "Max length is not valid"
                    }
                }
            }
        }
    }
}

module.exports = appDetails;