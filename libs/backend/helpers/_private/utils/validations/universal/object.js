const utils = process.aioBeLibs('helpers/_private/utils');

const only = async (req) => {
    return {
        "message":{
            "error":{
                "checks":{
                    "object":'Only object value is allowed in this node.',
                    "required":req.helpers.json.val(utils, 'regex.default.required', '')
                }
            }
        },
        "checks":{
            "object": {
                "value":"optional"
            },
            "required":{
                "value":"required"
            }
        }
    }
}

exports.only = only