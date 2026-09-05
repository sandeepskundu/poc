const token = require('./../token');
const query = require('./../query');
const mconfig = require('./../model');
const response = require('./../response');
const constants = require('./../../../constants');
const collection = require('./../../../model/collection');
const otp = process.aioBeLibs('helpers/_private/otp');

const getQueryByType = async (type, req, res) => {
    return req.helpers.json.val(query, `type.${type}`, {});
}

const getConfigs = async (arg, type, req, res) => {
    return req.helpers.json.merge(mconfig, await getQueryByType(type, req, res));
}

const refineQuery = async (query, req, res, next) => {
    let que = req.helpers.json.val(query, 'data', {});
        delete que._deleted;
    
    return que;
}

const getDoc = async (data, model, configs, req, res, next) => {
    let item = req.helpers.mongoose.docHelpers.runtime.parse(data, configs, req, res, next);
    let qpObj = await req.helpers.mongoose.query.build(configs, model, {}, item, req, res, next);

    if(qpObj.valid){
        let query = await refineQuery(qpObj, req, res, next);
            return await model.findOne(query).lean();
    }else{
        return await response.notFoundByType('ACCOUNT_SOMETHING_WENT_WRONG', req, res);
    }
}

const getDetailsByType = async (arg, type, req, res, next) => {
    const model = await collection.get(req, res);
    const configs = await getConfigs(arg, type, req, res);
    const bdata = req.helpers.json.val(req, 'body.data', {});
    return await getDoc(bdata, model, configs, req, res, next);
}

const hasDataFor = async (arg, type, req) => {
    const email = req.helpers.json.val(req, 'body.data.email.id');

    if(type === 'email'){
        return email?true:false
    }

    if(type === 'mobile'){
        const isd = req.helpers.json.val(req, 'body.data.mobile.isd')
        const iso2 = req.helpers.json.val(req, 'body.data.mobile.iso2')
        const iso3 = req.helpers.json.val(req, 'body.data.mobile.iso3')
        const number = req.helpers.json.val(req, 'body.data.mobile.number');

        return (isd && iso2 && iso3 && number);
    }

    return false;
}

const rinvalid = async (type, req, res) => {
    if(type === 'email'){
        return await response.invalid('ACCOUNT_EMAIL_ADDRESS_NOT_VALID', req, res, 'data.body.email.id');
    }
    return await response.invalid('ACCOUNT_MOBILE_NUMBER_NOT_VALID', req, res, 'data.body.mobile.number');
}

const hasBothData = async (arg, req) => {
    return (req.helpers.json.val(arg, 'configs.hasDataFor', 'both') === 'both')
}

const bothAreSame = async (docs, req) => {
    const eId = req.helpers.json.val(docs || {}, 'email._id');
    const mId = req.helpers.json.val(docs || {}, 'mobile._id');
    return (eId && mId && (eId.toString() === mId.toString()));
}

const getSecondaryType = async (arg, req) => {
    let loginBy = req.helpers.json.val(arg, 'configs.loginBy');
    return (loginBy==='mobile'?'email':'mobile');
}

const getBothDoc = async (docs, arg, req) => {
    let stype = await getSecondaryType(arg, req);
    let loginBy = req.helpers.json.val(arg, 'configs.loginBy');
    let primary = req.helpers.json.val(docs, loginBy);
    let secondary = req.helpers.json.val(docs, stype);

    return {primary, secondary}
}

const getTokenData = async (type, docs, arg, req, res) => {
    return {
        type:type,
        configs:{
            loginBy:req.helpers.json.val(arg, 'configs.loginBy'),
            hasDataFor:req.helpers.json.val(arg, 'configs.hasDataFor'),
        },
        data:{
            email:req.helpers.json.val(req, `body.data.email`),
            mobile:req.helpers.json.val(req, `body.data.mobile`)
        }
    };
}

const getOtpDefaultSchema = async (req, res) => {
    const common = req.helpers.json.val(constants, 'SCHEMA.COMMON', {}); 
    const bytype = req.helpers.json.val(constants, `SCHEMA.ADAPTIVE_LOGIN`, {});

    return req.helpers.json.merge(common, bytype);
}

const getRecipients = async (arg, req, res) => {
    let rval = {};
    let loginBy = req.helpers.json.val(arg, 'configs.loginBy');
        rval[loginBy] = req.helpers.json.val(req, `body.data.${loginBy}`);

    return rval;
}

const getOtpConfigs = async (arg, req, res) => {
    let loginBy = req.helpers.json.val(arg, 'configs.loginBy');
    let rval = req.helpers.json.val(constants, 'OTP_CONFIGS.ADAPTIVE_LOGIN');
        rval.cookieHash = req.helpers.json.val(constants, 'API_HASH.ADAPTIVE_LOGIN');

    if(loginBy){
        if(loginBy === 'mobile'){
            rval = req.helpers.json.set(rval, 'channels.sms.enable', true, false, true);
            rval = req.helpers.json.set(rval, 'channels.email.enable', false, false, true);
        }

        if(loginBy === 'email'){
            rval = req.helpers.json.set(rval, 'channels.email.enable', true, false, true);
            rval = req.helpers.json.set(rval, 'channels.sms.enable', false, false, true);
            rval = req.helpers.json.set(rval, 'channels.whatsapp.enable', false, false, true)
        }
    }

    return rval;
}

const getSendOtpConfigs = async (type, docs, arg, req, res) => {
    return {
        configs:await getOtpConfigs(arg, req, res),
        schema:await getOtpDefaultSchema(req, res),
        recipients:await getRecipients(arg, req, res),
    };
}

const sendOtpToLogin = async (type, docs, arg, req, res) => {
    // type => login|regiser|partial-register|link
    const conf = await getSendOtpConfigs(type, docs, arg, req, res);
    const otpResp = await otp.send.init(conf, {}, req, res);
    const code = req.helpers.json.val(otpResp, 'status.code');
    const rcode = req.helpers.json.val(otpResp, 'status.rcode');

    if(code === 200 && rcode === 'OTP_SENT'){
        let trackId = req.helpers.uuid.create();

        otpResp.data = otpResp.data || {};
        otpResp.data.trackId = trackId;
        otpResp.data.token = await token.encode({
            sId:trackId,
            loginData:await getTokenData(type, docs, arg, req, res),
            otp:{token:req.helpers.json.val(otpResp, 'data.token')}
        }, trackId, req, res);

        otpResp.loginWithOtpData = otpResp.data;
        otpResp.data = {};
    }

    return otpResp;
}

const hasSecOption = async (doc, arg, req) => {
    let stype = await getSecondaryType(arg, req);

    return (req.helpers.json.val(doc, stype))?true:false;
}

const startLogin = async (docs, arg, req, res, next) => {
    let same = false;
    let both = await hasBothData(arg, req);
    let {primary, secondary} = await getBothDoc(docs, arg, req);

    if(both && primary && secondary){
        same = await bothAreSame(docs, req);
    }

    if(both && same){
        return await sendOtpToLogin('login', docs, arg, req, res);
    }else{
        if(both && primary && secondary){
            return await sendOtpToLogin('login', docs, arg, req, res);
        }else{
            if(both){
                if(primary && !secondary){
                    let secOpt = await hasSecOption(primary, arg, req);

                    if(secOpt){
                        return  await sendOtpToLogin('login', docs, arg, req, res);
                    }else{
                        return  await sendOtpToLogin('link', docs, arg, req, res);
                    }
                }else{
                    if(!primary && secondary){
                        return await sendOtpToLogin('partial-register', docs, arg, req, res);
                    }else{
                        return await sendOtpToLogin('register', docs, arg, req, res);
                    }
                }
            }else{
                if(primary){
                    return await sendOtpToLogin('login', docs, arg, req, res);
                }else{
                    if(!primary && secondary){
                        return await sendOtpToLogin('partial-register', docs, arg, req, res);
                    }else{
                        return await sendOtpToLogin('register', docs, arg, req, res);
                    }
                }
            }
        }
    }
}

const init = async (arg, req, res, next) => {
    let docs = {
        email:null,
        mobile:null
    };

    let isemail = await hasDataFor(arg, 'email', req);
    let ismobile = await hasDataFor(arg, 'mobile', req);
    let loginBy = req.helpers.json.val(arg, 'configs.loginBy');
    
    if(isemail){
        docs.email = await getDetailsByType(arg, 'email', req, res, next);
    }

    if(ismobile){
        docs.mobile = await getDetailsByType(arg, 'mobile', req, res, next);
    }

    if(loginBy === 'email'){
        if(isemail){
            return await startLogin(docs, arg, req, res, next)
        }else{
            return await rinvalid('email', req, res);
        }
    }

    if(loginBy === 'mobile'){
        if(ismobile){
            return await startLogin(docs, arg, req, res, next)
        }else{
            return await rinvalid('mobile', req, res)
        }
    }
}

exports.init = init;