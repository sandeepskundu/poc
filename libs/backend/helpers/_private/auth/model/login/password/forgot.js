const body = require('./../send-otp/body');
const query = require('./../send-otp/query');
const sendOtp = require('./../send-otp/index');
const encryption = require('./../../encryption');
const collection = require('./../../collection');
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

const getBody = (doc, req) => {
    return {
        org:{
            email:req.helpers.json.val(doc, 'email'),
            mobile:req.helpers.json.val(doc, 'mobile'),
            username:req.helpers.json.val(doc, 'username')
        }
    }
}

const sendOtpOn = (is, type, req) => {
    const map = {
        mobile:{
            'mobile-with-otp':true,
            'username-with-mobile-otp':true
        },
        email:{
            'email-with-otp':true,
            'username-with-email-otp':true
        }
    }

    return map[is][type] || false
}

const addUserTrackId = async (resp, doc, req) => {
    const code = req.helpers.json.val(resp, 'status.code');
    const rcode = req.helpers.json.val(resp, 'status.rcode');

    if(rcode === 'OTP_SENT' && code === 200){
        resp.data = resp.data || {};
        resp.data.trackId = doc.id
    }

    return resp;
}

const getDetails = async (data, type, model, configs, req, res, next) => {
    let item = req.helpers.mongoose.docHelpers.runtime.parse(data, configs, req, res, next);
    let qpObj = await req.helpers.mongoose.query.build(configs, model, {}, item, req, res, next);

    if(qpObj.valid){
        let query = await refineQuery(qpObj, req, res, next);
        let doc = await model.findOne(query).lean();

        if(doc){
            let d = req.helpers.json.copy(doc);
            let details = await encryption.decode(doc, req);
                details = await encryption.transform(doc, req);

            const onmail = await sendOtpOn('email', type, req);
            const email = req.helpers.json.val(details, 'email.id');

            if(onmail && email){
                const rval = await sendOtp.sendOtpByType(d, type, getBody(doc, req), req, res);
                return await addUserTrackId(rval, details, req)
            }else{
                const onmobile = await sendOtpOn('mobile', type, req);
                const isd = req.helpers.json.val(details, 'mobile.isd', '');
                const iso2 = req.helpers.json.val(details, 'mobile.iso2', '')
                const iso3 = req.helpers.json.val(details, 'mobile.iso3', '')
                const number = req.helpers.json.val(details, 'mobile.number', '');

                if(onmobile && isd && iso2 && iso3 && number){
                    const rval = await sendOtp.sendOtpByType(d, type, getBody(doc, req), req, res);

                    return await addUserTrackId(rval, details, req)
                }
            }
        }else{
            return doc;
        }
    }

    return await response.notFoundByType('ACCOUNT_SOMETHING_WENT_WRONG', req, res);
}

const init = async (type, req, res, next) => {
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

exports.init = init;