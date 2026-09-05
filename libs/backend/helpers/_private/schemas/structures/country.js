const utils = process.aioBeLibs('helpers/_private/utils');
const messages = process.aioBeLibs('helpers/_private/utils/messages')

const iso = async (req, type, extend) =>  {
    const msg = req.helpers.json.val(messages, `country.list.${type}`, req.helpers.json.val(messages, 'default.enums'));

    return req.helpers.json.merge({
        "type":`stringKey`,
        "configs":{
            "mongodb":{
                "trim":true,
                "match":{
                    "enable":true,
                    "message":msg,
                    "value":`${await req.helpers.enums.builder.async.init(req, ['country.list'], {node:type, regex:true})}`
                },
                "required":{
                    "value":true,
                    "enable":true,
                    "message":msg
                },
                "default":{
                    "enable":true,
                    "value":null
                }
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
                const regex = new RegExp("${req.helpers.json.val(utils, `regex.country.name.value`)}");
                return regex.test(v);
            }
        },
        message: props => ({
            path: props.path,
            message:"${req.helpers.json.val(utils, `regex.country.name.message`, '')}"
        })
    }`
}

const name = async (req, extend) => {
    return req.helpers.json.merge({
        "type":`string`,
        "configs":{
            "mongodb":{
                "trim":true,
                "required":{
                    "value":true,
                    "enable":true,
                    "message":req.helpers.json.val(messages, 'default.required')
                },
                "validate":await validation(req, 'fmn')
            }
        }
    }, (extend || {}))
}

const iso2 = async (req, extra) => { return await iso(req, 'iso2', extra)};

const iso3 = async (req, extra) => { return await iso(req, 'iso3', extra)}

const complete = async (req, extend) => {
    return {
        iso2:await iso2(req, req.helpers.json.val(extend, 'iso2', {})),
        iso3:await iso3(req, req.helpers.json.val(extend, 'iso3', {})),
        name:await name(req, req.helpers.json.val(extend, 'name', {}))
    }
}

exports.iso2 = iso2;
exports.iso3 = iso3;
exports.name = name;
exports.complete = complete;