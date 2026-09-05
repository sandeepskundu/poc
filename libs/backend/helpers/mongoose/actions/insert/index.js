const documents = require('./../docs');
const permission = process.aioBeLibs('helpers/_private/permission/validation');

const validate = async (details, config, model, req, res, next, messages, validation, list, index) => {
    let data = req.helpers.mongoose.docHelpers.runtime.parse(details, config, req, res, next);
    let rval = {
        path:false
    };

    try {
        let d = new model(data);
        let v = d.validateSync();
        let errs = req.helpers.json.val(v, 'errors', {});
        let elen = req.helpers.json.length(errs);

        if(elen > 0){
            for(const a in errs){
                let item = errs[a];
                let kind = req.helpers.json.val(item, 'kind');
                let path = req.helpers.json.val(item, 'path');

                let vobj = {
                    error:true,
                    valid:false,
                    message:req.helpers.json.val(item, 'message', "Invalid input") //req.helpers.json.val(messages, `${path}.${kind}`, "Invalid input"),
                }
    
                rval.valid = false;
                rval.validation = rval.validation || {};

                if(item.value != undefined){
                    vobj.value = item.value;
                }

                rval.validation = req.helpers.json.set(rval.validation, path, vobj);
            }
        }else{
            rval.doc = d;
        }
    } catch(err) {
        let vobj = {
            error:true,
            valid:false,
            message:err.message,
        }
        rval.valid = false;
        rval.validation = rval.validation || {};
        rval.validation = req.helpers.json.set(rval.validation, 'private', vobj);
    }

    return rval;
}

const parse = async (rval, config, data, model, req, res, next, messages, validation, list, index) => {
    let valid = await validate(data, config, model, req, res, next, messages, validation, list, index);
    let vobj = req.helpers.json.val(valid, 'validation', {});

        if(valid.valid != 'undefined' && valid.valid === false && rval.valid){
            rval.valid = false;
        }

        if(list){
            rval.validation.data.body.push(vobj);
        }else{
            rval.validation.data.body = vobj;
        }

        if(valid.doc){
            if(list){
                rval.docs[index] = valid.doc;
            }else{
                rval.docs = valid.doc;
            }

            //rval = await documents.map(rval, config, data, model, req, res, next, messages, validation, list, index)
        }

        // To be removed later 

        //rval = await documents.map(rval, config, data, model, req, res, next, messages, validation, list, index)

    return rval;
}

const rinvalid = async (arg, model, req, res, next) => {
    let rval = await req.helpers.express.response.getRespByCode(400, req, res, next);
        rval.data = req.helpers.json.val(arg, 'validation.data', {});

    return rval;
}

const addRuntime = async (docs, config, model, req, res) => {
    let rval = await req.helpers.mongoose.docHelpers.addRuntime(docs, config, model, req, res);
        rval = await req.helpers.mongoose.docHelpers.defaultValues.atInsert(rval, req, res);

    return rval;
}

const error = async (rval, error, doc, arg, config, model, list, req, res, next) => {
    return await req.helpers.mongoose.docHelpers.error.set(rval, error, doc, config, model, list, req, res, next);
}

const save = async (arg, config, model, list, req, res, next) => {
    let docs = await req.helpers.json.val(arg, 'docs');
    let rval = await req.helpers.express.response.getRespByCode(200, req, res, next);
        rval.data = list?[]:{};

        if(list){
            for(const a in docs){
                let item = docs[a];
                    item =  await addRuntime(item, config, model, req, res);
                try {
                    await item.save();
                    rval.data.push(item);
                    rval = await error(rval, false, item, arg, config, model, list, req, res, next);
                }catch(err) {
                    rval = await error(rval, err, item, arg, config, model, list, req, res, next);
                }
            }
        }else{
            docs =  await addRuntime(docs, config, model, req, res)
            try {
                await docs.save();
                rval.data = docs;
                rval = await error(rval, false, docs, arg, config, model, list, req, res, next);
            }catch(err) {
                rval = await error(rval, err, docs, arg, config, model, list, req, res, next);
            }
        }

    return rval;
}

const getModel = async (req, res, next) => {
    const m = req.helpers.json.val(req, 'dbUtils.model');

    return m || await req.helpers.express.docs.json.get('model', req, res, next);
}

const start = async (model, req, res, next) => {
    let rval = {
        docs:{},
        valid:true
    };

    let messages = {};
    let data = req.helpers.json.val(req, 'body.data', {});
    let list = req.helpers.data.type.isArray(data);
    let config = await getModel(req, res, next);
    let validation = req.helpers.json.val(req, 'runtime.validation.data.body', {});
        rval = req.helpers.json.set(rval, `validation.data.body`, list?[]:{});
    let pvv = await permission.start(config, req, res, next);
        
    if(pvv.valid){
        if(list && data.length > 0){
            for(const a in data){
                rval = await parse(rval, config, data[a], model, req, res, next, messages, validation[a], true, a);
            }
        }else{
            rval = await parse(rval, config, data, model, req, res, next, messages, validation, false);
        }

        if(rval.valid){
            return await save(rval, config, model, list, req, res, next)
        }else{
            return await rinvalid(rval, model, req, res, next);
        }
    }else{
        return pvv;
    }
}

exports.start = start;