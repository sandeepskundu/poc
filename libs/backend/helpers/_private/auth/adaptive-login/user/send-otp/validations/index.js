const email = require('./email');
const mobile = require('./mobile');
const configv = require('./configs');

const map = {
    email:email,
    mobile:mobile,
    both:{...email, ...mobile}
}

const getType = async (arg, req, res, next) => {
    let loginBy = req.helpers.json.val(arg, 'configs.loginBy');
    let hasDataFor = req.helpers.json.val(arg, 'configs.hasDataFor', 'both');

    if(hasDataFor != 'both' && hasDataFor != loginBy){
        return loginBy;
    }else{
        return hasDataFor;
    }
}

const init = async (arg, req, res, next) => {
    let type = await getType(arg, req, res, next);
    let valuemap = req.helpers.express.validation.helpers.valuesmap(req, res, next);
    let rval = await req.helpers.validation.body(req.helpers.json.val(req, 'body', {}), req.helpers.json.val(map, type, map.both), valuemap);
        rval.data = {
            body:rval.validation
        }
        delete rval.validation;

    return rval;
}

const validateConfig = async (arg, req, res, next) => {
    let valuemap = req.helpers.express.validation.helpers.valuesmap(req, res, next);
    let rval = await req.helpers.validation.body(arg, configv, valuemap);
        rval.data = {
            body:rval.validation
        };

        delete rval.validation;

    return rval;
}

exports.init = init;
exports.validateConfig = validateConfig;