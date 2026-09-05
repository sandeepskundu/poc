const helpers = require('./../helpers');
const validate = require('./validate-details');
const utils = process.aioBeLibs('helpers/_private/utils');
const rateLimit = process.aioBeLibs('helpers/_private/rate-limit');
const validation = process.aioBeLibs('helpers/_private/utils/validations');

const getReateLimitConfig = async (conf, req, res) => {
    return req.helpers.json.merge({
        api:utils.constants.otp.RATE_LIMIT.API,
        otp:utils.constants.otp.RATE_LIMIT.OTP
    }, req.helpers.json.val(conf, 'rateLimit', {}));
}
/*--
const getOtpConfigs = async (conf, data, req, ress) => {
    return req.helpers.json.merge(req.helpers.json.val(utils, 'constants.otp.DEFAULT_SEND_CONFGIS', {}), {
        data:req.helpers.json.val(conf, 'data', {}),
        schema:req.helpers.json.val(conf, 'schema', {}),
        configs:req.helpers.json.val(conf, 'configs', {}),
        recipients:req.helpers.json.val(conf, 'recipients', {}),
    });
}

const checkRateLimit = async (conf, req, res) => {
    const otp = await rateLimit.validate(conf.otp, req, res);
    const api = await rateLimit.validate(conf.api, req, res);

    if(otp.valid && api.valid){
        return otp;
    }else{
        if(!otp.valid){
            return otp;
        }else{
            return api;
        }
    }
}

--*/

const otpValidation = async (req) => {
    return await validation.build(req, 'otp.code');
}

const revalidate = async (data, conf, req, res) => {
    let otps = req.helpers.json.val(data, 'otps', {});
    let bv = req.helpers.json.val(req, 'runtime.validationConfig.validation.body', {});
    let options = req.helpers.json.val(utils, 'constants.otp.OTP_ALLOWED_CHANNELS', []);

    for(const a in options){
        let n = options[a];
        let map = `otp.${n}`;

        if(otps[n]){
            if(bv[map]){
                bv[map] = req.helpers.json.merge(bv[map], {
                    "checks":{
                        "required":{
                            "value":"required"
                        }
                    }
                });
            }else{
                bv[map] = await otpValidation(req);
            }
        }else{
            delete bv[map];
        }
    }

    req.runtime = req.runtime || {};
    req.runtime.validationConfig = req.runtime.validationConfig || {};
    req.runtime.validationConfig.validation = req.runtime.validationConfig.validation || {};
    req.runtime.validationConfig.validation.body = bv;
}

const init = async (conf, req, res, next) => {
    let config = req.helpers.json.copy(conf || {});
    let hashId = req.helpers.json.val(req, 'body.data.otp.token')
        config.rateLimit = await getReateLimitConfig(config, req, res);
    let data = await helpers.model.fetch.getDetailsToValidateOtp(hashId, req, res);

    if(data){
            await revalidate(data, conf, req, res);
        let valid = await req.helpers.express.validation.api.start(req, res, next);

        if(valid.error){
            return valid;
        }else{
            return await validate.init(data, conf, req, res, next);
        }
    }else{
        let rval = req.helpers.json.val(utils, 'constants.otp.RESPONSE.OTP_TOKEN_INVALID', {});
            rval = req.helpers.json.set(rval, 'data.body.otp.token', {
                error:true,
                valid:false,
                value:hashId,
                message:'Invalid OTP token. Please check and try again.'
            });

        return rval;
    }
}

exports.init = init;