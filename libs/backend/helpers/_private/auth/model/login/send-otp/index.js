const body = require('./body');
const query = require('./query');
const response = require('./response');
const sHelper = require('./../../schema');
const encryption = require('./../../encryption');
const collection = require('./../../collection');
const constants = require('./../../../constants');
const token = require('./../../../helpers/token');
const otp = process.aioBeLibs('helpers/_private/otp');

const getQueryByType = async (type, req, res) => {
    return req.helpers.json.val(query, `type.${type}`, {});
}

const getConfigs = async (type, req, res, next) => {
    const config = await await req.helpers.express.docs.json.get('model', req, res, next);
    return req.helpers.json.merge(config, await getQueryByType(type, req, res));
}

const refineQuery = async (query, req, res, next) => {
    let que = req.helpers.json.val(query, 'data', {});
        delete que._deleted;
    return que;
}

const getDetails = async (data, model, configs, req, res, next) => {
    let item = req.helpers.mongoose.docHelpers.runtime.parse(data, configs, req, res, next);
    let qpObj = await req.helpers.mongoose.query.build(configs, model, {}, item, req, res, next);

    if(qpObj.valid){
        let query = await refineQuery(qpObj, req, res, next);
            return await model.findOne(query).lean();
    }else{
        return await response.notFoundByType('ACCOUNT_SOMETHING_WENT_WRONG', req, res);
    }
}

const getCode = async (doc, type, req, res) => {
    const map = {
        'email-with-otp':'EMAIL_OTP',
        'mobile-with-otp':'MOBILE_OTP',
        'username-with-email-otp':'EMAIL_OTP',
        'username-with-mobile-otp':'MOBILE_OTP'
    }

    return map[type];
}

const getRecipientsFromDoc = async (code, doc, type, body, req, res) => {
    if(doc){
        doc = await encryption.transform(doc, req, []);
        doc = await encryption.decode(doc, req);
    }

    if(code === 'MOBILE_OTP'){
        return req.helpers.json.val(doc, 'mobile')
    }

    if(code === 'EMAIL_OTP'){
        return req.helpers.json.val(doc, 'email.id')
    }
}

const getRecipients = async (doc, type, body, req, res) => {
    let code = await getCode(doc, type, req, res);

    if(code === 'MOBILE_OTP'){
        if(type === 'username-with-mobile-otp'){
            return {
                mobile:await getRecipientsFromDoc(code, doc, type, body, req, res)
            }
        }else{
            return {
                mobile:req.helpers.json.val(body, 'org.mobile', {})
            }
        }
    }

    if(code === 'EMAIL_OTP'){
        if(type === 'username-with-email-otp'){
            return {
                email:await getRecipientsFromDoc(code, doc, type, body, req, res)
            }
        }else{
            return {
                email:req.helpers.json.val(body, 'org.email.id', {})
            }
        }
    }

    return {}
}

const getOtpConfigs = async (doc, type, req, res) => {
    let code = await getCode(doc, type, req, res);
    let rval = req.helpers.json.val(constants, 'OTP_CONFIGS.ACCOUNT_LOGIN');
        rval.cookieHash = req.helpers.json.val(constants, 'API_HASH.LOGIN_ACCOUNT');

    if(code){
        if(code === 'MOBILE_OTP'){
            rval = req.helpers.json.set(rval, 'channels.sms.enable', true, false, true);
            rval = req.helpers.json.set(rval, 'channels.email.enable', false, false, true);
        }

        if(code === 'EMAIL_OTP'){
            rval = req.helpers.json.set(rval, 'channels.email.enable', true, false, true);
            rval = req.helpers.json.set(rval, 'channels.sms.enable', false, false, true);
            rval = req.helpers.json.set(rval, 'channels.whatsapp.enable', false, false, true)
        }
    }

    return rval;
}

const validateRecipients = async (recipients, doc, type, body, req, res) => {
    let rval = {valid:true};
    let code = await getCode(doc, type, req, res);

    if(code === 'MOBILE_OTP'){
        let isd = req.helpers.json.val(recipients, 'mobile.isd', '');
        let iso2 = req.helpers.json.val(recipients, 'mobile.iso2', '');
        let iso3 = req.helpers.json.val(recipients, 'mobile.iso3', '');
        let number = req.helpers.json.val(recipients, 'mobile.number', '');

        if(isd && iso2 && iso3 && number){
            return rval;
        }else{
            return await response.notFoundByType('ACCOUNT_MOBILE_NOT_LINKED_WITH_USERNAME', req, res);
        }
    }

    if(code === 'EMAIL_OTP'){
        let email = req.helpers.json.val(recipients, 'email', '');

        if(email){
            return rval;
        }else{
            return await response.notFoundByType('ACCOUNT_EMAIL_NOT_LINKED_WITH_USERNAME', req, res);
        }
    }
}

const sendOtpOrEnterPassword = async (conf, doc, type, body, req, res) => {
    const phash = req.helpers.json.val(doc, 'passwordHash', '');
    const tmap = {
        'email-with-otp':true,
        'mobile-with-otp':true,
        'username-with-email-otp':true,
        'username-with-mobile-otp':true
    }

    if(tmap[type] || !phash){
        return await otp.send.init(conf, doc, req, res);
    }else{
        return await response.returnResp('ACCOUNT_ENTER_PASSWORD_TO_LOGIN', req, res);
    }
}

const sendOtp = async (doc, type, body, req, res) => {
        doc._id = doc._id.toString();
        doc._merchantId = doc._merchantId.toString()
        
    let conf = {
        configs:await getOtpConfigs(doc, type, req, res),
        recipients:await getRecipients(doc, type, body, req, res),
        schema:await sHelper.defaultSchemaByType('FORGOT_PASSWORD', req, res)
    };

    if(type === 'username-with-email-otp' || type === 'username-with-mobile-otp'){
        const validation = await validateRecipients(conf.recipients, doc, type, body, req, res);
        if(validation.valid){
            return await sendOtpOrEnterPassword(conf, doc, type, body, req, res);
        }else{
            return validation;
        }
    }else{
        return await sendOtpOrEnterPassword(conf, doc, type, body, req, res);
    }
}

const byType = async (type, req, res, next) => {
    let model = await collection.get(req, res);
    let configs = await getConfigs(type, req, res, next);
        await body.get(type, req, res)
    
    let bdata = req.helpers.json.val(req, 'body.data', {});
    let doc = await getDetails(bdata, model, configs, req, res, next);

    if(doc){
        if(doc.valid === false && doc.error){
            return doc;
        }else{
            let otpresp = await sendOtp(doc, type, bdata, req, res);
            let code = req.helpers.json.val(otpresp, 'status.code');
            let rcode = req.helpers.json.val(otpresp, 'status.rcode');

            if(otpresp.valid && code === 200 && rcode === 'OTP_SENT'){
                let trackId = req.helpers.uuid.create();
                    otpresp.data = otpresp.data || {};
                    otpresp.data.trackId = trackId;
                    otpresp.data.token = await token.encode({
                        user:{
                            id:doc._id
                        },
                        otp:{
                            token:req.helpers.json.val(otpresp, 'data.token', '')
                        }
                    }, trackId, req, res);
            };

            return otpresp;
        }
    }else{
        return await response.notFoundByType(type, req, res);
    }
}

const sendOtpByType = async (doc, type, body, req, res) => {
    return await sendOtp(doc, type, body, req, res)
}

exports.byType = byType;
exports.sendOtpByType = sendOtpByType;