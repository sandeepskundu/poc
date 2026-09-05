const path = process.nodeModules('path');

const additional = (rv, req, res, next, appConfig) => {
    let ad = [];
  
    if (req && req.query && req.query.additional) {
        ad = req.query.additional.split(',');
    }
  
    if (ad && ad.length > 0) {
        for (let a in ad) {
            let n = ad[a];
            if (n) {
                rv[n] = appConfig[n] || '';
            }
        }
    }
  
    return rv;
};

const getConfig = async (req, res, next, type) => {
    switch(type) {
        case 'exposedEnvVars':
            return process.env;
        break;
        default:
            let url = req.helpers.json.val(req, 'appConfig.appConfig.buildDir');
            return req.helpers.file.reader.async.init(path.resolve(`./${url}/scripts/appConfig.json`), false, 'json');
    }
}

const getProps = async (req, res, next, type) => {
    let rval = {};
    let config = await getConfig(req, res, next, type);
    let props = req.helpers.json.val(req, `appConfig.${type}`, {});

    for(const a in props){
        let val = req.helpers.json.val(config, props[a]);
            rval[a] = val || ''
    }

    return rval;
}


const start = async (req, res, next) => {
    return {
        envVars:await getProps(req, res, next, 'exposedEnvVars'),
        siteporps:await getProps(req, res, next, 'exposedSiteProps')
    }
}

module.exports = start;