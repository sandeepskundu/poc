const utils = process.aioBeLibs('helpers/_private/utils');

const id = async (req, extend) =>  {
    return req.helpers.json.merge({
        "type":"number",
        "configs":{
            "aioconfig":{},
            "mongodb":{
                "trim":true,
                "unique":true,
                "required":{
                    "value":true,
                    "enable":true,
                    "message":req.helpers.json.val(utils, 'regex.mongoId.message')
                },
            }
        }
    }, (extend || {}))
}

const value = async (req, extend) =>  {
    return req.helpers.json.merge({
        "type":"number",
        "configs":{
            "aioconfig":{},
            "mongodb":{
                "required":{
                    "value":true,
                    "enable":true,
                    "message":"This field is required"
                },
            }
        }
    }, (extend || {}))
}

exports.id = id;
exports.value = value;