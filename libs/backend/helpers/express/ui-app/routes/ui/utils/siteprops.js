const cache = require('./cache-versions');
const session = process.aioBeLibs('helpers/_private/session');

const urls = (req, res) => {
    return {
        cdnPath:req.helpers.json.val(req, 'appConfig.appConfig.cdnPath', '/'),
        cssCdnPath:req.helpers.json.val(req, 'appConfig.appConfig.cssCdnPath', '/'),
        fontsCdnPath:req.helpers.json.val(req, 'appConfig.appConfig.fontsCdnPath', '/'),
        apiBasePath:req.helpers.json.val(req, 'appConfig.appConfig.apiBasePath', '/'),
        imagesCdnPath:req.helpers.json.val(req, 'appConfig.appConfig.imagesCdnPath', '/'),
        assetsCdnPath:req.helpers.json.val(req, 'appConfig.appConfig.assetsCdnPath', '/'),
    }
}

const pageRequest = (req, res) => {
    return {
        method:req.method,
        body:req.helpers.sanitize.body(req.body ? req.body : {}),
        query:req.helpers.sanitize.body(req.query ? req.query : {})
    }
}

const pathPrefix = (req, res) => {
    let bl = req.helpers.json.val(req, 'params.balancer');
    let rv = req.helpers.json.val(req, 'appConfig.appConfig.pathPrefix');

    if(bl){
        return `${bl}/${rv}`;
    }

    return rv;
}

const appendAuth = async (rval, req) => {
    let ad = await session.authInfo(req);
    let appId = req.helpers.json.val(rval, 'appProps.appId', '');
        rval.auth = {
            login:(ad.login === 1),
            token:req.helpers.crpt.encrypt(ad, appId)
        }

    return rval;
}

const get = async (req, res, flow) => {
    return await appendAuth({
        flow:flow,
        urls:urls(req, res),
        cache:await cache.get(req, res),
        pageRequest:pageRequest(req, res),
        appProps:{
            env:process.env.appEnv || 'prod',
            pathPrefix:pathPrefix(req, res),
            gtmId:req.helpers.json.val(req, 'appConfig.appConfig.GTM_ID', ''),
            elementId:req.helpers.json.val(req, 'appConfig.appConfig.appElementId'),
            staticsDir:req.helpers.json.val(req, 'appConfig.appConfig.staticsDir', ''),
            appType:req.helpers.json.val(req, 'appConfig.appConfig.applicationType', ''),
            appId:req.helpers.json.val(req, 'appConfig.appConfig.id', req.helpers.uuid.create()),
            chunksDomainPlaceholder:req.helpers.json.val(req, 'appConfig.appConfig.chunksDomainPlaceholder', ''),
            chunksDomainPlaceholderKey:'__CHUNK__PLACEHOLDER__WILL__BE__REPLACE__HERE__'
        },
    }, req);
}

exports.get = get;