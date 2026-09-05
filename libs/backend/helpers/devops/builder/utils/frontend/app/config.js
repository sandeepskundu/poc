const getBaseConfig = async (appConfig, req, res, next) => {
    const base = {
        htmlPlaceholders:{
            '__AIO__APP__CHUNKS__DOMAIN__PLACEHOLDER__':{
                fallback:'/',
                node:"appConfig.cdnPath"
            }
        },
        webpackConfigs:{
            libsDirsMapConfig:{
                "aio-global-raw-ui":{
                    "destPrefix":"ui-libs",
                    "orgDir":"ui/raw",
                    "destDir":"ui-libs/raw",
                    "storybook":{
                        "replaceAliasPath":{
                            "to":"aio-global-raw-ui/",
                            "from":"aio-global-raw-ui/raw/"
                        }
                    }
                },
                "aio-global-ui":{
                    "destPrefix":"ui-libs",
                    "orgDir":"ui/components",
                    "destDir":"ui-libs/components",
                    "storybook":{
                        "replaceAliasPath":{
                            "to":"aio-global-ui/",
                            "from":"aio-global-ui/components/"
                        }
                    },
                },
                "aio-global-ui-category":{
                    "destPrefix":"ui-libs",
                    "orgDir":"ui/categories",
                    "destDir":"ui-libs/categories",
                    "storybook":{
                        "replaceAliasPath":{
                            "to":"aio-global-ui-category/",
                            "from":"aio-global-ui-category/categories/"
                        }
                    },
                }
            }
        },
        category:req.helpers.json.val(appConfig, 'category'),
        appName:req.helpers.json.val(appConfig, 'appName'),
        scssConfig:{
            hasTheme:true,
            hasDesignSystem:true,
            scssDir:'scss',
            fontsDir:'fonts',
            imagesDir:'images',
            themesDir:'themes',
            staticsDir:'statics',
            themeColorDir:'theme-colors',
            designSystemDir:'dsystem',
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
        appConfig:{
            alias:{},
            entries:{},
            srcDir:'src',
            buildDir:'build',
            fontsDir:'fonts',
            imagesDir:'images',
            scrapeDir:'scrap',
            scriptDir:'scripts',
            iconFontsDir:'icons',
            applicationType:'ui',
            staticsDir:'statics',
            appScriptsDir:'scripts',
            compress:true,
            appWebCacheVersion:"0001",
            appWebCacheTime:"2d",
            cdnPath:'/',
            cssCdnPath:'/',
            apiBasePath:'/',
            fontsCdnPath:'/',
            imagesCdnPath:'/',
            assetsCdnPath:'/',

            buildBundles:{
                'compressed':true,
                'uncompressed':true
            },

            languages:{
                'en':true
            },

            defaultCategory:'home',
            viewTypes:['desktop', 'mobile', 'tablet'],
            chunksDomainPlaceholder:"__AIO__APP__CHUNKS__DOMAIN__PLACEHOLDER__",
            componentType:['atoms', 'constants', 'molecules', 'organisms', 'pages', 'templates', 'widgets'],
            appEnv:'prod',
            gtmId:"GTM-P4B934N",
            category:req.helpers.json.val(appConfig, 'category'),
            appName:req.helpers.json.val(appConfig, 'appName', ''),
            copyStaticsDirInBuild:['fonts', 'images', 'icons'],
            "authConfigs": {
                "expiry": {
                    "auth": "30D",
                    "session": "365D"
                },
                "cookies": {
                    "authToken": "ssoToken",
                    "refreshToken": "refreshoken",
                    "windowSession": "wsToken"
                },
                "secrets": {
                    "jwt": "JWTSESSIONAIOFOUNDATIONJWTSESSION",
                    "crypto": "CRYPTOSESSIONAIOFOUNDATIONCRYPTOSESSION"
                },
                "encription": {
                    "data": "ATHKEYAIOFOUNDATIONAUTHKEY"
                },
                "controller": {
                    "name": "emps"
                },
                "collection": {
                    "name": "emps"
                }
            }
        },
        packageJson:{
            scripts: {},
            dependencies:{},
            _moduleAliases:{},
            devDependencies:{},
        }, 
        appInfo:{
            author:"",
            version:"",
            description:"",
            appId:'6738829afbe779c7746626aa'
        },
        hooksKeyNames:{
            '_____AIO__GLOBAL__HEAD__CSS__HOOK_____':"",
            '_____AIO__APP__HEAD__CSS__HOOK_____':'',
            '_____AIO__GLOBAL__PAGE__HEADER__HOOK_____':'',
            '_____AIO__GLOBAL__APP__HEADER__HOOK_____':'',
            '_____AIO__GLOBAL__BODY__HOOK_____':'',
            '_____AIO__APP__BODY__HOOK_____':'',
            '_____AIO__GLOBAL__APP__FOOTER__HOOK_____':'',
            '_____AIO__GLOBAL__PAGE__FOOTER__HOOK_____':'',
            '_____AIO__GLOBAL__FOOTER__SCRIPT__HOOK_____':'',
            '_____AIO__APP__FOOTER__SCRIPT__HOOK_____':''
        },
        hooks:{
            appCreateTimeHooks:{
                '_____APP__CREATE__TIME__HOOKS_____AIO__GLOBAL__HEAD__CSS__HOOK_____':`
                <link rel="stylesheet" href="http://localhost:2200/insider-cdn/statics/css/cdn/bundles/dsystem/base.css"/>
                <link rel="stylesheet" href="http://localhost:2200/insider-cdn/statics/css/cdn/bundles/theme-colors/base.css"/>
                <link rel="stylesheet" href="http://localhost:2200/insider-cdn/statics/css/cdn/bundles/themes/base.css"/>
                <link rel="stylesheet" href="http://localhost:2200/insider-cdn/statics/css/cdn/bundles/icons/g.css" />
                `,
                '_____APP__CREATE__TIME__HOOKS_____AIO__APP__HEAD__CSS__HOOK_____':'',
                '_____APP__CREATE__TIME__HOOKS_____AIO__GLOBAL__PAGE__HEADER__HOOK_____':'',
                '_____APP__CREATE__TIME__HOOKS_____AIO__GLOBAL__APP__HEADER__HOOK_____':'',
                '_____APP__CREATE__TIME__HOOKS_____AIO__GLOBAL__BODY__HOOK_____':'',
                '_____APP__CREATE__TIME__HOOKS_____AIO__APP__BODY__HOOK_____':'<div id="____APP__ELMEMENT__ID____"></div>',
                '_____APP__CREATE__TIME__HOOKS_____AIO__GLOBAL__APP__FOOTER__HOOK_____':'',
                '_____APP__CREATE__TIME__HOOKS_____AIO__GLOBAL__PAGE__FOOTER__HOOK_____':'',
                '_____APP__CREATE__TIME__HOOKS_____AIO__GLOBAL__FOOTER__SCRIPT__HOOK_____':`<script type="text/javascript">window._siteProps_ = window._siteProps_ || {};</script>`,
                '_____APP__CREATE__TIME__HOOKS_____AIO__APP__FOOTER__SCRIPT__HOOK_____':`<script type="text/javascript">(() => {
                    window._siteProps_ = _siteProps_ || {};
                    window._siteProps_ = {...window._siteProps_, ...__RUN__TIME__SITEPROPS__};
                })();</script>`
            },
            webpackCompileTimeHooks:{
                '_____WEBPACK__COMPILE__TIME__HOOKS_____AIO__GLOBAL__HEAD__CSS__HOOK_____':"",
                '_____WEBPACK__COMPILE__TIME__HOOKS_____AIO__APP__HEAD__CSS__HOOK_____':'',
                '_____WEBPACK__COMPILE__TIME__HOOKS_____AIO__GLOBAL__PAGE__HEADER__HOOK_____':'',
                '_____WEBPACK__COMPILE__TIME__HOOKS_____AIO__GLOBAL__APP__HEADER__HOOK_____':'',
                '_____WEBPACK__COMPILE__TIME__HOOKS_____AIO__GLOBAL__BODY__HOOK_____':'',
                '_____WEBPACK__COMPILE__TIME__HOOKS_____AIO__APP__BODY__HOOK_____':'',
                '_____WEBPACK__COMPILE__TIME__HOOKS_____AIO__GLOBAL__APP__FOOTER__HOOK_____':'',
                '_____WEBPACK__COMPILE__TIME__HOOKS_____AIO__GLOBAL__PAGE__FOOTER__HOOK_____':'',
                '_____WEBPACK__COMPILE__TIME__HOOKS_____AIO__GLOBAL__FOOTER__SCRIPT__HOOK_____':'',
                '_____WEBPACK__COMPILE__TIME__HOOKS_____AIO__APP__FOOTER__SCRIPT__HOOK_____':''
            },
            serverSideHooks:{
                '_____SERVER__SIDE__HOOKS_____AIO__GLOBAL__HEAD__CSS__HOOK_____':"",
                '_____SERVER__SIDE__HOOKS_____AIO__APP__HEAD__CSS__HOOK_____':'',
                '_____SERVER__SIDE__HOOKS_____AIO__GLOBAL__PAGE__HEADER__HOOK_____':'',
                '_____SERVER__SIDE__HOOKS_____AIO__GLOBAL__APP__HEADER__HOOK_____':'',
                '_____SERVER__SIDE__HOOKS_____AIO__GLOBAL__BODY__HOOK_____':'',
                '_____SERVER__SIDE__HOOKS_____AIO__APP__BODY__HOOK_____':'',
                '_____SERVER__SIDE__HOOKS_____AIO__GLOBAL__APP__FOOTER__HOOK_____':'',
                '_____SERVER__SIDE__HOOKS_____AIO__GLOBAL__PAGE__FOOTER__HOOK_____':'',
                '_____SERVER__SIDE__HOOKS_____AIO__GLOBAL__FOOTER__SCRIPT__HOOK_____':'',
                '_____SERVER__SIDE__HOOKS_____AIO__APP__FOOTER__SCRIPT__HOOK_____':''
            }
        }
    }

    return req.helpers.json.merge(base, appConfig);
}

const getAppConfigs = async (appConf, req, res, next) => {
    return await getBaseConfig(appConf, req, res, next);
}

exports.getBaseConfig = getBaseConfig;
exports.getAppConfigs = getAppConfigs;