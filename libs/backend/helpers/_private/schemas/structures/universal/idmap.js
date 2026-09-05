const utils = process.aioBeLibs('helpers/_private/utils');
const messages = process.aioBeLibs('helpers/_private/utils/messages')

const optional = async (req, extend) =>  {
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
                "validate":`{
                    validator: async function (value) {
                        if (!value) {
                            return true;
                        }else{
                            return ${new RegExp(req.helpers.json.val(utils, 'regex.idmap.optional.value'))}.test(value);
                        }
                    },
                    message: props => ({
                        path: props.path,
                        message:"${req.helpers.json.val(utils, `regex.idmap.optional.message`, '')}"
                    }),
                }`
            }
        }
    }, (extend || {}))
}

const required = async (req, extend) =>  {
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
                "validate":`{
                    validator: async function (value) {
                        return ${new RegExp(req.helpers.json.val(utils, 'regex.idmap.required.value'))}.test(value);
                    },
                    message: props => ({
                        path: props.path,
                        message:"${req.helpers.json.val(utils, `regex.idmap.required.message`, '')}"
                    }),
                }`
            }
        }
    }, (extend || {}))
}

exports.required = required;
exports.optional = optional;