const get = async (req) => {
    const params = req.helpers.json.val(req, 'params', {});
    const list = [
        req.helpers.json.val(params, 'balancer', ''),
        req.helpers.json.val(req, 'appConfig.appConfig.pathPrefix', ''),
        req.helpers.json.val(params, 'appController', ''),
        req.helpers.json.val(params, 'controllerAction', ''),
        req.helpers.json.val(params, 'actionVersion', ''),
        req.helpers.json.val(params, 'versionJob', ''),
        req.helpers.json.val(params, 'jobMethod', '')
    ]

    return req.helpers.crypto.md5(`${list.join('')}`);
}

exports.get = get;