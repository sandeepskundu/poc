const helpers = require('./../helpers');
const utils = process.aioBeLibs('helpers/_private/utils');

const ENUMS = {
    "OTP_INVALID":"The OTP entered is invalid. Please check and try again.",
    "OTP_EXPIRED":'This OTP is no longer valid. Please request a fresh OTP and try again.'
}

const getReqOtps = async (req, res) => {
    let rval = {};
    let otps = req.helpers.json.val(req, 'body.data.otp');
    let options = req.helpers.json.val(utils, 'constants.otp.OTP_ALLOWED_CHANNELS', []);

    for(const a in options){
        let n = options[a];

        if(otps[n]){
            rval[n] = otps[n];
        }
    }

    return rval;
}

const invalid = (rval, req, name, message, value) => {
    return req.helpers.json.set(rval, `data.body.otp.${name}`, {
        error:true,
        valid:false,
        value:value,
        message:message
    });
}

const expiry = async (data, conf, req, res) => {
    let rval = {valid:true}
    let otps = await getReqOtps(req, res);
    let vTill = data.validTill.getTime();

    if(vTill < Date.now()){
        rval = req.helpers.json.val(utils, 'constants.otp.RESPONSE.OTP_EXPIRED', {});
        for(const a in otps){
            rval = invalid(rval, req, a, ENUMS.OTP_EXPIRED, otps[a]);
        }
    };

    return rval;
}

const matchOtps = async (data, conf, req, res) => {
    let rval = {valid:true}
    let otps = await getReqOtps(req, res);
    let dotps = await req.helpers.json.val(data, 'otps', {});
        
    for(const a in dotps){
        if(parseInt(dotps[a]) != parseInt(otps[a])){
            if(rval.valid){
                rval = req.helpers.json.val(utils, 'constants.otp.RESPONSE.OTP_INVALID', {});
            }
            rval = invalid(rval, req, a, ENUMS.OTP_INVALID, otps[a]);
        }
    }

    return rval;
}

const getValidateType = async (data, conf, req, res) => {
    let rval = {};
    let dotps = await req.helpers.json.val(data, 'otps', {});

    for(const a in dotps){
        rval[a] = true;
    }

    return rval;
}

const markAsVerified = async (data, conf, req, res) => {
    await helpers.model.update.makeAsVerified(data, req, res);

    return {
        valid:true,
        data:{
            validatedBy:await getValidateType(data, conf, req, res)
        }
    }
}

const init = async (data, conf, req, res, next) => {
    let rval = await expiry(data, conf, req, res);

    if(rval.valid){
        rval = await matchOtps(data, conf, req, res, next)
    }

    if(rval.valid){
        rval = await markAsVerified(data, conf, req, res, next)
    }

    if(rval.valid){
        await helpers.cookie.remove({
            cookieHash:req.helpers.json.val(conf, 'configs.cookieHash')
        }, req, res)
    }

    return rval;
}

exports.init = init;