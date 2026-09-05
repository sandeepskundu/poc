const token = require('./../token');
const query = require('./../query');
const mconfig = require('./../model');
const response = require('./../response');
const mHelpers = require('./../../../model');
const constants = require('./../../../constants');
const collection = require('./../../../model/collection');

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

const hasDataFor = async (arg, type, req) => {
    const email = req.helpers.json.val(arg, 'loginData.data.email.id');

    if(type === 'email'){
        return email?true:false
    }

    if(type === 'mobile'){
        const isd = req.helpers.json.val(arg, 'loginData.data.mobile.isd');
        const iso2 = req.helpers.json.val(arg, 'loginData.data.mobile.iso2');
        const iso3 = req.helpers.json.val(arg, 'loginData.data.mobile.iso3');
        const number = req.helpers.json.val(arg, 'loginData.data.mobile.number');

        return (isd && iso2 && iso3 && number)?true:false;
    }

    return false;
}

const setReqBody = async (details, req) => {
    let isemail = await hasDataFor(details, 'email', req);
    let ismobile = await hasDataFor(details, 'mobile', req);
    let email = req.helpers.json.val(details, 'loginData.data.email', {});
    let mobile = req.helpers.json.val(details, 'loginData.data.mobile', {})
        req.body = req.body || {};
        req.body.data = req.body.data = {};
        req.body.data.org = req.body.data.org || {};

    if(isemail){
        req.body.data.org.email = email;
    }

    if(ismobile){
        req.body.data.org.mobile = mobile;
    }
}

const getDoc = async (details, model, configs, req, res, next) => {
    let data = req.helpers.json.val(req, 'body.data', {});
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
    return await getDoc(arg, model, configs, req, res, next);
}

const rinvalid = async (type, req, res) => {
    if(type === 'email'){
        return await response.invalid('ACCOUNT_EMAIL_ADDRESS_NOT_VALID', req, res, 'data.body.email.id');
    }
    return await response.invalid('ACCOUNT_MOBILE_NUMBER_NOT_VALID', req, res, 'data.body.mobile.number');
}

const getSecondaryType = async (arg, req) => {
    let loginBy = req.helpers.json.val(arg, 'loginData.configs.loginBy');
    return (loginBy==='mobile'?'email':'mobile');
}

const getBothDoc = async (docs, data, req) => {
    let ptype = await getSecondaryType(data, req);
    let loginBy = req.helpers.json.val(data, 'loginData.configs.loginBy');
    let primary = req.helpers.json.val(docs, loginBy);
    let secondary = req.helpers.json.val(docs, ptype);

    return {primary, secondary}
}

const getCommonData = async (data, req, res) => {
    let rv = {};
    let dv = req.helpers.random.id(20);
    let opts = ['_id', 'email', 'mobile', 'emailHash', 'mobileHash'];

    for(const a in opts){
        let n = opts[a];
        let v = req.helpers.json.val(data, n, dv);

        if(v != dv){
            rv[n] = v;
        }
    }

    rv = await mHelpers.encryption.decode(rv, req);
    rv = await mHelpers.encryption.transform(rv, req);

    if(rv.id){
        rv._id = rv.id;
        delete rv.id;
    }

    return rv;
}

const setDataToLink = async (otpresp, doc, data, req, res) => {
    let stype = await getSecondaryType(data, req);
    let hasData = await hasDataFor(data, stype, req);

    if(hasData){
        let dvalue = {};
        let cdata = await getCommonData(doc, req, res);
            dvalue[stype] = req.helpers.json.val(data, `loginData.data.${stype}`, {});
        let rdoc = await mHelpers.insert.save.parseDataToLink(doc, dvalue, stype, req, res);
            rdoc = await req.helpers.json.merge(dvalue, rdoc);
        let udoc = req.helpers.json.merge(cdata, rdoc);
            udoc = await mHelpers.update.linkDataAndSave(udoc, otpresp, req, res, 'REGISTERED')
            return await mHelpers.login.markAsLoginAndResp(udoc, req, res);
    }

    return doc;
}

const link = async (otpresp, docs, data, req, res, next) => {
    let {primary, secondary} =  await getBothDoc(docs, data, req);
    return await setDataToLink(otpresp, primary, data, req, res);
}

const login = async (otpresp, docs, data, req, res) => {
    let {primary, secondary} =  await getBothDoc(docs, data, req);
    return await mHelpers.login.updateVerifiedAndLogin(otpresp, primary, req, res);
}

const register = async (otpresp, docs, data, req, res, state) => {
    return await mHelpers.insert.save.adpativeLogin(otpresp, req.helpers.json.val(data, 'loginData.data', {}), req, res, state);
}

const partialRegister = async (otpresp, docs, data, req, res) => {
    let type = req.helpers.json.val(data, 'loginData.configs.loginBy');

    if(type === 'email'){
        req.helpers.json.remove(data, 'loginData.data.mobile');
    }

    if(type === 'mobile'){
        req.helpers.json.remove(data, 'loginData.data.email');
    }

    return await register(otpresp, docs, data, req, res, 'PARTIALLY_REGISTERED');
}

const init = async (otpresp, req, res, next) => {
    let docs = {
        email:null,
        mobile:null
    };
    let rval = {valid:true};
    let data = await token.get(req, res);
    let creq = req.helpers.request.dummy.create(req);
    let isemail = await hasDataFor(data, 'email', req);
    let ismobile = await hasDataFor(data, 'mobile', req);
    let type = req.helpers.json.val(data, 'loginData.type');
    /*-- login || link || register || partial-register --*/
        await setReqBody(data, creq);
    
    if(isemail){
        docs.email = await getDetailsByType(data, 'email', creq, res, next);
    }

    if(ismobile){
        docs.mobile = await getDetailsByType(data, 'mobile', creq, res, next);
    }

    switch (type){
        case 'link':
            rval = await link(otpresp, docs, data, creq, res);
        break;
        case 'login':
            rval = await login(otpresp, docs, data, creq, res);
        break;
        case 'register':
            rval = await register(otpresp, docs, data, creq, res, 'REGISTERED');
        break;
        case 'partial-register':
            rval = await partialRegister(otpresp, docs, data, creq, res);
        break;
        default:
            rval = await login(otpresp, docs, data, creq, res);
    };

    return rval;
}

exports.init = init;