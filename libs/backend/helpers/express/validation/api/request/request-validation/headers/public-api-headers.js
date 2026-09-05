//const auth = process.compiler('models/session/auth')

const getResp = (rval, valid, message) => {
    rval.valid = valid,
    rval.validation = rval.validation || {
        error:!valid,
        valid:valid,
        message:message || ''
    }

    rval.validation.valid = valid;
    rval.validation.error = !valid;
    rval.validation.message = message || '';

    if(valid){
        rval.status = {
            code:200,
        }
        delete rval.validation.code;
    }else{
        rval.status = {
            code:400,
        };
        rval.validation.code = 'INVALID_REQ_HEADER'
    }

    return rval;
}

const channelId = (rval, type, value, validation, req, res, next) => {
    const enums = req.helpers.json.get(validation, `enums`, {});
    const msg = req.helpers.json.get(validation, `message.error`);

    if(enums && !enums[value]){
        rval = getResp(rval, false, msg);
    }

    return rval;
}

const traceId = (rval, type, value, validation, req, res, next) => {
    const ws = req.helpers.session.auth.sessionDetails(req, res);
    const from = req.helpers.json.get(validation, `value.from`);
    const msg = req.helpers.json.get(validation, `message.error`);

    switch(from) {
        case 'window-session':
            const tId = req.helpers.json.get(ws, 'traceId');
            const hval = req.helpers.json.get(req, 'headers.traceid');
            if(tId != hval){
                rval = getResp(rval, false, msg);
            }
        break;
        default:
    }

    return rval;
}

const data = (rval, type, value, validation, req, res, next) => {
    const msg = req.helpers.json.get(validation, `message.error`);

    switch(type) {
        case 'channelid':
            rval = channelId(rval, type, value, validation, req, res, next);
        break;
        case 'traceid':
            rval = traceId(rval, type, value, validation, req, res, next);
            /*--
            const jwt = req.helpers.jwt.sign({
                "cd":"IND_91_8826410930__sandeepskundu@gmail.com",
                "pd":"SK_MR_Sandeep_kumar_kundu__28061990",
                "id":"ABCDABCDABCDABCDABCDABCDABCDABCDABCDABCDABCDABCD",
                "sID":"ABCDABCDABCDABCDABCDABCDABCDABCDABCDABCDABCDABCD",
                "valid":"ABCDABCDABCDABCDABCDABCDABCDABCDABCDABCDABCDABCD"
            });
            const t = req.helpers.crypto.en(JSON.stringify({
                "cd":"IND_91_8826410930__sandeepskundu@gmail.com",
                "pd":"SK_MR_Sandeep_kumar_kundu__28061990",
                "id":"ABCDABCDABCDABCDABCDABCDABCDABCDABCDABCDABCDABCD",
                "sID":"ABCDABCDABCDABCDABCDABCDABCDABCDABCDABCDABCDABCD",
                "valid":"ABCDABCDABCDABCDABCDABCDABCDABCDABCDABCDABCDABCD"
            }));

            const td = req.helpers.crypto.de(t, 'liundi');
            const tde = req.helpers.crypto.de(t);
            const jwtd = req.helpers.jwt.verify(jwt);
            const jwtde = req.helpers.jwt.verify(jwt, 'ksksk');

            console.log(td);
            console.log(tde);
            console.log(jwtd);
            console.log(jwtde);--*/
        break;
        case 'clientid':
            
        break;
        case 'signatureid':

        break;
        case 'subscriptionid':
            
        break;
        default:
    }

    return rval;
}

const required = (rval, type, value, validation, req, res, next) => {
    const rtype = req.helpers.json.get(validation, `required`);
    const msg = req.helpers.json.get(validation, `message.error`);
    switch(rtype) {
        case 'optional':
        break;
        case 'required':
            if(!value){
                rval = getResp(rval, false, msg);
            }
        break;
        default:
    }

    return rval;
}

const validate = (validation, req, res, next) => {
    let headers = req.helpers.json.get(req, `headers`);
    let hConfig = req.helpers.json.length(validation);
    let rval = getResp({}, true, req.helpers.json.get(validation, `message.success`));

    if(hConfig > 0){
        for(const a in validation){
            rval = required(rval, a, headers[a], validation[a], req, res, next);

            if(rval && rval.valid){
                rval = data(rval, a, headers[a], validation[a], req, res, next);
            }

            if(rval && rval.valid === false){
                break;
            }
        }
    }

    return rval;
}

exports.validate = validate;
exports.validateResp = getResp;