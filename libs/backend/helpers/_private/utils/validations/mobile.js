const utils = process.aioBeLibs('helpers/_private/utils');
const messages = process.aioBeLibs('helpers/_private/utils/messages');

const get = async (req, type) => {
    const msg = req.helpers.json.val(messages, `country.isds.${type}`, req.helpers.json.val(messages, 'default.enums'));

    return {
        "message":{
            "error":{
                "regex":{
                    "enums":msg,
                    "required":msg
                }
            }
        },
        "checks":{
            "regex":{
                "value":await req.helpers.enums.builder.async.init(req, ['country.isds'], {node:type, regex:true})
            },
            "required":{
                "value":"required"
            }
        }
    }
}

module.exports = {
    "isd":async (req) => { return await get(req, 'isd')},
    "iso2":async (req) => { return await get(req, 'iso2')},
    "iso3":async (req) => { return await get(req, 'iso3')},

    "number":{
        "message":{
            "error":{
                "checks":{
                    "regex":utils.regex.mobile.dom.message,
                    "required":"Mobile number is required."
                }
            }
        },
        "checks":{
            "regex": {
                "value":utils.regex.mobile.dom.value
            },
            "required":{
                "value":"required"
            }
        }
    },

    "details":{
        "message": {
            "error": {
                "checks": {
                    "regex":"Please provide a valid mobile number",
                    "required": "Mobile number is required."
                }
            }
        },
        "checks":{
            "regex":{
                "value":utils.regex.numberOnly.value,
            },
            "required":{
                "value":'mobile'
            }
        }
    }
}