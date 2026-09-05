const utils = process.aioBeLibs('helpers/_private/utils');
const messages = process.aioBeLibs('helpers/_private/utils/messages');

const required = (req) => {
    return {
        "value":true,
        "enable":true,
        "message":req.helpers.json.val(messages, 'default.required')
    }
}

const title = async (req, type, extend) => {
    return req.helpers.json.merge({
        "type":`stringKey`,
        "configs":{
            "mongodb":{
                "trim":true,
                "enum":{
                    "enable":true,
                    "value":`${await req.helpers.enums.builder.async.init(req, [`name.titles.${type}`], {node:'id', asstring:true})}`,
                    "message":req.helpers.json.val(messages, `name.titles`, req.helpers.json.val(messages, 'default.enums'))
                },
                "required":required(req)
            }
        }
    }, (extend || {}))
}

const validation = async (req, name) => {
    return `{
        validator: async function (value) {
            if (!value) {
                return true;
            }else{
                const regex = new RegExp("${req.helpers.json.val(utils, `regex.name.${name}.value`)}");
                return regex.test(value);
            }
        },
        message: props => ({
            path: props.path,
            message:"${req.helpers.json.val(utils, `regex.name.${name}.message`, '')}"
        }),
    }`
}

const fn = async (req, extend, type) => {
    return req.helpers.json.merge({
        "type":`string`,
        "configs":{
            "mongodb":{
                "trim":true,
                "required":required(req),
                "validate":await validation(req, (type || 'fn')),
            }
        }
    }, (extend || {}))
}

const mn = async (req, extend) => {
    return req.helpers.json.merge({
        "type":`string`,
        "configs":{
            "mongodb":{
                "trim":true,
                "validate":await validation(req, 'mn'),
            }
        }
    }, (extend || {}))
}

const ln = async (req, extend) => {
    return await fn(req, extend, 'ln')
}

const fmn = async (req, extend) => {
    return await fn(req, extend, 'fmn')
}

const complete = async (req, extend) => {
    return {
        name:{
            type:"nested",
            schema:{
                fn:await fn(req, req.helpers.json.val(extend, 'name.fn', {})),
                mn:await mn(req, req.helpers.json.val(extend, 'name.mn', {})),
                ln:await fn(req, req.helpers.json.val(extend, 'name.ln', {}), 'ln'),
                title:await title(req, 'all', req.helpers.json.val(extend, 'title', {})),
            }
            
        }
    }
}

exports.ln = ln;
exports.fn = fn;
exports.mn = mn;
exports.fmn = fmn;
exports.title = title;
exports.complete = complete;