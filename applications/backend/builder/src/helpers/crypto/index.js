const cJs = require('crypto-js');

exports.en = (value, key) => {
    return cJs.AES.encrypt(value, key?key:'AIOFOUNDATION').toString();
}

exports.de = (value, key) => {
    const str  = cJs.AES.decrypt(value, key?key:'AIOFOUNDATION');
    try {
        return JSON.parse(str.toString(cJs.enc.Utf8));
    } catch(e) {
        try {
            return str.toString(cJs.enc.Utf8);
        } catch(e) {
            return false;
        }
    }
}

exports.md5 = (v) => {
    return cJs.MD5(v).toString();
}

exports.sha256 = (v) => {
    return cJs.SHA256(v).toString();
}