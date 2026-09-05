const utils = process.aioBeLibs('helpers/_private/utils');
const messages = process.aioBeLibs('helpers/_private/utils/messages')

const encoded = async (req, extend) =>  {
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
                            return ${new RegExp(req.helpers.json.val(utils, `regex.string.encoded.value`))}.test(value);
                        }
                    },
                    message: props => ({
                        path: props.path,
                        message:"${req.helpers.json.val(utils, `regex.string.encoded.message`, '')}"
                    }),
                }`
            }
        }
    }, (extend || {}))
}


const map = async (req, extend) =>  {
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
                            return ${new RegExp(req.helpers.json.val(utils, 'regex.hashmap.optional.value'))}.test(value);
                        }
                    },
                    message: props => ({
                        path: props.path,
                        message:"${req.helpers.json.val(utils, `regex.hashmap.optional.message`, '')}"
                    }),
                }`
            }
        }
    }, (extend || {}))
}

const key = async (req, extend) =>  {
    return req.helpers.json.merge({
        "type": "stringKey",
        "configs": {
            "mongodb": {
                "trim":true,
                "required": {
                    "value": true,
                    "enable": true,
                    "message": "This field is required"
                }
            }
        }
    }, (extend || {}))
}

const value = async (req, extend) =>  {
    return req.helpers.json.merge({
        "type": "string",
        "configs": {
            "mongodb": {
                "trim":true,
                "required": {
                    "value": true,
                    "enable": true,
                    "message": "This field is required"
                }
            }
        }
    }, (extend || {}))
}

exports.map = map;
exports.key = key;
exports.value = value;
exports.encoded = encoded;