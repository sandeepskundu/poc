const messages = process.aioBeLibs('helpers/_private/utils/messages');
const schema = process.aioBeLibs(`helpers/_private/schemas/structures`);

const stringKey = async (req, dval) => {
    return await schema.universal.string.key(req, {
        "configs":{
            "mongodb":{
                "default": {
                    "enable":true,
                    "value":`'${dval || ''}'`
                }
            }
        }
    })
}

const string = async (req, dval, required) => {
    return await schema.universal.string.value(req, {
        "configs":{
            "mongodb":{
                "default": {
                    "enable":true,
                    "value":`'${dval || ''}'`
                },
                "required": {
                    "enable": required || false
                }
            }
        }
    })
}

const boolean = async (req, dval) => {
    return await schema.universal.boolean(req, {
        "configs":{
            "mongodb":{
                "default":{
                    "enable":true,
                    "value":dval || false,
                }
            }
        }
    })
}

const number = async (req, dval) => {
    return await schema.universal.number.value(req, {
        "configs":{
            "mongodb":{
                "default":{
                    "enable":true,
                    "value":`${dval || 0}`,
                }
            }
        }
    })
}

const dbId = async (req) => {
    return `{
        validator: async function (value) {
            return true;
            return await helpers.mongoose.validate.document.isexist(this, 'accessMap', {_id:value}, {});
        },
        message: (props)  => {
			return {
            	path: props.path,
            	message:"Please select a valid option and try again."
        	}
		}
    }`
}

exports.get = async (private, appConfig, req) => {
    return {
        "collection":{
            "name":'app'
        },
        "schema":{
            "isac":await schema.universal.isac(req, {}),
            "hashId":await schema.universal.hashId(req, {}),
            "portHashId":await schema.universal.hashId(req, {}),
            "htmlPlaceholders":await schema.universal.object(req, {}),
            "partnerPortHashId":await schema.universal.hashId(req, {}),
            "internalPortHashId":await schema.universal.hashId(req, {}),
            "schedulerPortHashId":await schema.universal.hashId(req, {}),
            "webpackConfigs":{
                "type":"nested",
                "schema": {
                    "libsDirsMapConfig":await schema.universal.object(req, {})
                }
            },
            "category":await schema.universal.string.key(req, {
                "configs":{
                    "mongodb":{
                        "lowercase":true,
                    }
                }
            }),
            "appName":await schema.universal.string.key(req, {
                "configs":{
                    "mongodb": {
                        "lowercase":true,
                        "minLength":{
                            "value":"6",
                            "enable":true,
                            "message": "Min length is not valid"
                        },
                        "maxLength":{
                            "value":"20",
                            "enable":true,
                            "message":"Max length is not valid"
                        }
                    }
                }
            }),
            "scssConfig": {
                "type":"nested",
                "schema":{
                    "hasTheme":await boolean(req, true),
                    "hasDesignSystem":await boolean(req, false),
                    "scssDir":await stringKey(req, 'scss'),
                    "fontsDir":await stringKey(req, 'fonts'),
                    "imagesDir":await stringKey(req, 'images'),
                    "themesDir":await stringKey(req, 'themes'),
                    "staticsDir":await stringKey(req, 'statics'),
                    "designSystemDir":await stringKey(req, 'dsystem'),
                    "themeColorDir":await stringKey(req, 'theme-colors'),
                    "additionalData":await schema.universal.object(req, {}),
                    "additionalDataMap":await schema.universal.object(req, {})
                }
            },
            "appConfig": {
                "type":"nested",
                "schema":{
                    "appExposedIn":{
                        "type":"nested",
                        "schema":{
                            "public":await boolean(req, false),
                            "partner":await boolean(req, false),
                            "internal":await boolean(req, false),
                            "scheduler":await boolean(req, false),
                        }
                    },
                    "instances":{
                        "type":"nested",
                        "schema": {
                            "public":await number(req, 1),
                            "partner":await number(req, 1),
                            "internal":await number(req, 1),
                            "scheduler":await number(req, 1)
                        }
                    },
                    "ports":{
                        "type":"nested",
                        "schema": {
                            "public":await number(req),
                            "partner":await number(req),
                            "internal":await number(req),
                            "scheduler":await number(req)
                        }
                    },
                    "alias":await schema.universal.object(req, {}),
                    "entries":await schema.universal.object(req, {}),
                    "srcDir":await stringKey(req, 'src'),
                    "buildDir":await stringKey(req, 'build'),
                    "fontsDir":await stringKey(req, 'fonts'),
                    "imagesDir":await stringKey(req, 'images'),
                    "scriptDir":await stringKey(req, 'scripts'),
                    "iconFontsDir":await stringKey(req, 'icons'),
                    "applicationType":await stringKey(req, 'ui'),
                    "staticsDir":await stringKey(req, 'statics'),
                    "appScriptsDir":await stringKey(req, 'scripts'),
                    "compress":await boolean(req, true),
                    "appWebCacheVersion":await stringKey(req, '0001'),
                    "appWebCacheTime":await stringKey(req, '0001'),
                    "cdnPath":await stringKey(req, '/'),
                    "cssCdnPath":await stringKey(req, '/'),
                    "apiBasePath":await stringKey(req, '/'),
                    "fontsCdnPath":await stringKey(req, '/'),
                    "imagesCdnPath":await stringKey(req, '/'),
                    "assetsCdnPath":await stringKey(req, '/'),
                    "languages":await schema.universal.object(req, {}),
                    "defaultCategory":await stringKey(req, 'home'),
                    "chunksDomainPlaceholder":await stringKey(req, '__AIO__APP__CHUNKS__DOMAIN__PLACEHOLDER__'),
                    "appEnv":await stringKey(req, 'prod'),
                    "gtmId":await stringKey(req, 'NA'),
                    "category":await schema.universal.string.key(req, {}),
                    "appName":await schema.universal.string.key(req, {}),
                    "buildBundles":{
                        "type":"nested",
                        "schema": {
                            "compressed":await boolean(req, true),
                            "uncompressed":await boolean(req, true)
                        }
                    },
                    "dbConfigs":{
                        "type":"nested",
                        "schema":{
                            "dbId":await schema.universal.mongoId(req, {
                                "configs":{
                                    "mongodb":{
                                        "unique":false,
                                        "validate":await dbId(req),
                                        "required":{
                                            "enable":false
                                        }
                                    }
                                }
                            })
                        }
                    }
                }
            },
            "packageJson": {
                "type":"nested",
                "schema": {
                    "scripts":await schema.universal.object(req, {}),
                    "dependencies":await schema.universal.object(req, {}),
                    "devDependencies":await schema.universal.object(req, {}),
                    "license":await stringKey(req, 'ISC')
                }
            },
            "appInfo": {
                "type":"nested",
                "schema": {
                    "version":await stringKey(req, '0.0.0.1'),
                    "author":await schema.universal.text.title(req, {}),
                    "description":await schema.universal.text.description(req, {}),
                    "appId":await schema.universal.mongoId(req, {
                        "configs":{
                            "mongodb":{
                                "unique":true,
                                "auto":true
                            }
                        }
                    })
                }
            },
            "hooksKeyNames": {
                "type":"nested",
                "schema": {
                    "_____AIO__GLOBAL__HEAD__CSS__HOOK_____":await string(req),
                    "_____AIO__APP__HEAD__CSS__HOOK_____":await string(req),
                    "_____AIO__GLOBAL__PAGE__HEADER__HOOK_____":await string(req),
                    "_____AIO__GLOBAL__APP__HEADER__HOOK_____":await string(req),
                    "_____AIO__GLOBAL__BODY__HOOK_____":await string(req),
                    "_____AIO__APP__BODY__HOOK_____":await string(req),
                    "_____AIO__GLOBAL__APP__FOOTER__HOOK_____":await string(req),
                    "_____AIO__GLOBAL__PAGE__FOOTER__HOOK_____":await string(req),
                    "_____AIO__GLOBAL__FOOTER__SCRIPT__HOOK_____":await string(req),
                    "_____AIO__APP__FOOTER__SCRIPT__HOOK_____":await string(req)
                }
            },

            "hooks": {
                "type":"nested",
                "schema":{
                    "appCreateTimeHooks":{
                        "type":"nested",
                        "schema":{
                            "_____APP__CREATE__TIME__HOOKS_____AIO__GLOBAL__HEAD__CSS__HOOK_____":await string(req),
                            "_____APP__CREATE__TIME__HOOKS_____AIO__APP__HEAD__CSS__HOOK_____": await string(req),
                            "_____APP__CREATE__TIME__HOOKS_____AIO__GLOBAL__PAGE__HEADER__HOOK_____":await string(req),
                            "_____APP__CREATE__TIME__HOOKS_____AIO__GLOBAL__APP__HEADER__HOOK_____":await string(req),
                            "_____APP__CREATE__TIME__HOOKS_____AIO__GLOBAL__BODY__HOOK_____":await string(req),
                            "_____APP__CREATE__TIME__HOOKS_____AIO__APP__BODY__HOOK_____":await string(req),
                            "_____APP__CREATE__TIME__HOOKS_____AIO__GLOBAL__APP__FOOTER__HOOK_____":await string(req),
                            "_____APP__CREATE__TIME__HOOKS_____AIO__GLOBAL__PAGE__FOOTER__HOOK_____":await string(req),
                            "_____APP__CREATE__TIME__HOOKS_____AIO__GLOBAL__FOOTER__SCRIPT__HOOK_____":await string(req),
                            "_____APP__CREATE__TIME__HOOKS_____AIO__APP__FOOTER__SCRIPT__HOOK_____":await string(req),
                        }
                    },
                    "webpackCompileTimeHooks":{
                        "type":"nested",
                        "schema": {
                            "_____WEBPACK__COMPILE__TIME__HOOKS_____AIO__GLOBAL__HEAD__CSS__HOOK_____": await string(req),
                            "_____WEBPACK__COMPILE__TIME__HOOKS_____AIO__APP__HEAD__CSS__HOOK_____":await string(req),
                            "_____WEBPACK__COMPILE__TIME__HOOKS_____AIO__GLOBAL__PAGE__HEADER__HOOK_____":await string(req),
                            "_____WEBPACK__COMPILE__TIME__HOOKS_____AIO__GLOBAL__APP__HEADER__HOOK_____":await string(req),
                            "_____WEBPACK__COMPILE__TIME__HOOKS_____AIO__GLOBAL__BODY__HOOK_____":await string(req),
                            "_____WEBPACK__COMPILE__TIME__HOOKS_____AIO__APP__BODY__HOOK_____":await string(req),
                            "_____WEBPACK__COMPILE__TIME__HOOKS_____AIO__GLOBAL__APP__FOOTER__HOOK_____":await string(req),
                            "_____WEBPACK__COMPILE__TIME__HOOKS_____AIO__GLOBAL__PAGE__FOOTER__HOOK_____":await string(req),
                            "_____WEBPACK__COMPILE__TIME__HOOKS_____AIO__GLOBAL__FOOTER__SCRIPT__HOOK_____":await string(req),
                            "_____WEBPACK__COMPILE__TIME__HOOKS_____AIO__APP__FOOTER__SCRIPT__HOOK_____":await string(req)
                        }
                    },
                    "serverSideHooks":{
                        "type":"nested",
                        "schema": {
                            "_____SERVER__SIDE__HOOKS_____AIO__GLOBAL__HEAD__CSS__HOOK_____":await string(req),
                            "_____SERVER__SIDE__HOOKS_____AIO__APP__HEAD__CSS__HOOK_____":await string(req),
                            "_____SERVER__SIDE__HOOKS_____AIO__GLOBAL__PAGE__HEADER__HOOK_____":await string(req),
                            "_____SERVER__SIDE__HOOKS_____AIO__GLOBAL__APP__HEADER__HOOK_____":await string(req),
                            "_____SERVER__SIDE__HOOKS_____AIO__GLOBAL__BODY__HOOK_____":await string(req),
                            "_____SERVER__SIDE__HOOKS_____AIO__APP__BODY__HOOK_____":await string(req),
                            "_____SERVER__SIDE__HOOKS_____AIO__GLOBAL__APP__FOOTER__HOOK_____":await string(req),
                            "_____SERVER__SIDE__HOOKS_____AIO__GLOBAL__PAGE__FOOTER__HOOK_____":await string(req),
                            "_____SERVER__SIDE__HOOKS_____AIO__GLOBAL__FOOTER__SCRIPT__HOOK_____":await string(req),
                            "_____SERVER__SIDE__HOOKS_____AIO__APP__FOOTER__SCRIPT__HOOK_____":await string(req)
                        }
                    }
                }
            }
        }
    }
}