const utils = require('utils');
const helpers = require('helpers');

const getCategory = () => {
    return helpers.json.val(utils, "configs.applicationsCategories.backend", 'backend');
}

const getBaseConfig = (body, req, res, next) => {
    return {
        category:getCategory(),
        appName:req.helpers.json.val(body, 'appName'),
        appConfig:{
            scriptDir:'scripts',
            applicationType:'express',
            srcDir:'src',
            cdnPath:'/',
            cssCdnPath:'/',
            apiBasePath:'/',
            fontsCdnPath:'/',
            imagesCdnPath:'/',
            assetsCdnPath:'/',
            APP_ENV:'prod',
            INSPECT_AT:21,
            NO_OF_INSTANCES:1,
            category:getCategory(),
            appName:req.helpers.json.val(body, 'appName')
        },

        appInfo:{
            author:"",
            version:"",
            description:"",
            appId:'6738829afbe779c7746626aa'
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
