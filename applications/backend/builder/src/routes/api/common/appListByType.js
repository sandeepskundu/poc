const appDetails = async (req, appDir, appList) => {
    let rval = {};

    if(appList && appList.length > 0){
        for(const a in appList){
            let p = `${appDir}/${appList[a]}/build/scripts/appConfig.json`;
            let ad = await req.helpers.file.reader.async.init(p, false, 'json');
                rval[a] = req.helpers.json.val(ad, 'appInfo', {});
        }
    }

    return rval;
}

const apps =  async (req, res, next) => {
    let appType = await req.helpers.json.val(req, 'params.appType');
    let appDir = await req.utils.common.path.getApplicationsDirPath();
    let appList = await req.helpers.file.reader.async.dirs(`${appDir}/${appType}`);
    let resp = await appDetails(req, `${appDir}/${appType}`, appList);
        req.helpers.express.response.send('json', resp, 200, req, res, next);
}; 

module.exports = apps;