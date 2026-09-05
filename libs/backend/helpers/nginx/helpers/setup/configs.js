const path = require('path');

const root = () => {
   return  path.resolve('/Users/30057943/Documents/LIB/Personal/poc/applications/frontend/kundu', 'nginx')
}

const base = {
    enums:{
        exposedInOrder:{
            0:'internal',
            1:'partner',
            10:'public'
        },
        locationProxyDir:'location-proxy'
    },
    dirs:{
        rootDir:root(),
        logs:{
            root:`${root()}/logs`,
            app:`${root()}/logs/apps`,
            error:`${root()}/logs/error`,
            access:`${root()}/logs/access`
        },
        htmlDir:`${root()}/html`,
        upstream:`${root()}/upstream`,
        defaultConfigs:`${root()}/conf.d`,
        sitesEnabled:`${root()}/sites-enabled`
    }
}

const get = async (configs, req, res, next) => {
    return req.helpers.json.copy(base);
}

exports.get = get;