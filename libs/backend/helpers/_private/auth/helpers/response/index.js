const encryption = require('./../../model/encryption');//process.aioBeLibs('helpers/_private/auth/model');

const exclude = (resp, req) => {
    const map = {
        "ts":true,
        "signature":true,
        "isActive":true,
        "emailHash":true,
        "mobileHash":true,
        "lastLoginAt":true,
        "usernameHash":true,
        "passwordHash":true,
        "lastPasswordChangeAt":true
    }

    for(const a in map){
        req.helpers.json.remove(resp, a)
    }

    return resp;
}

const normalize = async (resp, req, res, next) => {
    let data = req.helpers.json.val(resp, 'data');

    if(data){
        let email = req.helpers.json.val(data, 'email');
        let mobile = req.helpers.json.val(data, 'mobile');

        if(email){
            data.email = await encryption.de(email, req);
        }

        if(mobile){
            data.mobile = await encryption.de(mobile, req);
        }

        resp.data = exclude(data, req);
    };

    return resp;
}

exports.send = async (resp, req, res, next) => {
    return await normalize(resp, req, res, next);
}