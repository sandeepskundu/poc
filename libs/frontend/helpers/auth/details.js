const crpt = require('./../crpt');
const json = require('./../json');
const sprops = require('./../siteProps');

const get = (arg) => {
    let sp = sprops.get(arg);
    let token = json.val(sp, 'auth.token', '');
    let appId = json.val(sp, 'appProps.appId');
    return crpt.decrypt(token, appId);
}

exports.get = get;