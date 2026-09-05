const path = require('path');
const uH = require('./helpers');

const bundle = (req) => {
    let fallback = 'compressed';
    let env = req.helpers.json.val(req, 'appConfig.appConfig.appEnv');
    let rv = req.helpers.url.query((req.headers.referer || ''), '__bundle');
    let bundles = req.helpers.json.val(req, 'appConfig.appConfig.buildBundles', {});
        rv = (rv || fallback);

    if(env === 'local') {
        return 'uncompressed';
    }else{
        return bundles[rv]?rv:fallback
    }
}

module.exports = async (req, res, next) => {  
    let b = await bundle(req);
    let buildDir = req.helpers.json.val(req, 'appConfig.appConfig.buildDir');
    await uH.sendFile(path.resolve(`./${buildDir}/${b}${req.path}`), req, res);
}