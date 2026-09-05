const dmaker = require('./../data');
const response = require('./response');
const cookie = require('./../../cookie');
const modelConfigs = require('./../configs');
const collection = require('./../colletion');
const utils = process.aioBeLibs('helpers/_private/utils');

const validate = async (data, req, res) => {
    let model = await collection.model(req, res);
    let rval = {
        valid:true
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

const addRuntime = async (docs, config, model, req, res) => {
    let rval = await req.helpers.mongoose.docHelpers.addRuntime(docs, config, model, req, res);
        rval = await req.helpers.mongoose.docHelpers.defaultValues.atInsert(rval, req, res);

    return rval;
}

const error = async (rval, error, doc, config, model, req, res) => {
    return await req.helpers.mongoose.docHelpers.error.set(rval, error, doc, config, model, false, req, res);
}

const save = async (arg, req, res) => {
    let model = await collection.model(req, res);
    let docs = await req.helpers.json.val(arg, 'doc', {});
    let config = await modelConfigs.get(req, res, 'CREATE');
    let rval = await req.helpers.express.response.getRespByCode(200, req, res);
        docs = await addRuntime(docs, config, model, req, res);
        rval.data = {};

    try {
        await docs.save();
        rval.data = docs;
        rval = await error(rval, false, docs, config, model, req, res);
    }catch(err) {
        delete rval.data;
        rval = await error(rval, err, docs, config, model, req, res);
        rval.error = req.helpers.json.val(utils, 'constants.otp.RESPONSE.ERRORS.CREATE')
    };

    return rval;
}

const init = async (conf, otp, data, req, res) => {
    let d = req.helpers.json.copy(otp);
        d.recipients = req.helpers.json.val(conf, 'recipients', {});
        d = await dmaker.encodeData(d, req, res);

    let rval = await validate(d, req, res);

    if(rval.valid){
        const rv = await save(rval, req, res);

        if(rv.valid){
            rv.status = rv.status || {};
            rv.status.rcode= 'OTP_SENT';

            return await response.sucess(rv, conf, otp, req, res);
        }

        return rv;
    }

    return rval;
}

exports.init = init;