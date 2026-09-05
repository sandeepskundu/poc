const otp = process.aioBeLibs('helpers/_private/otp');
const auth = process.aioBeLibs('helpers/_private/auth');
const utils = process.aioBeLibs('helpers/_private/utils');
const session = process.aioBeLibs('helpers/_private/session');

const getOtpConfigs = async (req, res) => {
    return {
        cookieHash:req.helpers.json.val(auth, 'constants.API_HASH.CREATE_ACCOUNT')
    };
}

const configs = async (req, res) => {
    return {
        configs:await getOtpConfigs(req, res)
    };
}

const getOtpBody = async (req, pReq, res) => {
        req.body = req.body || {};
        req.body.data = req.body.data || {};

    let dv = req.helpers.random.id(20);
    let tdata = await auth.helpers.token.get(pReq, res);
    let reqdata = req.helpers.json.val(pReq, 'body.data.otp', {});
    let include = req.helpers.json.val(utils, 'constants.otp.OTP_ALLOWED_CHANNELS', []);
        req.helpers.json.remove(req, 'runtime.validationConfig');

    let body = {
        token:req.helpers.json.val(tdata, 'otp.token', '')
    };

    for(const a in include){
        let value = req.helpers.json.val(reqdata, include[a], dv);

        if(value != dv){
            body[include[a]] = value;
        }
    }
    
    req.body.data.otp = body;
}

module.exports = async (pReq, res, next) => {
    const ad = await session.details(pReq);

    if(ad && ad.login === 1){
        return await pReq.helpers.json.val(auth, 'constants.RESPONSES.ERRORS.USER_AUTHORISED_ALREADY')
    }else{
        let req = pReq.helpers.request.dummy.create(pReq);
            await getOtpBody(req, pReq, res);

        let otpConf = await configs(req, res);
        let otpResp = await otp.verify.init(otpConf, req, res, next);

        if(otpResp.valid){
            return await auth.module.insert.save.new(otpResp, pReq, res);
        }else{
           return otpResp;
        }
    }
}