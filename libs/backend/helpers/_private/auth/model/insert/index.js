const model = require('./model');
const collection = require('./../collection');
const constants = require('./../../constants');
const encryption = require('./../encryption');

const getConfigs = async (req, res, next) => {
    return model;
};

const mapValidation = async (rval, req, map, message, value) => {
    return req.helpers.json.set(rval, map, {
        "valid":false,
        "error":true,
        "value":value,
        "message":message,
    });
}

const exists = async (model, query, req) => {
    let doc = await model.findOne(query);

    if(doc){
        return await encryption.decode(doc.toObject(), req);
    }else{
        return doc;
    }
}

const partially = async (doc, req, res) => {
    const email = req.helpers.json.val(doc, 'email.verified', false);
    const mobile = req.helpers.json.val(doc, 'mobile.verified', false);

    const rval = {
        valid:true,
    }

    if(mobile){
        rval.code = 'VERIFY_EMAIL'
    }else{
        rval.code = 'VERIFY_MOBILE'
    }

    return rval;
}

const isverified = async (doc, req, res) => {
    const state = req.helpers.json.val(doc, 'state');

    switch (state) {
        case 'VERIFICATION_PENDING':
            return {
                valid:true,
            }
        break;
        case 'PARTIALLY_VERIFIED':
            return await partially(doc, req, res);
        break;
        default:
            return req.helpers.json.val(constants, 'RESPONSES.ERRORS.ALREADY_REGISTERED');
    }
}

const getMongoDoc = async (data, configs, req, res) => {
    let rval = await req.helpers.mongoose.docHelpers.runtime.parse(data, configs, req, res);
        rval = await req.helpers.mongoose.docHelpers.defaultValues.atInsert(rval, req, res);

    return rval;
}

const check = async (req, res, next) => {
    let rval = {valid:true};
    let emap = 'data.body.email.id';
    let mmap = 'data.body.mobile.number';
    let model = await collection.get(req, res);
    let configs = await getConfigs(req, res, next);
    let data = req.helpers.json.val(req, 'body.data', {});
    let email = req.helpers.json.val(data, 'email.id', '');
    let mobile = req.helpers.json.val(data, 'mobile.number', '');
    let item = await getMongoDoc(data, configs, req, res, next);
    let emsg = 'This email address is already registered with us. Please use a different one or log in instead.';
    let mmsg = 'This mobile number is already registered with us. Please use a different one or log in instead.';
    let user = await exists(model, {emailHash:item.emailHash, mobileHash:item.mobileHash, _merchantId:item._merchantId}, req);

    if(user){
        rval = await isverified(user, req, res);
        rval = await mapValidation(rval, req, emap, emsg, email);
        return await mapValidation(rval, req, mmap, mmsg, mobile);
    }else{
        let euser = await exists(model, {emailHash:item.emailHash, _merchantId:item._merchantId}, req);
        let muser = await exists(model, {mobileHash:item.mobileHash, _merchantId:item._merchantId}, req);
            emsg = req.helpers.json.val(constants, 'RESPONSES.ERRORS.ACOOUNT_EMAIL_LINKED_WITH_OTHER_ACCOUNT.error.message');
            mmsg = req.helpers.json.val(constants, 'RESPONSES.ERRORS.ACOOUNT_MOBILE_LINKED_WITH_OTHER_ACCOUNT.error.message');
            rval = req.helpers.json.val(constants, 'RESPONSES.ERRORS.ACOOUNT_EMAIL_AND_MOBILE_LINKED_WITH_OTHER_ACCOUNTS');

        if(euser && muser){
            rval = await mapValidation(rval, req, emap, emsg, email);
            return await mapValidation(rval, req, mmap, mmsg, mobile);
        }else{
            if(euser){
                rval = req.helpers.json.val(constants, 'RESPONSES.ERRORS.ACOOUNT_EMAIL_LINKED_WITH_OTHER_ACCOUNT')
                return await mapValidation(rval, req, emap, emsg, email);
            }else{
                if(muser){
                    rval = req.helpers.json.val(constants, 'RESPONSES.ERRORS.ACOOUNT_MOBILE_LINKED_WITH_OTHER_ACCOUNT');
                    return await mapValidation(rval, req, mmap, mmsg, mobile);
                }else{
                    return {valid:true};
                }
            }
        }
    }
}

exports.validate = check;
exports.save = require('./save');