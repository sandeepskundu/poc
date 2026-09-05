const utils = process.aioBeLibs('helpers/_private/utils');
const messages = process.aioBeLibs('helpers/_private/utils/messages')

const encoded = async (req) => {
    return {
        "message":{
            "error":{
                "checks":{
                    "required":req.helpers.json.val(messages, 'default.required'),
                    "regex":req.helpers.json.val(utils, `regex.string.encoded.message`, '')
                }
            }
        },
        "checks":{
            "regex": {
                "value":req.helpers.json.val(utils, `regex.string.encoded.value`)
            },
            "required":{
                "value":"required"
            }
        }
    }
}

const map = async (req) => {
    return {
        "message":{
            "error":{
                "checks":{
                    "required":req.helpers.json.val(messages, 'default.required'),
                    "regex":req.helpers.json.val(utils, `regex.stringmap.message`, '')
                }
            }
        },
        "checks":{
            "regex": {
                "value":req.helpers.json.val(utils, `regex.stringmap.value`)
            },
            "required":{
                "value":"required"
            }
        }
    }
}

exports.map = map;
exports.encoded = encoded;