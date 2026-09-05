const utils = require('./../../../configs');
const compEngine = require('./comp-engine');

const preBuildApps = {
    irms:require('./irms'),
    irmsui:require('./irms-ui'),
    mkUi:require('./mk-ui'),
    mkApi:require('./mk-api'),
    tdcdb:require('./tdc.db'),
    tdcApi:require('./tdc-api'),
    tdcCms:require('./tdc-cms'),
    authGate:require('./auth-gate'),
    tdcDevops:require('./tdc-devops'),
    tdcBackend:require('./tdc-backend'),
    insiderUi:require('./insider-ui'),
    compEngine:require('./comp-engine'),
    insiderCdn:require('./insider-cdn'),
    propsEngine:require('./props-engine'),
    tdcFrontend:require('./tdc-frontend'),
    tdcDesignSystem:require('./tdc-design-system'),
}

const marchantToken = async (appConfig, req, res, next) => {
    const appId = req.helpers.json.val(appConfig, 'appInfo.appId');
    const token = {
        code:'AIOCART',
        id:'672cac644a0dded765b5c3b2',
        MERCHANT_AUTH_TOKEN:'',
        MERCHANT_SIGNATURE_TOKEN:'672cad500708cfd3c307e88f',
        MERCHANT_APP_ENVIRONMENT:'local'
    }
    /*--const token = {
        code:'AIOCART',
        id:req.helpers.json.val(req, 'envProps.MERCHANT_ID'),
        MERCHANT_AUTH_TOKEN:req.helpers.json.val(req, 'envProps.MERCHANT_AUTH_TOKEN'),
        MERCHANT_SIGNATURE_TOKEN:req.helpers.json.val(req, 'envProps.MERCHANT_SIGNATURE_TOKEN'),
        MERCHANT_APP_ENVIRONMENT:req.helpers.json.val(req, 'envProps.MERCHANT_APP_ENVIRONMENT')
    }--*/

    return req.helpers.jwt.sign(token, appId);
}

const tokens =  async (appConfig, req, res, next) => {
    return {
        marchant:await marchantToken(appConfig, req, res, next)
    }
}

const getCategory = async (appConfig, req, res, next) => {
    const cate = req.helpers.json.val(appConfig, 'category', 'ui');
    return req.helpers.json.val(utils, `applicationsCategories.${cate}`, 'frontend');
}

const getCommonConfig = async (appConfig, req, res, next) => {
    appConfig.tokens = await tokens(appConfig, req, res, next);
    appConfig.category = await getCategory(appConfig, req, res, next)

    return appConfig;
}

const appConfigById = async (req, res, next) => {
    const resp = await req.helpers.s2s.internal.init({
        name:'1',
        request:{
            params:{
                appId:req.helpers.json.val(req, 'params.id')
            },
            url:'/tdc-api/appDetails/details/v1/getDetailsById/fetch/:_appId_:'
        }
    }, req, res, next);

    const status = req.helpers.json.val(resp, 'resp.status');
    const result = req.helpers.json.val(resp, 'resp.data.data.result', []);

    if(status === 200 || status === '200' && result[0]){
        return await getCommonConfig(result[0], req, res, next);
    }else{
        let preBuild = req.helpers.json.val(req, 'params.subId');

        if(preBuild && preBuildApps[preBuild]){
            return await getCommonConfig(req.helpers.json.copy(preBuildApps[preBuild]), req, res, next);
        }else{
            return {};
        }        
    }
}


const getAppConfigById = async (req, res, next) => {
    const conf = await appConfigById(req, res, next);
    const category = req.helpers.json.val(conf, 'category', '');

    switch(category) {
        case 'frontend':
            return await req.helpers.devops.builder.utils.frontend.app.getAppConfigs(conf, req, res, next);
        break;
        case 'backend':
            return await req.helpers.devops.builder.utils.backend.app.getAppConfigs(conf, req, res, next);
        break;
        default:
            return null
    }

}

exports.getAppConfigById = getAppConfigById;
exports.appConfigById = appConfigById;

//exports.getCommonConfig = getCommonConfig;