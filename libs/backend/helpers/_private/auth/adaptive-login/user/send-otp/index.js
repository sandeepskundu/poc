const actions = require('./actions');
const helpers = require('./../helpers');
const validation = require('./validations');
const auth = process.aioBeLibs('helpers/_private/auth');
const utils = process.aioBeLibs('helpers/_private/utils');
const session = process.aioBeLibs('helpers/_private/session');

const setBody = async (arg, type, req) => {
        req.body = req.body || {};
    let data = {
        email:req.helpers.json.val(req, 'body.email', {}),
        mobile:req.helpers.json.val(req, 'body.mobile', {})
    }

    req.body.data = {...data, ...{org:data}};
}

const getHasDataFor = async (arg, req) => {
    let loginBy = req.helpers.json.val(arg, 'configs.loginBy');
    let hasDataFor = req.helpers.json.val(arg, 'configs.hasDataFor', 'both');

    if(hasDataFor != 'both' && hasDataFor != loginBy){
        return loginBy;
    }else{
        return hasDataFor;
    }
}

const setConfigs = async (arg, req) => {
    let rval = req.helpers.json.copy(arg);
    let hasDataFor = await getHasDataFor(arg, req);
    let loginBy = req.helpers.json.val(arg, 'configs.loginBy', 'mobile');
        rval = req.helpers.json.set(rval, 'configs.loginBy', loginBy, false, true);
        rval = req.helpers.json.set(rval, 'configs.hasDataFor', hasDataFor, false, true);
        await setBody(arg, loginBy, req);

    return rval;
}

const  init = async (config, pReq, res, next) => {
    const sample = {
        data:{
            mobile:{
                isd:91,
                iso2:"IN",
                iso3:"IND",
                number:"9000000009"
            },
            email:{
                id:"j@gmail.com"
            }
        },
        configs:{
            loginBy:'email' // email/mobile
        }
    }

    let req = pReq.helpers.request.dummy.create(pReq);
        await helpers.setReqData(config, req, pReq, res, next);

    let details = await setConfigs(config, req);
    let ad = await session.details(req);

    if(ad && ad.login === 1){
        return await req.helpers.json.val(auth, 'constants.RESPONSES.ERRORS.USER_AUTHORISED_ALREADY')
    }else{
        const cvalid = await validation.validateConfig(details, req, res, next);

        if(cvalid.valid){
            const dvalid = await validation.init(details, req, res, next);

            if(dvalid.valid){
                return await actions.init(details, req, res, next)
            }else{
                return dvalid;
            }
        }else{
            return req.helpers.json.merge(cvalid, await req.helpers.json.val(auth, 'constants.RESPONSES.ERRORS.ACCOUNT_ADAPTIVE_LOGIN_UTILITY_INCORRECT_CONFIG'));
        }
    }
}

exports.init = init;