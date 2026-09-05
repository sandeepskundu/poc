const match = require('./../../match');
const response = require('./../response');

const markvalid = async (val, message, req, res, next) => {
    return {
        value:val,
        valid:true,
        error:false,
        message:message
    }
}

const markinvalid = async (val, message, req, res, next) => {
    return {
        value:val,
        error:true,
        valid:false,
        message:message
    }
}

const check = async (type, conf, valuemap, req, res, next) => {
    let rval = {
        valid:true,
        validation:{}
    };

    for(let a in conf){
        if(conf[a] && conf[a].enable){
            let message = req.helpers.json.val(conf[a], 'message', {});
            let val = req.helpers.json.val(valuemap, `${type}.${a}`, '');

            if(val && (val.length === 24 || val.length === 32)){
                let vd = await match.start(val, req, res, next);

                if(vd.valid === false){
                    rval.valid = false;
                    rval.validation[a] = await markinvalid(val, (message.error || 'This feature is temporarily unavailable for your account. Please try again later.'), req, res, next);
                }else{
                    rval.validation[a] = await markvalid(val, (message.success || ''), req, res, next);
                }
            }else{
                rval.valid = false;
                rval.validation[a] = await markinvalid(val, (message.error || 'Please provide a valid value.'), req, res, next);
            }
        }

        if(rval.valid === false){
            break;
        }        
    }

    return rval;
}

const validate = async (config, item, req, res, next) => {
    const rval = {
        valid:true,
        validation:{}
    };

    return rval;
    const conf = req.helpers.json.val(config, 'access.request.configs', {});
    const conflen = req.helpers.json.length(conf);
    const values = req.helpers.express.validation.helpers.valuesmap(req, res, next);
    const order = ['params', 'query', 'body'];

    if(conflen > 0){
        for(let a in order){
            let n = order[a];
            let tconf = req.helpers.json.val(conf, n, {});
            let tconfLen = req.helpers.json.length(tconf || {});

            if(tconfLen > 0){
                let rv = await check(n, tconf, values, req, res, next);

                if(rval.valid && rv.valid === false){
                    rval.valid = rv.valid;
                    rval.validation[n] = rv.validation;
                }
            }
        };

        if(rval.valid){
            return rval;
        }else{
            let resp = await response.invalid(req, '');
                resp.data = req.helpers.json.val(rval, 'validation', {});

            return resp;
        }
    }else{
        return await response.invalid(req, 'PERMISSION_CONFIG_IS_INCORRECT')
    }
};

/*-- 
    This method validates request data permissons that user has read, write, delete or update permissons.
    To data that is persent in request body.
--*/

const init = async (config, item, req, res, next) => {
    let enable = req.helpers.json.val(config, 'access.request.enable', false);

    if(enable){
        return await validate(config, item, req, res, next);
    }else{
        return await response.valid(req);
    }
}

exports.init = init;