const update = require('./update');
const _delete = require('./../delete/delete');
const permission = process.aioBeLibs('helpers/_private/permission/validation');

const rinvalid = async (arg, model, req, res, next) => {
    let rval = await req.helpers.json.val(arg, 'validation');

    if(rval){
        return rval;
    }else{
        return await req.helpers.mongoose.query.error(req, res, next, false)
    }
}

const respByCode = async (req, res, next, arg, code) => {
    return await req.helpers.express.response.getRespByCode(code || 400, req, res, next, arg);
}

const find = async (rval, query, details, model, docConfig, messages, isList, req, res, next) => {
    let doc = [];
    //let qp = await req.helpers.json.val(query, 'data');
    let qp = await req.helpers.mongoose.query.build(docConfig, model, {}, details, req, res, next);
        //qp = req.helpers.mongoose.docHelpers.runtime.mapvalues(qp, docConfig, req, res, next);

    if(qp.valid && qp.data){
        doc = await model.find(qp.data);

        if(doc && doc[0]){
            let d = {
                qp:qp,
                db:doc[0],
                apiData:details
            }
    
            if(isList){
                rval.data.push(d);
            }else{
                rval.data = d;
            }
        }else{
                rval.valid = false
            let ev = {
                "error":true,
                "valid":false,
                "message":"record not found",
                "value":req.helpers.mongoose.docHelpers.transform.start(details, false, docConfig, model, req, res, next),
            };

            if(isList){
                rval.data.push(ev);
            }else{
                rval.data = ev;
            }
        }
    }else{
            rval.valid = false
        let vd = {
            "valid":true,
            "error":false,
            "value":req.helpers.mongoose.docHelpers.transform.start(details, false, docConfig, model, req, res, next),
            "message":"",
        }
        if(isList){
            rval.data.push(vd);
        }else{
            rval.data = vd;
        }
    }

    return rval;
}

const getDocs = async (data, model, docConfig, messages, isList, req, res, next) => {
    let rval = {
        valid:true,
        data:isList?[]:{},
        validation:isList?[]:{}
    };

    let docs = await req.helpers.json.val(data, 'docs', {});
    let details = await req.helpers.json.val(data, `details`, {}) 

    if(isList){
        for(const a in docs){
            rval = await find(rval, docs[a], details[a], model, docConfig, messages, isList, req, res, next);
        }
    }else{
        rval = await find(rval, docs, details, model, docConfig, messages, isList, req, res, next)
    }

    return rval;
}

const tovalidation = async (arg, req, res, next) => {
    if(arg.apiData){
        return {
            message:'',
            valid:true,
            error:false,
            value:arg.apiData || {}
        }
    }

    return arg;
}

const pvalidation = async (data, isList, req, res, next) => {
    let rv = isList?[]:{};

    if(isList){
        for(const a in data){
            rv.push(await tovalidation(data[a], req, res, next));
        }
    }else{
        rv = await tovalidation(data, req, res, next);
    }
    
    return rv;
}

const parse = async (data, model, docConfig, messages, isList, req, res, next, isDelete) => {
    let rval = await getDocs(data, model, docConfig, messages, isList, req, res, next);

    if(rval.valid){
        if(isDelete){
            return await _delete.start(rval, model, docConfig, messages, isList, req, res, next);
        }else{
            return await update.start(rval, model, docConfig, messages, isList, req, res, next);
        }
    }else{
        let rv = await respByCode(req, res, next, {}, 404);
            rv.data = await pvalidation(req.helpers.json.val(rval, 'data', isList?[]:{}), isList, req, res, next);

        return rv;
    }
}

const signature = async (item, model, docConfig, req, res, next) => {
    let sign = await req.helpers.mongoose.docHelpers.signature.decode({
        signature:req.helpers.json.val(item, 'signature', {})
    }, req, res, next);

    let signl = req.helpers.json.length(sign || {});

    if(signl && signl > 0){
        return {
            data:{...sign, ...{_deleted:0}},
            valid:true
        }
    }else{
        return {
            data:item,
            valid:false
        }
    }
}

const query = async (rval, data, model, req, list, docConfig, index, res, next) => { 
    let sdata = {signature:req.helpers.json.val(data, 'signature')};
    let qpValid = await signature(sdata, model, docConfig, req, res, next);
        data = req.helpers.mongoose.docHelpers.runtime.parse(data, docConfig, req, res, next);

        rval.docs = rval.docs || {};
        rval.details = rval.details || {};
        rval.validation = false;

        if(list){
            rval.docs[index] = qpValid;
            rval.details[index] = data;
        }else{
            rval.docs = qpValid;
            rval.details = data;
        }

        if(!qpValid.valid){
            rval.valid = false
            rval.validation = qpValid;
            rval.validation.data = false
        }

    return rval;
};


const start = async (model, req, res, next, isDelete) => {
    let validate = {
        docs:{},
        valid:true
    };

    let messages = {};
    let data = req.helpers.json.val(req, 'body.data', {});
    let list = req.helpers.data.type.isArray(data);
    let config = await req.helpers.express.docs.json.get('model', req, res, next);
    let validation = req.helpers.json.val(req, 'runtime.validation.data.body', {});
        validate = req.helpers.json.set(validate, `validation.data.body`, list?[]:{});
    let pvv = await permission.start(config, req, res, next);
    let rtime = await req.helpers.mongoose.docHelpers.addRuntime({}, config, model, req, res, next);
        model.runtime = rtime.runtime || {};

    if(pvv.valid){
        if(list && data.length > 0){
            for(const a in data){
                validate = await query(validate, data[a], model, req, true, config, a, res, next);
            }
        }else{
            validate = await query(validate, data, model, req, false, config, false, res, next);
        }

        if(validate.valid){
            return await parse(validate, model, config, messages, list, req, res, next, isDelete)
        }else{
            return await rinvalid(validate, model, req, res, next);
        }
    }else{
        return pvv;
    }
}

exports.start = start;