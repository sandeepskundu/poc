const verify = require('./verify');
const action = require('./actions');
const helpers = require('./../helpers');
const validation = require('./validations');
const auth = process.aioBeLibs('helpers/_private/auth');
const session = process.aioBeLibs('helpers/_private/session');

const  init = async (config, pReq, res, next) => {
    let ad = await session.details(pReq);
    let req = pReq.helpers.request.dummy.create(pReq);
        await helpers.setReqData(config, req, pReq, res, next);

    if(ad && ad.login === 1){
        return await req.helpers.json.val(auth, 'constants.RESPONSES.ERRORS.USER_AUTHORISED_ALREADY')
    }else{
        let vresp = await validation.init(req, res, next);

        if(vresp.valid){
            let otpresp = await verify.init(req, res, next);

            if(otpresp.valid){
                return await action.init(otpresp, req, res, next);
            }else{
                return await helpers.mapValidationResp(otpresp, config, req);
            }
        }else{
            return await helpers.mapValidationResp(vresp, config, req);
        }
    }
}

exports.init = init;