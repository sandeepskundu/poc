const mdHash = () => {
    return {
        "message":{
            "error":{
                "checks":{
                    "maxlength":"Please provide vaild hash value",
                    "minlength":"Please provide vaild hash value",
                    "required":"Hash value is optional"
                }
            }
        },
        "checks":{
            "maxlength":{
                "value":32,
                "uivalue":32,
                "bothAreSame":true
            },
            "minlength":{
                "value":32,
                "uivalue":32,
                "bothAreSame":true
            },
            "required":{
                "value":"optional",
                "uivalue":"optional",
                "bothAreSame":true
            }
        }
    }
}

module.exports = {
    "request":{
        "methods":{
            "put":{
                "allowed":true,
                "message":{
                    "error":"Only put method is allowed",
                    "success":"Only put method is allowed"
                }
            }
        },

        "body":{
            "min":1,
            "max":10,
            "type":"object",
            "required":"required",
            "message":{
                "error":"Put method is allowed - kskskskk",
                "success":"Put method is allowed"
            }
        }
    },
    "validation":{
        "params":{
            "id":{
                "message":{
                    "error":{
                        "checks":{
                            "regex":"Please provide vaild id",
                            "minlength":"Please provide vaild id",
                            "maxlength":"Please provide vaild id",
                            "required":"Please provide vaild id"
                        }
                    }
                },
                "checks":{
                    "regex":{
                        "value":'^[a-zA-Z0-9]+$',
                        "uivalue":'^[a-zA-Z0-9]+$',
                        "bothAreSame":true
                    },
                    "minlength":{
                        "value":24
                    },
                    "maxlength":{
                        "value":24
                    },
                    "required":{
                        "value":"required"
                    }
                }
            },
        },
        "body":{
            "signature.id":{
                "message":{
                    "error":{
                        "checks":{
                            "regex":"Please provide vaild signature id",
                            "minlength":"Please provide vaild signature id",
                            "maxlength":"Please provide vaild signature id",
                            "required":"Signature id is required"
                        }
                    }
                },
                "checks":{
                    "regex":{
                        "value":'^[a-zA-Z0-9]+$',
                        "uivalue":'^[a-zA-Z0-9]+$',
                        "bothAreSame":true
                    },
                    "minlength":{
                        "value":24
                    },
                    "maxlength":{
                        "value":24
                    },
                    "required":{
                        "value":"required"
                    }
                }
            },

            "signature.token":{
                "message":{
                    "error":{
                        "checks":{
                            "minlength":"Please provide vaild signature token",
                            "required":"Signature token is required"
                        }
                    }
                },
                "checks":{
                    "minlength":{
                        "value":32
                    },
                    "required":{
                        "value":"required"
                    }
                }
            },

            "htmlPlaceholders":{
                "message":{
                    "error":{
                        "checks":{
                            "object":"Html placeholders can have only object values",
                            "required":"This field is required."
                        }
                    }
                },
                "checks":{
                    "object":{
                        "value":'required',
                        "uivalue":'required',
                        "bothAreSame":true
                    },
                    "required":{
                        "value":"optional",
                        "uivalue":"optional",
                        "bothAreSame":true
                    }
                }
            },
            "webpackConfigs.libsDirsMapConfig":{
                "message":{
                    "error":{
                        "checks":{
                            "object":"Webpack libs dir map configs can have only object values",
                            "required":"This field is required."
                        }
                    }
                },
                "checks":{
                    "object":{
                        "value":'required',
                        "uivalue":'required',
                        "bothAreSame":true
                    },
                    "required":{
                        "value":"optional",
                        "uivalue":"optional",
                        "bothAreSame":true
                    }
                }
            },
            "category":{
                "message":{
                    "error":{
                        "checks":{
                            "enums":"Please select a vaild app category",
                            "required":"App category is required."
                        }
                    }
                },
                "checks":{
                    "enums":{
                        "value":{
                            "ui":true,
                            "api":true
                        },
                        "uivalue":{
                            "ui":true,
                            "api":true
                        },
                        "bothAreSame":true
                    },
                    "required":{
                        "value":"optional",
                        "uivalue":"optional",
                        "bothAreSame":true
                    }
                }
            },

            "appName":{
                "message":{
                    "error":{
                        "checks":{
                            "regex":"App name invalid",
                            "required":"App name is required."
                        }
                    }
                },
                "checks":{
                    "regex":{
                        "value":'^[a-z-]+$',
                        "uivalue":'^[a-z-]+$',
                        "bothAreSame":true
                    },
                    "required":{
                        "value":"optional",
                        "uivalue":"optional",
                        "bothAreSame":true
                    }
                }
            },

            "scssConfig.hasTheme":{
                "message":{
                    "error":{
                        "checks":{
                            "boolean":"Theme flag can have only boolean values.",
                            "required":"Theme is required."
                        }
                    }
                },
                "checks":{
                    "boolean":{
                        "value":'required',
                        "uivalue":'required',
                        "bothAreSame":true
                    },
                    "required":{
                        "value":"optional",
                        "uivalue":"optional",
                        "bothAreSame":true
                    }
                }
            },

            "scssConfig.hasDesignSystem":{
                "message":{
                    "error":{
                        "checks":{
                            "boolean":"Design system can have only boolean values.",
                            "required":"Design system is required."
                        }
                    }
                },
                "checks":{
                    "boolean":{
                        "value":'required',
                        "uivalue":'required',
                        "bothAreSame":true
                    },
                    "required":{
                        "value":"optional",
                        "uivalue":"optional",
                        "bothAreSame":true
                    }
                }
            },

            "scssConfig.additionalData":{
                "message":{
                    "error":{
                        "checks":{
                            "object":"Additional data can have only object values",
                            "required":"Additional data is optional filed"
                        }
                    }
                },
                "checks":{
                    "object":{
                        "value":'required',
                        "uivalue":'required',
                        "bothAreSame":true
                    },
                    "required":{
                        "value":"optional",
                        "uivalue":"optional",
                        "bothAreSame":true
                    }
                }
            },

            "scssConfig.additionalDataMap":{
                "message":{
                    "error":{
                        "checks":{
                            "object":"Additional data map can have only object values",
                            "required":"Additional data map is optional filed"
                        }
                    }
                },
                "checks":{
                    "object":{
                        "value":'required',
                        "uivalue":'required',
                        "bothAreSame":true
                    },
                    "required":{
                        "value":"optional",
                        "uivalue":"optional",
                        "bothAreSame":true
                    }
                }
            },

            "appConfig.ports.public":{
                "message":{
                    "error":{
                        "checks":{
                            "port":"Public port is invalid",
                            "required":"Partner port is required."
                        }
                    }
                },
                "checks":{
                    "port":{
                        "value":'required',
                        "uivalue":'required',
                        "bothAreSame":true
                    },
                    "required":{
                        "value":"optional",
                        "uivalue":"optional",
                        "bothAreSame":true
                    }
                }
            },
            "appConfig.ports.partner":{
                "message":{
                    "error":{
                        "checks":{
                            "port":"Partner port is invalid",
                            "required":"Partner port is required."
                        }
                    }
                },
                "checks":{
                    "port":{
                        "value":'required',
                        "uivalue":'required',
                        "bothAreSame":true
                    },
                    "required":{
                        "value":"optional",
                        "uivalue":"optional",
                        "bothAreSame":true
                    }
                }
            },
            "appConfig.ports.internal":{
                "message":{
                    "error":{
                        "checks":{
                            "port":"Partner port is invalid",
                            "required":"Partner port is required."
                        }
                    }
                },
                "checks":{
                    "port":{
                        "value":'required',
                        "uivalue":'required',
                        "bothAreSame":true
                    },
                    "required":{
                        "value":"optional",
                        "uivalue":"optional",
                        "bothAreSame":true
                    }
                }
            },
            "appConfig.ports.scheduler":{
                "message":{
                    "error":{
                        "checks":{
                            "port":"Partner port is invalid",
                            "required":"Partner port is required."
                        }
                    }
                },
                "checks":{
                    "port":{
                        "value":'required',
                        "uivalue":'required',
                        "bothAreSame":true
                    },
                    "required":{
                        "value":"optional",
                        "uivalue":"optional",
                        "bothAreSame":true
                    }
                }
            },
            "appConfig.instances.public":{
                "message":{
                    "error":{
                        "checks":{
                            "regex":"No of Instances value is invalid.",
                            "required":"No of Instances are required."
                        }
                    }
                },
                "checks":{
                    "regex":{
                        "value":'^(5[0-0]|[1-4][0-9]|[1-9])$',
                        "uivalue":'^(5[0-0]|[1-4][0-9]|[1-9])$',
                        "bothAreSame":true
                    },
                    "required":{
                        "value":"optional",
                        "uivalue":"optional",
                        "bothAreSame":true
                    }
                }
            },
            "appConfig.instances.partner":{
                "message":{
                    "error":{
                        "checks":{
                            "regex":"No of Instances value is invalid.",
                            "required":"No of Instances are required."
                        }
                    }
                },
                "checks":{
                    "regex":{
                        "value":'^(5[0-0]|[1-4][0-9]|[1-9])$',
                        "uivalue":'^(5[0-0]|[1-4][0-9]|[1-9])$',
                        "bothAreSame":true
                    },
                    "required":{
                        "value":"optional",
                        "uivalue":"optional",
                        "bothAreSame":true
                    }
                }
            },
            "appConfig.instances.internal":{
                "message":{
                    "error":{
                        "checks":{
                            "regex":"No of Instances value is invalid.",
                            "required":"No of Instances are required."
                        }
                    }
                },
                "checks":{
                    "regex":{
                        "value":'^(5[0-0]|[1-4][0-9]|[1-9])$',
                        "uivalue":'^(5[0-0]|[1-4][0-9]|[1-9])$',
                        "bothAreSame":true
                    },
                    "required":{
                        "value":"optional",
                        "uivalue":"optional",
                        "bothAreSame":true
                    }
                }
            },
            "appConfig.instances.scheduler":{
                "message":{
                    "error":{
                        "checks":{
                            "regex":"No of Instances value is invalid.",
                            "required":"No of Instances are required."
                        }
                    }
                },
                "checks":{
                    "regex":{
                        "value":'^(5[0-0]|[1-4][0-9]|[1-9])$',
                        "uivalue":'^(5[0-0]|[1-4][0-9]|[1-9])$',
                        "bothAreSame":true
                    },
                    "required":{
                        "value":"optional",
                        "uivalue":"optional",
                        "bothAreSame":true
                    }
                }
            },
            "appConfig.appExposedIn.public":{
                "message":{
                    "error":{
                        "checks":{
                            "boolean":"App exposed for pubilc value is invalid.",
                            "required":"App exposed for pubilc is optional"
                        }
                    }
                },
                "checks":{
                    "boolean":{
                        "value":'required',
                        "uivalue":'required',
                        "bothAreSame":true
                    },
                    "required":{
                        "value":"optional",
                        "uivalue":"optional",
                        "bothAreSame":true
                    }
                }
            },
            "appConfig.appExposedIn.partner":{
                "message":{
                    "error":{
                        "checks":{
                            "boolean":"App exposed for partner value is invalid.",
                            "required":"App exposed for partner is optional"
                        }
                    }
                },
                "checks":{
                    "boolean":{
                        "value":'required',
                        "uivalue":'required',
                        "bothAreSame":true
                    },
                    "required":{
                        "value":"optional",
                        "uivalue":"optional",
                        "bothAreSame":true
                    }
                }
            },
            "appConfig.appExposedIn.internal":{
                "message":{
                    "error":{
                        "checks":{
                            "boolean":"App exposed internally value is invalid.",
                            "required":"App exposed internally is optional"
                        }
                    }
                },
                "checks":{
                    "boolean":{
                        "value":'required',
                        "uivalue":'required',
                        "bothAreSame":true
                    },
                    "required":{
                        "value":"optional",
                        "uivalue":"optional",
                        "bothAreSame":true
                    }
                }
            },
            "appConfig.appExposedIn.scheduler":{
                "message":{
                    "error":{
                        "checks":{
                            "boolean":"App exposed for pubilc value is invalid.",
                            "required":"App exposed for pubilc is optional"
                        }
                    }
                },
                "checks":{
                    "boolean":{
                        "value":'required',
                        "uivalue":'required',
                        "bothAreSame":true
                    },
                    "required":{
                        "value":"optional",
                        "uivalue":"optional",
                        "bothAreSame":true
                    }
                }
            },
            "appConfig.alias":{
                "message":{
                    "error":{
                        "checks":{
                            "object":"Alias can have only object values",
                            "required":"Alias map is optional filed"
                        }
                    }
                },
                "checks":{
                    "object":{
                        "value":'required',
                        "uivalue":'required',
                        "bothAreSame":true
                    },
                    "required":{
                        "value":"optional",
                        "uivalue":"optional",
                        "bothAreSame":true
                    }
                }
            },

            "appConfig.entries":{
                "message":{
                    "error":{
                        "checks":{
                            "object":"Entries can have only object values",
                            "required":"Entries map is optional filed"
                        }
                    }
                },
                "checks":{
                    "object":{
                        "value":'required',
                        "uivalue":'required',
                        "bothAreSame":true
                    },
                    "required":{
                        "value":"optional",
                        "uivalue":"optional",
                        "bothAreSame":true
                    }
                }
            },

            "appConfig.buildBundles.compressed":{
                "message":{
                    "error":{
                        "checks":{
                            "boolean":"Compressed only boolean values.",
                            "required":"Compressed is required."
                        }
                    }
                },
                "checks":{
                    "boolean":{
                        "value":'required',
                        "uivalue":'required',
                        "bothAreSame":true
                    },
                    "required":{
                        "value":"optional",
                        "uivalue":"optional",
                        "bothAreSame":true
                    }
                }
            },

            "appConfig.buildBundles.uncompressed":{
                "message":{
                    "error":{
                        "checks":{
                            "boolean":"Uncompressed only boolean values.",
                            "required":"Uncompressed is required."
                        }
                    }
                },
                "checks":{
                    "boolean":{
                        "value":'required',
                        "uivalue":'required',
                        "bothAreSame":true
                    },
                    "required":{
                        "value":"optional",
                        "uivalue":"optional",
                        "bothAreSame":true
                    }
                }
            },

            "appConfig.applicationType":{
                "message":{
                    "error":{
                        "checks":{
                            "maxlength":"Please select a vaild application type",
                            "required":"Application type is required."
                        }
                    }
                },
                "checks":{
                    "enums":{
                        "value":{
                            "ui":true,
                            "express":true
                        },
                        "uivalue":{
                            "ui":true,
                            "express":true
                        },
                        "bothAreSame":true
                    },
                    "required":{
                        "value":"optional",
                        "uivalue":"optional",
                        "bothAreSame":true
                    }
                }
            },

            "appConfig.appWebCacheVersion":{
                "message":{
                    "error":{
                        "checks":{
                            "regex":"App cache version invalid",
                            "required":"App cache version is required."
                        }
                    }
                },
                "checks":{
                    "regex":{
                        "value":'^[a-z0-9]+$',
                        "uivalue":'^[a-z0-9]+$',
                        "bothAreSame":true
                    },
                    "required":{
                        "value":"optional",
                        "uivalue":"optional",
                        "bothAreSame":true
                    }
                }
            },

            "appConfig.appWebCacheTime":{
                "message":{
                    "error":{
                        "checks":{
                            "regex":"App cache version invalid",
                            "required":"App cache version is required."
                        }
                    }
                },
                "checks":{
                    "regex":{
                        "value":'^[a-z0-9]+$',
                        "uivalue":'^[a-z0-9]+$',
                        "bothAreSame":true
                    },
                    "required":{
                        "value":"optional",
                        "uivalue":"optional",
                        "bothAreSame":true
                    }
                }
            },

            "appConfig.cdnPath":{
                "message":{
                    "error":{
                        "checks":{
                            "url":"Please enter a vaild cdn path url",
                            "required":"Cdn parh is optional"
                        }
                    }
                },
                "checks":{
                    "url":{
                        "value":'required',
                        "uivalue":'required',
                        "bothAreSame":true
                    },
                    "required":{
                        "value":"optional",
                        "uivalue":"optional",
                        "bothAreSame":true
                    }
                }
            },

            "appConfig.cssCdnPath":{
                "message":{
                    "error":{
                        "checks":{
                            "url":"Please enter a vaild css cdn path url",
                            "required":"CSS cdn parh is optional"
                        }
                    }
                },
                "checks":{
                    "url":{
                        "value":'required',
                        "uivalue":'required',
                        "bothAreSame":true
                    },
                    "required":{
                        "value":"optional",
                        "uivalue":"optional",
                        "bothAreSame":true
                    }
                }
            },

            "appConfig.apiBasePath":{
                "message":{
                    "error":{
                        "checks":{
                            "url":"Please enter a vaild css api base path url",
                            "required":"API base parh is optional"
                        }
                    }
                },
                "checks":{
                    "url":{
                        "value":'required',
                        "uivalue":'required',
                        "bothAreSame":true
                    },
                    "required":{
                        "value":"optional",
                        "uivalue":"optional",
                        "bothAreSame":true
                    }
                }
            },

            "appConfig.fontsCdnPath":{
                "message":{
                    "error":{
                        "checks":{
                            "url":"Please enter a vaild css fonts cdn path url",
                            "required":"Fonts cdn path is optional"
                        }
                    }
                },
                "checks":{
                    "url":{
                        "value":'required',
                        "uivalue":'required',
                        "bothAreSame":true
                    },
                    "required":{
                        "value":"optional",
                        "uivalue":"optional",
                        "bothAreSame":true
                    }
                }
            },

            "appConfig.imagesCdnPath":{
                "message":{
                    "error":{
                        "checks":{
                            "url":"Please enter a vaild css images cdn path url",
                            "required":"Images cdn path is optional"
                        }
                    }
                },
                "checks":{
                    "url":{
                        "value":'required',
                        "uivalue":'required',
                        "bothAreSame":true
                    },
                    "required":{
                        "value":"optional",
                        "uivalue":"optional",
                        "bothAreSame":true
                    }
                }
            },

            "appConfig.assetsCdnPath":{
                "message":{
                    "error":{
                        "checks":{
                            "url":"Please enter a vaild css assets cdn path url",
                            "required":"Assets cdn path is optional"
                        }
                    }
                },
                "checks":{
                    "url":{
                        "value":'required',
                        "uivalue":'required',
                        "bothAreSame":true
                    },
                    "required":{
                        "value":"optional",
                        "uivalue":"optional",
                        "bothAreSame":true
                    }
                }
            },

            "appInfo.author":{
                "message":{
                    "error":{
                        "checks":{
                            "regex":"Author name invalid",
                            "required":"Author name is required."
                        }
                    }
                },
                "checks":{
                    "regex":{
                        "value":'^[a-z-]+$',
                        "uivalue":'^[a-z-]+$',
                        "bothAreSame":true
                    },
                    "required":{
                        "value":"optional",
                        "uivalue":"optional",
                        "bothAreSame":true
                    }
                }
            },
            "appInfo.version":{
                "message":{
                    "error":{
                        "checks":{
                            "regex":"Version is invalid",
                            "required":"Version is required."
                        }
                    }
                },
                "checks":{
                    "regex":{
                        "value":'^[0-9.]+$',
                        "uivalue":'^[0-9.]+$',
                        "bothAreSame":true
                    },
                    "required":{
                        "value":"optional",
                        "uivalue":"optional",
                        "bothAreSame":true
                    }
                }
            },
            "appInfo.description":{
                "message":{
                    "error":{
                        "checks":{
                            "regex":"Description is invalid",
                            "required":"Description is required."
                        }
                    }
                },
                "checks":{
                    "regex":{
                        "value":'^[a-zA-Z0-9 ]+$',
                        "uivalue":'^[a-zA-Z0-9 ]+$',
                        "bothAreSame":true
                    },
                    "required":{
                        "value":"optional",
                        "uivalue":"optional",
                        "bothAreSame":true
                    }
                }
            },

            "hooksKeyNames._____AIO__GLOBAL__HEAD__CSS__HOOK_____":mdHash(),
            "hooksKeyNames._____AIO__APP__HEAD__CSS__HOOK_____":mdHash(),
            "hooksKeyNames._____AIO__GLOBAL__PAGE__HEADER__HOOK_____":mdHash(),
            "hooksKeyNames._____AIO__GLOBAL__APP__HEADER__HOOK_____":mdHash(),
            "hooksKeyNames._____AIO__GLOBAL__BODY__HOOK_____":mdHash(),
            "hooksKeyNames._____AIO__APP__BODY__HOOK_____":mdHash(),
            "hooksKeyNames._____AIO__GLOBAL__APP__FOOTER__HOOK_____":mdHash(),
            "hooksKeyNames._____AIO__GLOBAL__PAGE__FOOTER__HOOK_____": mdHash(),
            "hooksKeyNames._____AIO__GLOBAL__FOOTER__SCRIPT__HOOK_____":mdHash(),
            "hooksKeyNames._____AIO__APP__FOOTER__SCRIPT__HOOK_____":mdHash(),
            "hooks.appCreateTimeHooks._____APP__CREATE__TIME__HOOKS_____AIO__GLOBAL__HEAD__CSS__HOOK_____":mdHash(),
            "hooks.appCreateTimeHooks._____APP__CREATE__TIME__HOOKS_____AIO__APP__HEAD__CSS__HOOK_____":mdHash(),
            "hooks.appCreateTimeHooks._____APP__CREATE__TIME__HOOKS_____AIO__GLOBAL__PAGE__HEADER__HOOK_____": mdHash(),
            "hooks.appCreateTimeHooks._____APP__CREATE__TIME__HOOKS_____AIO__GLOBAL__APP__HEADER__HOOK_____":mdHash(),
            "hooks.appCreateTimeHooks._____APP__CREATE__TIME__HOOKS_____AIO__GLOBAL__BODY__HOOK_____":mdHash(),
            "hooks.appCreateTimeHooks._____APP__CREATE__TIME__HOOKS_____AIO__APP__BODY__HOOK_____":mdHash(),
            "hooks.appCreateTimeHooks._____APP__CREATE__TIME__HOOKS_____AIO__GLOBAL__APP__FOOTER__HOOK_____":mdHash(),
            "hooks.appCreateTimeHooks._____APP__CREATE__TIME__HOOKS_____AIO__GLOBAL__PAGE__FOOTER__HOOK_____":mdHash(),
            "hooks.appCreateTimeHooks._____APP__CREATE__TIME__HOOKS_____AIO__GLOBAL__FOOTER__SCRIPT__HOOK_____":mdHash(),
            "hooks.appCreateTimeHooks._____APP__CREATE__TIME__HOOKS_____AIO__APP__FOOTER__SCRIPT__HOOK_____":mdHash(),
            "hooks.webpackCompileTimeHooks._____WEBPACK__COMPILE__TIME__HOOKS_____AIO__GLOBAL__HEAD__CSS__HOOK_____":mdHash(),
            "hooks.webpackCompileTimeHooks._____WEBPACK__COMPILE__TIME__HOOKS_____AIO__APP__HEAD__CSS__HOOK_____":mdHash(),
            "hooks.webpackCompileTimeHooks._____WEBPACK__COMPILE__TIME__HOOKS_____AIO__GLOBAL__PAGE__HEADER__HOOK_____":mdHash(),
            "hooks.webpackCompileTimeHooks._____WEBPACK__COMPILE__TIME__HOOKS_____AIO__GLOBAL__APP__HEADER__HOOK_____":mdHash(),
            "hooks.webpackCompileTimeHooks._____WEBPACK__COMPILE__TIME__HOOKS_____AIO__GLOBAL__BODY__HOOK_____":mdHash(),
            "hooks.webpackCompileTimeHooks._____WEBPACK__COMPILE__TIME__HOOKS_____AIO__APP__BODY__HOOK_____":mdHash(),
            "hooks.webpackCompileTimeHooks._____WEBPACK__COMPILE__TIME__HOOKS_____AIO__GLOBAL__APP__FOOTER__HOOK_____":mdHash(),
            "hooks.webpackCompileTimeHooks._____WEBPACK__COMPILE__TIME__HOOKS_____AIO__GLOBAL__PAGE__FOOTER__HOOK_____":mdHash(),
            "hooks.webpackCompileTimeHooks._____WEBPACK__COMPILE__TIME__HOOKS_____AIO__GLOBAL__FOOTER__SCRIPT__HOOK_____":mdHash(),
            "hooks.webpackCompileTimeHooks._____WEBPACK__COMPILE__TIME__HOOKS_____AIO__APP__FOOTER__SCRIPT__HOOK_____":mdHash(),
            "hooks.serverSideHooks._____SERVER__SIDE__HOOKS_____AIO__GLOBAL__HEAD__CSS__HOOK_____":mdHash(),
            "hooks.serverSideHooks._____SERVER__SIDE__HOOKS_____AIO__APP__HEAD__CSS__HOOK_____":mdHash(),
            "hooks.serverSideHooks._____SERVER__SIDE__HOOKS_____AIO__GLOBAL__PAGE__HEADER__HOOK_____":mdHash(),
            "hooks.serverSideHooks._____SERVER__SIDE__HOOKS_____AIO__GLOBAL__APP__HEADER__HOOK_____":mdHash(),
            "hooks.serverSideHooks._____SERVER__SIDE__HOOKS_____AIO__GLOBAL__BODY__HOOK_____":mdHash(),
            "hooks.serverSideHooks._____SERVER__SIDE__HOOKS_____AIO__APP__BODY__HOOK_____":mdHash(),
            "hooks.serverSideHooks._____SERVER__SIDE__HOOKS_____AIO__GLOBAL__APP__FOOTER__HOOK_____":mdHash(),
            "hooks.serverSideHooks._____SERVER__SIDE__HOOKS_____AIO__GLOBAL__PAGE__FOOTER__HOOK_____":mdHash(),
            "hooks.serverSideHooks._____SERVER__SIDE__HOOKS_____AIO__GLOBAL__FOOTER__SCRIPT__HOOK_____":mdHash(),
            "hooks.serverSideHooks._____SERVER__SIDE__HOOKS_____AIO__APP__FOOTER__SCRIPT__HOOK_____":mdHash(),
            
        }
    }
}