const json = require('./../json');
const crpJs = require('node-modules/crypto-js');

const key = (kv) => {
    return kv || json.val(_siteProps_, 'appProps.appId', 'sl');
}

const encrypt = (v, k) => {
    try {
        if (v) {
            let eJ = crpJs.AES.encrypt(JSON.stringify(v), key(k)).toString();
                return crpJs.enc.Base64.stringify(crpJs.enc.Utf8.parse(eJ));
        } else {
            return v;
        }
    } catch (error) {
        return v;
    }
}

const decrypt = (v, k) => {
    try {
        if (v) {
            let dd = crpJs.enc.Base64.parse(v).toString(crpJs.enc.Utf8);
            let bytes = crpJs.AES.decrypt(dd, key(k)).toString(crpJs.enc.Utf8);
            return JSON.parse(bytes);
        } else {
            return v;
        }
    } catch (error) {
        return v;
    }
}

const md5 = (v) => {
    return crpJs.MD5(v).toString();
}

const sha256 = (v) => {
    return crpJs.SHA256(v).toString();
}

exports.md5 = md5;
exports.sha256 = sha256;
exports.encrypt = encrypt;
exports.decrypt = decrypt;