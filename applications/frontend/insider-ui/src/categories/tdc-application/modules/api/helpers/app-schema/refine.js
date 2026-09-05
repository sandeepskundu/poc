import helpers from 'ui-helpers';

const map = {
    "ui":{
        "dbConfigs":true, 
    },
    "common":{
        "vd":true,
        "hashId":true,
        "portHashId":true,
        "partnerPortHashId":true,
        "internalPortHashId":true,
        "schedulerPortHashId":true,
    },
    "api":{
        "hooks":true,
        "scssConfig":true,
        "hooksKeyNames":true,
        "appConfig.alias":true,
        "appConfig.gtmId":true,
        "appConfig.entries":true,
        "appConfig.cdnPath": true,
        "appConfig.fontsDir": true,
        "appConfig.imagesDir": true,
        "appConfig.cssCdnPath": true,
        "appConfig.apiBasePath": true,
        "appConfig.iconFontsDir": true,
        "appConfig.fontsCdnPath": true,
        "appConfig.imagesCdnPath": true,
        "appConfig.assetsCdnPath": true,
        "appConfig.defaultCategory": true,
        "appConfig.appWebCacheTime": true,
        "appConfig.appWebCacheVersion": true,
        "appConfig.chunksDomainPlaceholder": true,
        "appConfig.buildBundles.compressed": true,
        "appConfig.buildBundles.uncompressed": true
    }
}

const refine = (arg) => {
    let rval = helpers.json.copy(arg);
    let cate = helpers.json.val(arg, 'category', '');
    let app = helpers.json.val(map, cate, {})
    let common = helpers.json.val(map, 'common', {});
    let wanted = {...common, ...app};
    

    for(const a in wanted){
        if(wanted[a]){
            helpers.json.remove(rval, a)
        }
    }

    return rval;
}

const init = (arg) => {
    return {
        request:{
            data:refine(arg),
            params:{
                appId:helpers.json.val(arg, 'vd.id')
            }
        }
    }
}

export default {
    init:init
}