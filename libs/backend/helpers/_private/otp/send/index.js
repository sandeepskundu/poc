const helpers = require('./../helpers');
const utils = process.aioBeLibs('helpers/_private/utils');
const rateLimit = process.aioBeLibs('helpers/_private/rate-limit');
const notification = process.aioBeLibs('helpers/_private/notification');

const getReateLimitConfig = async (conf, req, res) => {
    return req.helpers.json.merge({
        api:utils.constants.otp.RATE_LIMIT.API,
        otp:utils.constants.otp.RATE_LIMIT.OTP
    }, req.helpers.json.val(conf, 'rateLimit', {}));
}

const getOtpConfigs = async (conf, data, req, ress) => {
    return req.helpers.json.merge(req.helpers.json.val(utils, 'constants.otp.DEFAULT_SEND_CONFGIS', {}), {
        data:req.helpers.json.val(conf, 'data', {}),
        schema:req.helpers.json.val(conf, 'schema', {}),
        configs:req.helpers.json.val(conf, 'configs', {}),
        recipients:req.helpers.json.val(conf, 'recipients', {})
    });
}

const checkRateLimit = async (conf, req, res) => {
    const api = await rateLimit.validate(conf.api, req, res, 'api');
    const otp = await rateLimit.validate(conf.otp, req, res, 'api-and-ip');

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

const templates = async (rval, conf, otp, data, req, res) => {
    let otps = req.helpers.json.val(rval, 'otps', {});
        rval.templates = {};

    for(const a in otps){
        rval.templates[a] = req.helpers.json.val(conf, `configs.channels.${a}`)
    }

    return rval;
}

const otpDataForTemplate = async (conf, otp, data, req, res) => {
    return await templates({
        otps:req.helpers.json.val(otp, 'otps'),
        hashId:req.helpers.json.val(otp, 'hashId'),
        resendAt:req.helpers.json.val(otp, 'resendAt'),
        validTill:req.helpers.json.val(otp, 'validTill'),
    }, conf, otp, data, req, res);
}

const cookieConfig = async (conf, req, res) => {
    return {
        cookieHash:req.helpers.json.val(conf, 'configs.cookieHash')
    }
}

const sendOtps = async (conf, otp, data, req, res) => {
    const nresp = await notification.init({
        data:req.helpers.json.merge((data || {}), {}),
        recipients:req.helpers.json.val(conf, 'recipients', {}),
        configs:await otpDataForTemplate(conf, otp, data, req, res),
    }, req, res);

    if(nresp.valid){
        let rval = await helpers.model.create.init(conf, otp, data, req, res);
        if(rval.valid){
            let cconf = await cookieConfig(conf, req, res);
                await helpers.cookie.set(cconf, otp, req, res);
                rval.data.meta = await helpers.cookie.meta(cconf, req, res);
        };

        return rval;
    }else{
        return nresp;
    }
}

const otpCookieMeta = async (conf, data, req, res) => {
    let cconf = await cookieConfig(conf, req, res);
    let cdata = await helpers.cookie.get(cconf, req, res);

    if(cdata){
        let resp = await req.helpers.json.val(utils, 'constants.otp.RESPONSE.OTP_METADATA_IS_AVAILABLE', {});
            resp = await req.helpers.json.merge(resp, {
                data:{
                    meta:await helpers.cookie.meta(cconf, req, res)
                }
            })

        return resp;
    }else{
        return await req.helpers.json.val(utils, 'constants.otp.RESPONSE.OTP_METADATA_NOT_AVAILABLE', {})
    }
}

const init = async (conf, data, req, res) => {
    let isMeta = req.helpers.json.val(req, 'query.otpMetaData', '');

    if(isMeta === 1 || isMeta === '1'){
        return await otpCookieMeta(conf, data, req, res);
    }else{
        let config = await getOtpConfigs(conf, data, req, res);
            config.rateLimit = await getReateLimitConfig(config, req, res);
        let otpData = await helpers.details.prepair.init(config, req, res);
        let validation = await helpers.validation.init(config, otpData, req, res);

        if(validation.valid){
            let details = req.helpers.json.copy(config);
            let rlimit = await checkRateLimit(details.rateLimit, req, res);

            if(rlimit.valid){
                let hashId = req.helpers.json.val(otpData, 'hashId');
                let otpDetails = await helpers.model.fetch.getDetailsByHash(hashId, req, res);

                if(otpDetails){
                    let vBeforCreate = await helpers.validation.existing.beforCreate(otpDetails, req, res);
                    if(vBeforCreate.valid){
                        await helpers.model.update.deleteOld(otpDetails, req, res, 'EXPIRED');
                        return await sendOtps(conf, otpData, data, req, res);
                    }else{
                        return vBeforCreate;
                    }
                }else{
                    return await sendOtps(conf, otpData, data, req, res);
                }
            }else{
                return rlimit;
            }
        }else{
            return {
                data:{},
                validation:req.helpers.json.val(validation, 'validation', {}),
                error:req.helpers.json.merge({
                    code:'OTP_SEND_INVALID_CONFIGURATION'
                }, req.helpers.json.val(validation, 'error', {})),
                status:{
                    code:400,
                    message:''
                },
            }
        }
    }
}

exports.init = init;