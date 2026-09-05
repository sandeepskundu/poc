const { controller } = require("../../../../../express/api-app/routes");

const getBaseConfig = (appConfig, req, res, next) => {
    const base = {
        category:req.helpers.json.val(appConfig, 'category'),
        appName:req.helpers.json.val(appConfig, 'appName'),
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
            appEnv:'local',
            appName:req.helpers.json.val(appConfig, 'appName'),
            category:req.helpers.json.val(appConfig, 'category'),
            authConfigs:{
                expiry:{
                    auth:'30D',
                    session:'365D'
                },
                cookies:{
                    authToken:'ssoToken',
                    refreshToken:'refreshoken',
                    windowSession:'wsToken',
                },
                secrets:{
                    jwt:'JWTSESSIONAIOFOUNDATIONJWTSESSION',
                    crypto:'CRYPTOSESSIONAIOFOUNDATIONCRYPTOSESSION'
                },
                encription:{
                    data:'ATHKEYAIOFOUNDATIONAUTHKEY'
                },
                controller:{
                    name:'emps'
                },
                collection:{
                    name:'emps'
                }
            }
        },
        appInfo:{
            author:"",
            version:"",
            description:"",
            appId:'6738829afbe779c7746626aa'
        }
    }

    return req.helpers.json.merge(base, appConfig);
}

const getAppConfigs = async (appConf, req, res, next) => {
    return await getBaseConfig(appConf, req, res, next);
}

exports.getBaseConfig = getBaseConfig;
exports.getAppConfigs = getAppConfigs;
