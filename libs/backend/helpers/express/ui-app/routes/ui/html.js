//const path = process.nodeModules('path');
const path = require('path');
const helpers = process.helpers();
const {siteprops, placeholder} = require('./utils');

const bundle = (req, res, next) => {
    let fallback = 'compressed';
    let rv = req.helpers.json.get(req, 'query.__bundle', fallback)
    let env = req.helpers.json.val(req, 'appConfig.appConfig.appEnv');
    let bundles = req.helpers.json.val(req, 'appConfig.appConfig.buildBundles', {});

    if(env === 'local') {
        return 'uncompressed';
    }else{
        return bundles[rv]?rv:fallback
    }
}


const getConfig = async (req, res, next) => {
    return {
        bundle:{
            name:bundle(req, res, next)
        },
        page:{
            name:req.helpers.json.get(req, 'params.page', '')
        },
        category:{
            name:req.helpers.json.get(req, 'params.category', '')
        }
    }
};

const rpWrt = (rp, rsp) => {
    let wrt = ['w', 'r', 'i', 't', 'e'];
        rp[wrt.join('')](rsp);
    return rp;
};

const getRespStatus = (req) => {
    let rv = 200;
    let cat = req.url.split('/');
    let map = {}//conf.env.categories;

    if (cat && cat.length >= 2 && cat[1] && map && !map[cat[1]]) {
        //rv = 404;
    }

    return rv;
};

const rpWrtH = (rp, req) => {
    let status = getRespStatus(req);
    let wrt = ['w', 'r', 'i', 't', 'e', 'H', 'e', 'a', 'd'];
        rp[wrt.join('')](status, {'Content-Type': 'text/html' });
    return rp;
};

const replaceHooks = async (htm, req, res) => {
    let hooks = await req.helpers.htmlHooks.get.details(req.appConfig, 'server');
        htm = await req.helpers.htmlHooks.replace.details(htm, req.appConfig, hooks);
    return htm;
}

module.exports = async (req, res, next) => {
        req = await req.helpers.sanitize.init(req, res, next);

    let config = await getConfig(req, res, next);
    let buildDir = req.helpers.json.val(req, 'appConfig.appConfig.buildDir');
    let url = path.resolve(`./${buildDir}/${config.bundle.name}/index.html`);
    let html = await helpers.file.reader.async.init(url);
        html = await replaceHooks(html, req, res);

    if (html) {
        let resp = await placeholder.set(req, res, html, config);
            res = await rpWrtH(res, req);
            res = await rpWrt(res, resp);
            res.end();
    }
}