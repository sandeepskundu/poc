const utils = process.aioBeLibs('helpers/_private/utils');
const messages = process.aioBeLibs('helpers/_private/utils/messages')

const optional = async (req) => {
    return {
        "message":{
            "error":{
                "checks":{
                    "required":req.helpers.json.val(messages, 'default.required'),
                    "regex":req.helpers.json.val(utils, `regex.hashmap.optional.message`, '')
                }
            }
        },
        "checks":{
            "regex": {
                "value":req.helpers.json.val(utils, `regex.hashmap.optional.value`)
            },
            "required":{
                "value":"required"
            }
        }
    }
}

const required = async (req) => {
    return {
        "message":{
            "error":{
                "checks":{
                    "required":req.helpers.json.val(messages, 'default.required'),
                    "regex":req.helpers.json.val(utils, `regex.hashmap.required.message`, '')
                }
            }
        },
        "checks":{
            "regex": {
                "value":req.helpers.json.val(utils, `regex.hashmap.required.value`)
            },
            "required":{
                "value":"required"
            }
        }
    }
}

exports.optional = optional;
exports.required = required;