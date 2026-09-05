

const validation = process.aioBeLibs('helpers/_private/utils/validations');

const mdHash = async (req) => {
    return await validation.build(req, 'universal.hashId', {
        "checks":{
            "required":{
                "value":"optional"
            }
        }
    });
};

const object = async (req) => {
    return await validation.build(req, 'universal.require', {
        "message":{
            "error":{
                "checks":{
                    "object":"Html placeholders can have only object values",
                }
            }
        },
        "checks":{
            "object":{
                "value":'required'
            },
            "required":{
                "value":"optional"
            }
        }
    })
}

const webcache = async (req) => {
    return await validation.build(req, 'universal.require', {
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
                "value":'^[a-z0-9]+$'
            },
            "required":{
                "value":"optional"
            }
        }
    })
}

const url = async (req) => {
    return await validation.build(req, 'universal.require', {
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
                "value":'required'
            },
            "required":{
                "value":"optional"
            }
        }
    })
}

module.exports = async (rval, req, type) => {
    let rv = req.helpers.json.merge(rval, {
        "htmlPlaceholders":await object(req),
        "appConfig.alias":await object(req),
        "appConfig.entries":await object(req),
        "appConfig.cdnPath":await url(req),
        "appConfig.cssCdnPath":await url(req),
        "appConfig.apiBasePath":await url(req),
        "appConfig.fontsCdnPath":await url(req),
        "appConfig.imagesCdnPath":await url(req),
        "appConfig.assetsCdnPath":await url(req),
        "appConfig.appWebCacheTime":await webcache(req),
        "appConfig.appWebCacheVersion":await webcache(req),
        "scssConfig.additionalData":await object(req),
        "scssConfig.additionalDataMap":await object(req),
        "webpackConfigs.libsDirsMapConfig":await object(req),
        "scssConfig.hasTheme":await validation.build(req, 'universal.boolean'),
        "scssConfig.hasDesignSystem":await validation.build(req, 'universal.boolean'),
        "appConfig.buildBundles.compressed":await validation.build(req, 'universal.boolean'),
        "appConfig.buildBundles.uncompressed":await validation.build(req, 'universal.boolean'),
        "hooksKeyNames._____AIO__GLOBAL__HEAD__CSS__HOOK_____":await mdHash(req),
        "hooksKeyNames._____AIO__APP__HEAD__CSS__HOOK_____":await mdHash(req),
        "hooksKeyNames._____AIO__GLOBAL__PAGE__HEADER__HOOK_____":await mdHash(req),
        "hooksKeyNames._____AIO__GLOBAL__APP__HEADER__HOOK_____":await mdHash(req),
        "hooksKeyNames._____AIO__GLOBAL__BODY__HOOK_____":await mdHash(req),
        "hooksKeyNames._____AIO__APP__BODY__HOOK_____":await mdHash(req),
        "hooksKeyNames._____AIO__GLOBAL__APP__FOOTER__HOOK_____":await mdHash(req),
        "hooksKeyNames._____AIO__GLOBAL__PAGE__FOOTER__HOOK_____": mdHash(req),
        "hooksKeyNames._____AIO__GLOBAL__FOOTER__SCRIPT__HOOK_____":await mdHash(req),
        "hooksKeyNames._____AIO__APP__FOOTER__SCRIPT__HOOK_____":await mdHash(req),
        "hooks.appCreateTimeHooks._____APP__CREATE__TIME__HOOKS_____AIO__GLOBAL__HEAD__CSS__HOOK_____":await mdHash(req),
        "hooks.appCreateTimeHooks._____APP__CREATE__TIME__HOOKS_____AIO__APP__HEAD__CSS__HOOK_____":await mdHash(req),
        "hooks.appCreateTimeHooks._____APP__CREATE__TIME__HOOKS_____AIO__GLOBAL__PAGE__HEADER__HOOK_____": mdHash(req),
        "hooks.appCreateTimeHooks._____APP__CREATE__TIME__HOOKS_____AIO__GLOBAL__APP__HEADER__HOOK_____":await mdHash(req),
        "hooks.appCreateTimeHooks._____APP__CREATE__TIME__HOOKS_____AIO__GLOBAL__BODY__HOOK_____":await mdHash(req),
        "hooks.appCreateTimeHooks._____APP__CREATE__TIME__HOOKS_____AIO__APP__BODY__HOOK_____":await mdHash(req),
        "hooks.appCreateTimeHooks._____APP__CREATE__TIME__HOOKS_____AIO__GLOBAL__APP__FOOTER__HOOK_____":await mdHash(req),
        "hooks.appCreateTimeHooks._____APP__CREATE__TIME__HOOKS_____AIO__GLOBAL__PAGE__FOOTER__HOOK_____":await mdHash(req),
        "hooks.appCreateTimeHooks._____APP__CREATE__TIME__HOOKS_____AIO__GLOBAL__FOOTER__SCRIPT__HOOK_____":await mdHash(req),
        "hooks.appCreateTimeHooks._____APP__CREATE__TIME__HOOKS_____AIO__APP__FOOTER__SCRIPT__HOOK_____":await mdHash(req),
        "hooks.webpackCompileTimeHooks._____WEBPACK__COMPILE__TIME__HOOKS_____AIO__GLOBAL__HEAD__CSS__HOOK_____":await mdHash(req),
        "hooks.webpackCompileTimeHooks._____WEBPACK__COMPILE__TIME__HOOKS_____AIO__APP__HEAD__CSS__HOOK_____":await mdHash(req),
        "hooks.webpackCompileTimeHooks._____WEBPACK__COMPILE__TIME__HOOKS_____AIO__GLOBAL__PAGE__HEADER__HOOK_____":await mdHash(req),
        "hooks.webpackCompileTimeHooks._____WEBPACK__COMPILE__TIME__HOOKS_____AIO__GLOBAL__APP__HEADER__HOOK_____":await mdHash(req),
        "hooks.webpackCompileTimeHooks._____WEBPACK__COMPILE__TIME__HOOKS_____AIO__GLOBAL__BODY__HOOK_____":await mdHash(req),
        "hooks.webpackCompileTimeHooks._____WEBPACK__COMPILE__TIME__HOOKS_____AIO__APP__BODY__HOOK_____":await mdHash(req),
        "hooks.webpackCompileTimeHooks._____WEBPACK__COMPILE__TIME__HOOKS_____AIO__GLOBAL__APP__FOOTER__HOOK_____":await mdHash(req),
        "hooks.webpackCompileTimeHooks._____WEBPACK__COMPILE__TIME__HOOKS_____AIO__GLOBAL__PAGE__FOOTER__HOOK_____":await mdHash(req),
        "hooks.webpackCompileTimeHooks._____WEBPACK__COMPILE__TIME__HOOKS_____AIO__GLOBAL__FOOTER__SCRIPT__HOOK_____":await mdHash(req),
        "hooks.webpackCompileTimeHooks._____WEBPACK__COMPILE__TIME__HOOKS_____AIO__APP__FOOTER__SCRIPT__HOOK_____":await mdHash(req),
        "hooks.serverSideHooks._____SERVER__SIDE__HOOKS_____AIO__GLOBAL__HEAD__CSS__HOOK_____":await mdHash(req),
        "hooks.serverSideHooks._____SERVER__SIDE__HOOKS_____AIO__APP__HEAD__CSS__HOOK_____":await mdHash(req),
        "hooks.serverSideHooks._____SERVER__SIDE__HOOKS_____AIO__GLOBAL__PAGE__HEADER__HOOK_____":await mdHash(req),
        "hooks.serverSideHooks._____SERVER__SIDE__HOOKS_____AIO__GLOBAL__APP__HEADER__HOOK_____":await mdHash(req),
        "hooks.serverSideHooks._____SERVER__SIDE__HOOKS_____AIO__GLOBAL__BODY__HOOK_____":await mdHash(req),
        "hooks.serverSideHooks._____SERVER__SIDE__HOOKS_____AIO__APP__BODY__HOOK_____":await mdHash(req),
        "hooks.serverSideHooks._____SERVER__SIDE__HOOKS_____AIO__GLOBAL__APP__FOOTER__HOOK_____":await mdHash(req),
        "hooks.serverSideHooks._____SERVER__SIDE__HOOKS_____AIO__GLOBAL__PAGE__FOOTER__HOOK_____":await mdHash(req),
        "hooks.serverSideHooks._____SERVER__SIDE__HOOKS_____AIO__GLOBAL__FOOTER__SCRIPT__HOOK_____":await mdHash(req),
        "hooks.serverSideHooks._____SERVER__SIDE__HOOKS_____AIO__APP__FOOTER__SCRIPT__HOOK_____":await mdHash(req)
    });

    if(type === 'update'){
        rv = req.helpers.json.merge(rv, {
            "appConfig.apiBasePath":await validation.build(req, 'universal.require', {}),
            "appConfig.appWebCacheTime":await validation.build(req, 'universal.require', {}),
            "appConfig.appWebCacheVersion":await validation.build(req, 'universal.require', {}),
            "appConfig.assetsCdnPath":await validation.build(req, 'universal.require', {}),
            "appConfig.cdnPath":await validation.build(req, 'universal.require', {}),
            "appConfig.cssCdnPath":await validation.build(req, 'universal.require', {}),
            "appConfig.fontsCdnPath":await validation.build(req, 'universal.require', {}),
            "appConfig.imagesCdnPath":await validation.build(req, 'universal.require', {}),
            "appConfig.appScriptsDir":await validation.build(req, 'universal.require', {}),
            "appConfig.buildDir":await validation.build(req, 'universal.require', {}),
            "appConfig.chunksDomainPlaceholder":await validation.build(req, 'universal.require', {}),
            "appConfig.defaultCategory":await validation.build(req, 'universal.require', {}),
            "appConfig.fontsDir":await validation.build(req, 'universal.require', {}),
            "appConfig.gtmId":await validation.build(req, 'universal.require', {}),
            "appConfig.iconFontsDir":await validation.build(req, 'universal.require', {}),
            "appConfig.imagesDir":await validation.build(req, 'universal.require', {}),
            "appConfig.scriptDir":await validation.build(req, 'universal.require', {}),
            "appConfig.srcDir":await validation.build(req, 'universal.require', {}),
            "appConfig.staticsDir":await validation.build(req, 'universal.require', {}),
            "scssConfig.designSystemDir":await validation.build(req, 'universal.require', {}),
            "scssConfig.fontsDir":await validation.build(req, 'universal.require', {}),
            "scssConfig.imagesDir":await validation.build(req, 'universal.require', {}),
            "scssConfig.scssDir":await validation.build(req, 'universal.require', {}),
            "scssConfig.staticsDir":await validation.build(req, 'universal.require', {}),
            "scssConfig.themeColorDir":await validation.build(req, 'universal.require', {}),
            "scssConfig.themesDir":await validation.build(req, 'universal.require', {})
        });
    }

    return rv;
}