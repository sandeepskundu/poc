const getSiteName = async (site, appConfig, nConf, req, res, next) => {
    let appname = req.helpers.json.val(site, 'appConfig.appName', '');
    let host = req.helpers.json.val(appConfig, 'nginxConf.sites.nginxDetails.host', '');

        host = host.split('.');
        appname = appname.split('-');
        appname = appname.concat(host);

    return appname.join('_');
}

const getAppExposedInOrder = async (site, appConfig, nConf, req, res, next) => {
    let rval = {};
    let or = req.helpers.json.val(site, 'appConfig.appExposedIn');
    let order = req.helpers.json.val(nConf, 'enums.exposedInOrder', {});

    for(const a in order){
        let type = order[a];

        if(or[type]){
            rval[a] = type;
        }
    }

    return rval;
}

exports.getSiteName = getSiteName;
exports.getAppExposedInOrder = getAppExposedInOrder;