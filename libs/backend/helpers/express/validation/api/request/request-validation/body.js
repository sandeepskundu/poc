const path = require('path');

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
        rval.validation.code = 'INVALID_REQ_BODY'
    }

    return rval;
}

const required = (rval, rtype, data, validation, req, res, next) => {
    const msg = req.helpers.json.get(validation, `message.error`);

    switch(rtype) {
        case 'optional':
        break;
        case 'required':
            if(!data){
                rval = getResp(rval, false, msg);
            }
        break;
        case 'nothing':
            if(data){
                rval = getResp(rval, false, msg);
            }
        break;
        default:
    }

    return rval;
}

const multipart = (rval, data, validation, req, res, next, msg, isList) => {
    const bdata = req.helpers.json.val(req, 'body.data')
    const isObj = req.helpers.data.type.is(bdata, 'object');
    const isAList = req.helpers.data.type.is(bdata, 'array');

    if(isList){
        const dl = bdata?.length || 0;
        const min = validation.min || 1;
        const max = validation.max || 1;

        if(!isAList){
            rval = getResp(rval, false, msg);
        }

        if((min && max) && (dl < min || dl > max)){
            rval = getResp(rval, false, msg);
        }
    }else{
        if(!isObj || isAList){
            rval = getResp(rval, false, msg);
        }
    }

    return rval;
}

const type = (rval, data, validation, req, res, next) => {
    const dval = req.helpers.random.id(24);
    const type = req.helpers.json.get(validation, `type`);
    const isList = req.helpers.data.type.is(data, 'array');
    const msg = req.helpers.json.get(validation, `message.error`);
    const hct = req.helpers.json.val(req, 'headers.content-type', dval);
    const ismultipart = (hct.indexOf('multipart/form-data;') === 0);

    switch(type) {
        case 'object':
            const isObj = req.helpers.data.type.is(data, 'object');
            
            if(!isObj || isList){
                rval = getResp(rval, false, msg);
            }
        break;
        case 'multipart':
            if(ismultipart){
                rval = multipart(rval, data, validation, req, res, next, msg, false);
            }else{
                rval = getResp(rval, false, msg);
            }
        break;
        case 'multipart-list':
            if(ismultipart){
                rval = multipart(rval, data, validation, req, res, next, msg, true);
            }else{
                rval = getResp(rval, false, msg);
            }
        break;
        case 'list':
            const dl = data?.length || 0;
            const min = validation.min || 1;
            const max = validation.max || 1;

            if(!isList){
                rval = getResp(rval, false, msg);
            }

            if((min && max) && (dl < min || dl > max)){
                rval = getResp(rval, false, msg);
            }
        break;
        default:
    }

    return rval;
}

const validateFile = (rval, file, req) => {
    let item = file;
    let isvalid = req.helpers.validation.image.mime.global(req, item);
    if(isvalid){
        let field = req.helpers.json.val(item, 'fieldname', '');
        let name = req.helpers.json.val(item, 'originalname', '');
            item.ext = path.extname(name);
            rval[field] = rval[field] || [];
            rval[field].push(item);
    }

    return rval;
}

const files = (req, res, next) => {
    let rval = {};
    let files = req.helpers.json.val(req, 'files', []);

    if(files && files.length > 0){
        for(const a in files){
            rval = validateFile(rval, files[a], req);
        }
        delete req.files;
    }else{
        let file = req.helpers.json.val(req, 'file');

        if(file){
            rval = validateFile(rval, file, req);
        }

        delete req.file
    }

    return rval;
}

const setMulterData = (validation, req, res, next) => {
    const type = req.helpers.json.get(validation, `type`);

    if(type === 'multipart' || type === 'multipart-list'){
        let dval = req.helpers.random.id(24);
        let body = req.helpers.json.val(req, `body.body`, dval);
            req.multer = req.multer || {};
            req.multer.docs = files(req, res, next);

        if(body != dval){
            try {
                req.body = JSON.parse(body);
            } catch (err) {
                req.body = {};
            }
        }
    }
}

const validate = (validation, req, res, next) => {

    /*--{
        "min":1,
        "max":10,
        "type":"object", // list|object|multipart|multipart-list
        "required":"optional", // required|nothing|optional
        "message":{
            "error":"Only put method is allowed",
            "success":"Only put method is allowed"
        }
    }--*/

        setMulterData(validation, req, res, next);
    let data = req.helpers.json.get(req, `body.data`);
    let rtype = req.helpers.json.get(validation, `required`);
    let rval = getResp({}, true, req.helpers.json.get(validation, `message.success`))
        rval = required(rval, rtype, data, validation, req, res, next);

    if(rval && rval.valid){
        rval = type(rval, data, validation, req, res, next)
    }

    return rval;
}

exports.validate = validate;