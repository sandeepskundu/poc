const utils = require('./utils');

const getSiteProps = async (req, res, next, app) => {
    let url = await utils.sitePropsPath(req, res, next);
        return await req.helpers.file.reader.async.init(url, false, 'json');
}

const writeSiteProps = async (req, res, next, app, siteProps) => {
    let url = await utils.sitePropsPath(req, res, next);
        await req.helpers.express.appConfig.parse(app, siteProps);
        await req.helpers.file.writer.async.write(url, JSON.stringify(siteProps, null, 4));
}

const getUpdatedSiteProps = async (siteProps, req, res, next) => {
        let rval = {};
        let sProp = req.helpers.json.val(siteProps, 'runtimeSitePropsCanBeUpdate');

        for(const a in sProp){
            let val = req.helpers.json.val(req.body, a);

            if(val != null){
                rval = req.helpers.json.set(rval, a, val, false, true);
            }
        }

        return req.helpers.json.merge(siteProps, rval);
}

module.exports = async (req, res, next, app) => {
    let siteProps = await getSiteProps(req, res, next);
        siteProps = await getUpdatedSiteProps(siteProps, req, res, next);
        siteProps = await writeSiteProps(req, res, next, app, siteProps);
        req.helpers.express.response.send('json', {
            "status": true,
            "message": "configuration update sucessfully"
        }, 200, req, res, next);
}