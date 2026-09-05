const utils = require('utils');
const helpers = require('helpers');

const getCategory = () => {
    return helpers.json.val(utils, "configs.applicationsCategories.frontend", 'frontend');
}

const getBaseConfig = (body, req, res, next) => {
    return {
        htmlPlaceholders:{
            '__AIO__APP__CHUNKS__DOMAIN__PLACEHOLDER__':{
                node:"appConfig.cdnPath",
                fallback:'/'
            }
        },
        webpackConfigs:{
            libsDirsMapConfig:{
                "aio-global-ui":{
                    "orgDir":"ui/components",
                    "destDir":"ui-libs/components",
                },
                "aio-global-ui-category":{
                    "orgDir":"ui/categories",
                    "destDir":"ui-libs/categories"
                }
            }
        },
        category:getCategory(),
        appName:req.helpers.json.val(body, 'appName'),
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

            APP_ENV:'prod',
            INSPECT_AT:21,
            NO_OF_INSTANCES:1,
            GTM_ID:"GTM-P4B934N",
            category:getCategory(),
            appName:req.helpers.json.val(body, 'appName', ''),
            copyStaticsDirInBuild:['fonts', 'images', 'icons'],
            PORT:(Math.floor(Math.random() * 7999) + 1000),
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
                <link rel="stylesheet" href="/cdn/statics/css/cdn/bundles/dsystem/base.css"/>
                <link rel="stylesheet" href="/cdn/statics/css/cdn/bundles/theme-colors/base.css"/>
                <link rel="stylesheet" href="/cdn/statics/css/cdn/bundles/themes/base.css"/>
                <link rel="stylesheet" href="/cdn/statics/css/cdn/bundles/icons/g.css" />
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
        },
        exposedSiteProps:{
            appEnv:"appConfig.APP_ENV",
            appType:"appConfig.applicationType",
            fontsCdnPath:"appConfig.fontsCdnPath",
            pathPrefix:"appConfig.pathPrefix",
            imagesCdnPath:"appConfig.imagesCdnPath",
            assetsCdnPath:"appConfig.assetsCdnPath",
            apiBasePath:"appConfig.apiBasePath",
            appWebCacheTime:"appConfig.appWebCacheTime",
            appWebCacheVersion:"appConfig.appWebCacheVersion"
        },

        runtimeEnvsBeCanUpdate:{
            "appConfig.cdnPath":true,
            "appConfig.cssCdnPath":true,
            "appConfig.apiBasePath":true,
            "appConfig.fontsCdnPath":true,
            "appConfig.imagesCdnPath":true,
            "appConfig.assetsCdnPath":true,
            "appConfig.appWebCacheTime":true,
            "appConfig.appWebCacheVersion":true,
            "appConfig.NO_OF_INSTANCES":true,
        },

        runtimeSitePropsCanBeUpdate:{
            "appConfig.cdnPath":true,
            "appConfig.cssCdnPath":true,
            "appConfig.apiBasePath":true,
            "appConfig.fontsCdnPath":true,
            "appConfig.imagesCdnPath":true,
            "appConfig.assetsCdnPath":true,
            "appConfig.appWebCacheTime":true,
            "appConfig.appWebCacheVersion":true,
            "appConfig.NO_OF_INSTANCES":true,
        }
    }
}

const getAppConfigs = async (req, res, next) => {
    let body = req.helpers.json.val(req, 'body', {});
    let base = getBaseConfig(body, req, res, next);
        body.category = getCategory();

        return await req.utils.common.app.config.getCommonConfig(req.helpers.json.merge(base, body), req, res, next);
}

exports.getCategory = getCategory;
exports.getBaseConfig = getBaseConfig;
exports.getAppConfigs = getAppConfigs;
