const key = ['M', 'E', 'R', 'C', 'H', 'A', 'N', 'T', '_', 'T', 'O', 'K', 'E', 'N'].join('');

const details = (req) => {
    let appId = req.helpers.json.val(req, 'appConfig.appInfo.appId', '')
    let token = req.helpers.json.val(process.env, key, appId);

        return req.helpers.jwt.verify(token, appId);
}

exports.details = details;