const utils = process.aioBeLibs('helpers/_private/utils');
const messages = process.aioBeLibs('helpers/_private/utils/messages');

const iso = async (req, type, extend) => {
    const msg = req.helpers.json.val(messages, `country.list.${type}`, req.helpers.json.val(messages, 'default.enums'));
    return req.helpers.json.merge({
        "message":{
            "error":{
                "checks":{
                    "regex":msg,
                    "required":msg
                }
            }
        },
        "checks":{
            "regex":{
                "value":await req.helpers.enums.builder.async.init(req, ['country.list'], {node:type, regex:true})
            },
            "required":{
                "value":"required"
            }
        }
    }, (extend || {}))
}

const name = async (req, extend) => {
    return req.helpers.json.merge({
        "message":{
            "error":{
                "checks":{
                    "regex":utils.regex.country.name.message,
                    "required":"Country name is required."
                }
            }
        },
        "checks":{
            "regex": {
                "value":utils.regex.country.name.value
            },
            "required":{
                "value":"required"
            }
        }
    }, (extend || {}))
}

module.exports = {
    "name":async (req, extend) => { return await name(req, extend)},
    "iso2":async (req, extend) => { return await iso(req, 'iso2', extend)},
    "iso3":async (req, extend) => { return await iso(req, 'iso3', extend)}
}