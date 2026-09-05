const required = (sign, data, vconfig, req, res, next) => {
    const rval = [];
    const map = ['_userId', '_merchantId']
    const childs = req.helpers.json.val(vconfig, 'childs', {});

    for(const a in map){
        let i = map[a];
        let r = req.helpers.json.val(childs, i);

        if(r){
            rval.push({...r, ...{
                "name":i
            }});
        }
    };

    return rval;
}

const rvalid = () => {
    return {
        error:false,
        valid:true
    }
}

const userId = (arg, data, sign, req, res, next) => {
    let rv = rvalid();
    let v = req.helpers.json.val(arg, 'checks.required.value');

    if(v){
        let error =  {
            error:true,
            valid:false
        };

        const ad = req.helpers.session.auth.authDetails(req, res);
        const uId = req.helpers.json.val(ad, 'userId');
        const suId = req.helpers.json.val(sign, arg.name);

        switch (v) {
            case 'required':
                if(uId && suId && uId === suId){
                    return req.helpers.validation.body({}, {});
                }else{
                    const valid = req.helpers.validation.body({}, {
                        _temp:arg
                    });

                    if(valid.valid){
                        rv = valid;
                    }else{
                        rv = req.helpers.json.val(valid, 'validation._temp', {});
                        error.message = req.getEnum(req, 'SIGNATURE.VALIDATION.MESSAGES.ERROR');
                        rv = {...error, ...rv};
                        rv.value = data;
                    }
                }
            break;
            case 'optional':
            break;
            default:
        }
    }

    return rv;
}

const merchantId = (arg, data, sign, req, res, next) => {
    let rv = rvalid();
    let v = req.helpers.json.val(arg, 'checks.required.value');

    if(v){
        let error =  {
            error:true,
            valid:false
        };

        const md = req.helpers.merchant.details(req, res, next);
        const mId = req.helpers.json.val(md, 'id');
        const muId = req.helpers.json.val(sign, arg.name);

        switch (v) {
            case 'required':
                if(mId && muId && mId === muId){
                    return req.helpers.validation.body({}, {});
                }else{
                    const valid = req.helpers.validation.body({}, {
                        _temp:arg
                    });

                    if(valid.valid){
                        rv = valid;
                    }else{
                        rv = req.helpers.json.val(valid, 'validation._temp', {});
                        error.message = req.getEnum(req, 'SIGNATURE.VALIDATION.MESSAGES.ERROR');
                        rv = {...error, ...rv};
                        rv.value = data;
                    }
                }
            break;
            case 'optional':
            break;
            default:
        }
    }

    return rv;
}

const runtime = (rval, sign, data, vconfig, req, res, next) => {
    const reqs = required(sign, data, vconfig, req, res, next);

    if(reqs && reqs.length > 0){
        let rv = {};

        for(const a in reqs){
            const item = reqs[a];

            switch (item.name) {
                case '_userId':
                    rv = userId(item, data, sign, req, res, next)
                break;
                case '_merchantId':
                    rv = merchantId(item, data, sign, req, res, next)
                break;
                default:
            }

            if(rv.valid === false){
                break;
            }
        }

        return rv;
    }

    return rval;
}

const check = (config, data, req, res, next) => {
    const error =  {
        error:true,
        valid:false,
        message:req.getEnum(req, 'SIGNATURE.VALIDATION.MESSAGES.REQUIRED'),
    };

    const signval = req.helpers.json.val(data, 'signature', {});
    const vconfig = req.helpers.json.val(config, 'validation', {});
    const sign = req.helpers.mongoose.docHelpers.signature.decode(data, req, res, next);
    const signl = req.helpers.json.length(sign);

    if(signl > 0){
        const childv = req.helpers.json.val(vconfig, 'childs', {});
        const valid = req.helpers.validation.body(sign, childv);

        if(valid.valid === false){
            let ops = req.helpers.json.val(valid, 'validation', {});
                error.message = req.getEnum(req, 'SIGNATURE.VALIDATION.MESSAGES.ERROR');

            let rval = {...error};

            for(const a in ops){
                if(ops[a].error){
                    rval = {...rval, ...ops[a]};
                    rval.value = signval;
                    break;
                }
            }

            return rval;
        }else{
            return runtime(valid, sign, signval, vconfig, req, res, next);
        }
    }else{
        const valid = req.helpers.validation.body({}, {
            _sk:req.helpers.json.val(vconfig, 'self', {})
        });

        if(valid.valid === false){
            let rv = req.helpers.json.val(valid, 'validation._sk', {});
                rv = {...error, ...rv}
                rv.value = signval;

            return rv;
        }else{
            return runtime(valid, sign, signval, vconfig, req, res, next);
        }
    }
}

const body = (rval, signature, data, type, req, res, next) => {
    let isArr = req.helpers.data.type.isArray(data);

    if(isArr){
        for(const a in data){
            let valid = check(signature, data[a], req, res, next);
                rval.validation[a].signature = valid;

                if(rval.valid && valid && valid.valid === false){
                    rval.valid = false;
                }
        }
        
    }else{
        let valid = check(signature, data, req, res, next);
            rval.validation.signature = valid;

            if(rval.valid && valid && valid.valid === false){
                rval.valid = false;
            }
    }

    return rval;
}

const validate = (rval, signature, data, type, req, res, next) => {
    const from = req.helpers.json.val(signature, 'from');
    const enable = req.helpers.json.val(signature, 'enable');

    if(enable && from === type){
        if(from === 'body'){
            rval = body(rval, signature, data, type, req, res, next)
        }else{

        }
    }

    return rval;
}

exports.validate = validate;