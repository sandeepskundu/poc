const mconfig = require('./model');
const login = require('./../login');
const verify = require('./../verify');
const mhelpers = require('./../../helpers');
const collection = require('./../collection');
const constants = require('./../../constants');
const encryption = require('./../encryption');

const mapValidation = async (rval, req, map, message, value) => {
    return req.helpers.json.set(rval, map, {
        "valid":false,
        "error":true,
        "value":value,
        "message":message,
    });
}

const setValidation = async (rval, data, req, res) => {
    let emap = 'data.body.email.id';
    let mmap = 'data.body.mobile.number';
    let email = req.helpers.json.val(data, 'email.id');
    let mobile = req.helpers.json.val(data, 'mobile.number');
    let vali = req.helpers.json.val(rval, 'validation', {});
    let vlen = req.helpers.json.length(vali);
    let emsg = 'This email address is already registered with us. Please use a different one or log in instead.';
    let mmsg = 'This mobile number is already registered with us. Please use a different one or log in instead.';
    
    if(vlen === 2){
        rval = req.helpers.json.val(constants, 'RESPONSES.ERRORS.ACOOUNT_EMAIL_AND_MOBILE_LINKED_WITH_OTHER_ACCOUNTS');
        rval = await mapValidation(rval, req, emap, emsg, email);
        rval = await mapValidation(rval, req, mmap, mmsg, mobile);
    }else{
        if(vlen === 1){
            emsg = req.helpers.json.val(constants, 'RESPONSES.ERRORS.ACOOUNT_EMAIL_LINKED_WITH_OTHER_ACCOUNT.error.message');
            mmsg = req.helpers.json.val(constants, 'RESPONSES.ERRORS.ACOOUNT_MOBILE_LINKED_WITH_OTHER_ACCOUNT.error.message');
            
            if(vali.emailHash){
                rval = req.helpers.json.val(constants, 'RESPONSES.ERRORS.ACOOUNT_EMAIL_LINKED_WITH_OTHER_ACCOUNT');
                rval = await mapValidation(rval, req, emap, emsg, email);
            }

            if(vali.mobileHash){
                rval = req.helpers.json.val(constants, 'RESPONSES.ERRORS.ACOOUNT_MOBILE_LINKED_WITH_OTHER_ACCOUNT');
                rval = await mapValidation(rval, req, mmap, mmsg, mobile);
            }
        }
    }

    return rval;
}

const error = async (rval, error, doc, config, model, req, res) => {
    return await req.helpers.mongoose.docHelpers.error.set(rval, error, doc, config, model, false, req, res);
}

const getMongoDoc = async (data, configs, otpresp, req, res, state, skipLogin) => {
    let dv = req.helpers.random.uuid();
    let email = req.helpers.json.val(data, 'org.email', dv);
    let mobile = req.helpers.json.val(data, 'org.mobile', dv);
    let verified = await verify.set(
        {email:email, mobile:mobile},
        {verifiedBy:req.helpers.json.val(otpresp, 'data.validatedBy', {})}, 
        req, res, (state || 'REGISTERED'));

    let rval = await req.helpers.mongoose.docHelpers.runtime.parse(data, configs, req, res);
        rval = await req.helpers.mongoose.docHelpers.defaultValues.atInsert(rval, req, res);
        rval = req.helpers.json.merge(rval, verified);

        if(!skipLogin){
            rval.lastLoginAt = Date.now();
        }

        if(email != dv){
            rval.email = await encryption.en(JSON.stringify(email), req);
        }

        if(mobile != dv){
            rval.mobile = await encryption.en(JSON.stringify(mobile), req);
        }

    return rval;
}

const resp = async (data, otpresp, req, res, state, skipLogin) => {
    let model = await collection.get(req, res);
    let doc = await getMongoDoc({org:data}, mconfig, otpresp, req, res, state, skipLogin);
    let rval = await req.helpers.express.response.getRespByCode(200, req, res);
    let mdoc = new model(doc);

     try {
        await mdoc.save();
        rval = await error(rval, false, mdoc, mconfig, model, req, res);
    }catch(err) {
        delete rval.data;
        rval = await error(rval, err, mdoc, mconfig, model, req, res);
        rval.error = req.helpers.json.val(constants, 'RESPONSES.ERRORS.ACCOUNT_SOMETHING_WENT_WRONG');
        rval = await setValidation(rval, data, req, res);
    };

    if(rval.valid){
        let resp = await encryption.decode(mdoc.toObject(), req);
            resp = await encryption.transform(resp, req);

        if(skipLogin){
            return req.helpers.express.response.getRespByCode(200, req, res, null, {
                data:resp,
                status:{
                    rcode:"USER_REGISTRED"
                }
            })
        }else{
            return await login.markAsLoginAndResp(resp, req, res);
        }
    }

    return rval;
}

const withouthOtp = async (data, req, res, state, skipLogin) => {
    return await resp(data, {}, req, res, state, skipLogin);
}

const insertFresh = async (otpresp, req, res, dmap, state) => {
    let tdata = await mhelpers.token.get(req, res);
    let data = req.helpers.json.val(tdata, (dmap || 'register'));
    return await resp(data, otpresp, req, res, state);
}

const adpativeLogin = async (otpresp, data, req, res, state) => {
    return await resp(data, otpresp, req, res, state);
}

const parseDataToLink = async (doc, data, type, req, res) => {
    return await req.helpers.mongoose.docHelpers.runtime.parse({org:data}, mconfig, req, res);
}

exports.new = insertFresh;
exports.withouthOtp = withouthOtp;
exports.adpativeLogin = adpativeLogin;
exports.parseDataToLink = parseDataToLink;
