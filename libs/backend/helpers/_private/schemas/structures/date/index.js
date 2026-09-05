const utils = process.aioBeLibs('helpers/_private/utils');
const messages = process.aioBeLibs('helpers/_private/utils/messages')

const _default = async (req, extend) =>  {
    return req.helpers.json.merge({
        "type":`date`,
        "configs":{
            "mongodb":{
                "required":{
                    "value":true,
                    "enable":true,
                    "message":req.helpers.json.val(messages, 'default.required')
                },
                "validate":`{
                    validator: function (val) {
                        return val instanceof Date && !isNaN(val.getTime());
                    },
                    message: "Invalid date format"
                }`
            }
        }
    }, (extend || {}));
}

const doj = async (req, extend) =>  {
    return req.helpers.json.merge({
        "type":`date`,
        "configs":{
            "mongodb":{
                "immutable":true,
                "required":{
                    "value":true,
                    "enable":true,
                    "message":req.helpers.json.val(messages, 'default.required')
                },
                "default":{
                    "enable":true,
                    "value":`Date.now()`
                }
            }
        }
    }, (extend || {}));
}

exports.doj = doj;
exports.default = _default;