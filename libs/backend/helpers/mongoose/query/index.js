const find = require('./find');
const hidden = require('./hidden');
const rumtime = require('./runtime');

const error = async (req, res, next, data) => {
    return await req.helpers.express.response.getRespByCode(400, req, res, next, {
        valid:false,
        data:data || false,
        error:{
            code:'INVALID_QUERY',
            description:'Invalid query or payload of the request.'
        } 
    });
}

const isPredefinedOnly = async (query, config, model, item, req, res, next) => {
    let qp = await req.helpers.json.copy(query);
        delete qp._deleted;
        delete qp._merchantId;
    let qpLen = await req.helpers.json.length(qp || {});

    if(qpLen && qpLen > 0){
        return false;
    }else{
        return true;
    }
}

const validate = async (query, config, model, item, req, res, next) => {
    let isQpObj = await req.helpers.data.type.isObject(query || {});
    let isQpList = await req.helpers.data.type.isArray(query || {});
    let qpLen = await req.helpers.json.length(query || {});
    let pd = await isPredefinedOnly(query, config, model, item, req, res, next);
    let noLengthCheck = req.helpers.json.val(config, 'query.otherConfigs.doNotCheckQueryLength')

    if((!pd && !isQpList && isQpObj && qpLen && qpLen > 0) || (noLengthCheck === true)){
        return {
            data:query,
            valid:true
        }
    }else{
        return await error(req, res, next, query)
    }
}

const validSchemaAndValues = async (config, model, doc, item, req, res, next) => {
    const schema = req.helpers.json.val(config, 'schema', {});
    const defaultv = req.helpers.json.val(config, 'values.default', {});
    const hardcode = req.helpers.json.val(config, 'values.hardcoded', {});

    const schemal = req.helpers.json.length(schema);
    const defaultvl = req.helpers.json.length(defaultv);
    const hardcodel = req.helpers.json.length(hardcode);

    if((defaultvl > 0 || hardcodel > 0) && schemal <= 0){
        return false;
    }else{
        return true;
    }
}

const build = async (config, model, doc, item, req, res, next) => {
    let valid = await validSchemaAndValues(config, model, doc, item, req, res, next);

    if(valid){
        item = await req.helpers.mongoose.docHelpers.runtime.parse((item || {}), config, req, res, next);
    let rval = await hidden.get(config, model, item, req, res, next);
        rval = await rumtime.start(rval, config, model, doc, item, req, res, next);
        return await validate(rval, config, model, item, req, res, next);
    }else{
        return await error(req, res, next, item)
    }
}

exports.find = find;
exports.build = build;
exports.error = error;