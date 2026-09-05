const utils = process.aioBeLibs('helpers/_private/utils');

const only = async (req) => {
    return {
        "message":{
            "error":{
                "checks":{
                    "regex":req.helpers.json.val(utils, 'regex.number.only.message', ''),
                    "required":req.helpers.json.val(utils, 'regex.default.required', '')
                }
            }
        },
        "checks":{
            "regex": {
                "value":req.helpers.json.val(utils, `regex.number.only.value`)
            },
            "required":{
                "value":"required"
            }
        }
    }
}

exports.only = only