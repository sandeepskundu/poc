const constants = require('./../../constants');

const getSalt = async (key, req) => {
    let sec = req.helpers.json.val(constants, 'ENCRIPTION_KEY.ADAPTIVE_LOGIN_OTP_TOKEN_KEY', '');

    return req.helpers.crypto.md5(sec+key);
}

const encode = async (data, key, req, res) => {
    return await req.helpers.crypto.en(JSON.stringify(data), await getSalt(key, req))
}

const decode = async (data, key, req, res) => {
    return await req.helpers.crypto.de(data, await getSalt(key, req))
}

const get = async (req, res) => {
    const tkn = req.helpers.json.val(req, 'body.token', '');
    const tId = req.helpers.json.val(req, 'body.trackId', '')

    return await decode(tkn, tId, req, res);
}

exports.get = get;
exports.encode = encode;
exports.decode = decode;