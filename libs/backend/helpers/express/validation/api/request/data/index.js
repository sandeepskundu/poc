const signature = require('./signature');

const mapDocs = (validation, req, res, next) => {
    let type = req.helpers.json.val(req, 'runtime.validationConfig.request.body.type');

    if(type === 'multipart-list' || type === 'multipart'){
        req.multer = req.multer || {};
        req.multer.docs = req.helpers.json.val(validation, 'body.docs', {})
    }
}

const compileResp = (validation, req, res, next) => {
    let rval = {
        data:{},
        valid:true
    }

    for(const a in validation){
        const item = validation[a];
        const v = req.helpers.json.get(item, 'validation', {});
        const isArr = req.helpers.data.type.isArray(v);

        if(rval.valid && item.valid === false){
            rval.valid = false;
        }

        if((isArr && v.length > 0) || (!isArr && req.helpers.json.length(v) > 0)){
            rval.data[a] = req.helpers.json.get(item, 'validation', {});
        }
    }

    if(rval.valid){
        mapDocs(validation, req, res, next);
        rval = req.helpers.express.response.getRespByCode(200, req, res, next, {data:rval.data})
    }else{
        rval = req.helpers.express.response.getRespByCode(400, req, res, next, {data:rval.data})
    }

    return rval;
}

const validate = (validation, req, res, next) => {
    const map = {};
    const values = req.helpers.express.validation.helpers.valuesmap(req, res, next);
    const order = ['headers', 'cookies', 'auth', 'signature', 'params', 'query', 'body'];

    for(const a in order){
        const on = order[a];
        const sign = req.helpers.json.val(validation, 'signature', {});

        if(req[on] && validation[on]){
            const data = req[on];
            const vconfig = validation[on];

            switch(on) {
                case 'signature':
                    debugger;
                break;
                case 'headers':
                    // code block
                break;
                case 'cookies':
                    // code block
                break;
                case 'auth':
                    // code block
                break;
                case 'params':
                    let pvd = req.helpers.validation.params(data, vconfig, values);
                        pvd = signature.validate(pvd, sign, data, on, req, res, next);
                        map[on] = pvd;
                break;
                case 'query':
                    let qvd = req.helpers.validation.query(data, vconfig, values);
                        qvd = signature.validate(qvd, sign, data, on, req, res, next);
                        map[on] = qvd;
                break;
                default:
                    let d = req.helpers.json.get(data, 'data', {});
                    let vd = req.helpers.validation.body(d, vconfig, values);
                        vd = signature.validate(vd, sign, d, on, req, res, next);
                        map[on] = vd;
            }
        }
    }

    return compileResp(map, req, res, next);
}

exports.validate = validate;