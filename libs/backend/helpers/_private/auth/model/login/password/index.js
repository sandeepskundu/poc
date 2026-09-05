
const login = require('./../index');
const body = require('./../send-otp/body');
const query = require('./../send-otp/query');
const sendOtp = require('./../send-otp/index');
const encryption = require('./../../encryption');
const collection = require('./../../collection');
const token = require('./../../../helpers/token');
const response = require('./../send-otp/response');

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

const getCode = async (type, has, req) => {
    const map = {
        mobile:{
            'mobile-with-password':'mobile-with-otp',
            'username-with-password':'username-with-mobile-otp'
        },
        email:{
            'email-with-password':'email-with-otp',
            'username-with-password':'username-with-email-otp'
        }
    }

    if(has === 'email'){
        return map.email[type] || 'email-with-otp';
    }

    return map.mobile[type] || 'mobile-with-otp';
}


const getBody = (doc, req) => {
    return {
        org:{
            mobile:req.helpers.json.val(doc, 'mobile'),
            email:req.helpers.json.val(doc, 'email.id'),
            username:req.helpers.json.val(doc, 'username')
        }
    }
}

const initSendOtp = async (doc, tcode, body, req, res) => {
    let otpresp = await sendOtp.sendOtpByType(doc, tcode, body, req, res);
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

const getDetails = async (data, type, model, configs, req, res, next) => {
    let item = req.helpers.mongoose.docHelpers.runtime.parse(data, configs, req, res, next);
    let qpObj = await req.helpers.mongoose.query.build(configs, model, {}, item, req, res, next);

    if(qpObj.valid){
        let query = await refineQuery(qpObj, req, res, next);
        let doc = await model.findOne(query).lean();

        if(doc){
            const dv = req.helpers.random.id(24);
            const dpHash = req.helpers.json.val(doc, 'passwordHash');
            const upHash = req.helpers.json.val(item, 'passwordHash', dv);

            let details = await encryption.decode(doc, req);
                details = await encryption.transform(doc, req);

            if(dpHash){
                if(dpHash != upHash){
                    return await response.notFoundByType('ACCOUNT_LOGIN_INCORECT_PASSWORD', req, res, 'data.body.password');
                }else{
                    return await login.markAsLoginAndResp(details, req, res);
                }
            }else{
                const email = req.helpers.json.val(details, 'email.id');

                if(email){
                    return await initSendOtp(doc, await getCode(type, 'email', res), getBody(details, req), req, res);
                }else{
                    const isd = req.helpers.json.val(details, 'mobile.isd', '');
                    const iso2 = req.helpers.json.val(details, 'mobile.iso2', '')
                    const iso3 = req.helpers.json.val(details, 'mobile.iso3', '')
                    const number = req.helpers.json.val(details, 'mobile.number', '');

                    if(isd && iso2 && iso3 && number){
                        return await initSendOtp(doc, await getCode(type, 'mobile', res), getBody(details, req), req, res);
                    }else{
                        return await response.notFoundByType('ACCOUNT_SOMETHING_WENT_WRONG', req, res);
                    }
                }
            }
        }else{
            return doc;
        }
    }else{
        return await response.notFoundByType('ACCOUNT_SOMETHING_WENT_WRONG', req, res);
    }
}

const loginWithPassword = async (type, req, res, next) => {
    let model = await collection.get(req, res);
    let configs = await getConfigs(type, req, res, next);
        await body.get(type, req, res)
    
    let bdata = req.helpers.json.val(req, 'body.data', {});
    let doc = await getDetails(bdata, type, model, configs, req, res, next);

    if(doc){
        return doc;
    }else{
        return await response.notFoundByType(type, req, res);
    }
}

exports.forgot = require('./forgot');
exports.loginWithPassword = loginWithPassword;