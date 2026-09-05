const token = require('./../token');
const otp = process.aioBeLibs('helpers/_private/otp');
const auth = process.aioBeLibs('helpers/_private/auth');
const utils = process.aioBeLibs('helpers/_private/utils');
const session = process.aioBeLibs('helpers/_private/session');

const getOtpConfigs = async (req, res) => {
    return {
        cookieHash:req.helpers.json.val(auth, 'constants.API_HASH.ADAPTIVE_LOGIN')
    };
}

const configs = async (req, res) => {
    return {
        configs:await getOtpConfigs(req, res)
    };
}

const getBody = async (req, pReq, res) => {
        req.body = req.body || {};
        req.body.data = req.body.data || {};

    let dv = req.helpers.random.id(20);
    let tokenData = await token.get(pReq, res);
    let reqdata = req.helpers.json.val(pReq, 'body', {});
    let include = req.helpers.json.val(utils, 'constants.otp.OTP_ALLOWED_CHANNELS', []);
        req.helpers.json.remove(req, 'runtime.validationConfig');

    let body = {
        token:req.helpers.json.val(tokenData, 'otp.token', '')
    };

    for(const a in include){
        let value = req.helpers.json.val(reqdata, include[a], dv);

        if(value != dv){
            body[include[a]] = value;
        }
    }
    
    req.body.data.otp = body;
}

const init = async (pReq, res, next) => {
    let req = pReq.helpers.request.dummy.create(pReq);
        await getBody(req, pReq, res);

    return await otp.verify.init(await configs(req, res), req, res, next);
}

exports.init = init;