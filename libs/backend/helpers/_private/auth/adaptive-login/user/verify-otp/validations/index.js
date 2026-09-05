
const bodyv = require('./body');
const token = require('./../../token');
const response = require('./../../response');

const validateBody = async (req, res, next) => {
    let body = await bodyv(req);
    let valuemap = req.helpers.express.validation.helpers.valuesmap(req, res, next);
    let rval =  await req.helpers.validation.body(req.body, body, valuemap);
        rval.data = {
            body:rval.validation
        }
        delete rval.validation;

    return rval;
}

const validateToken = async (req, res, next) => {
    const tknval = await token.get(req, res);

    if(tknval){
        return {valid:true}
    }else{
        return await response.invalid('ACCOUNT_ADAPTIVE_LOGIN_INVAILD_TOKEN', req, res, 'data.body.loginWithOtpData.token')
    }
}

const init = async (req, res, next) => {
    let bv = await validateBody(req, res, next);

    if(bv.valid){
        return await validateToken(req, res, next);
    }else{
        return bv;
    }
}

exports.init = init;