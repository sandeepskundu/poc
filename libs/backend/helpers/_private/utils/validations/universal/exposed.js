const messages = process.aioBeLibs('helpers/_private/utils/messages')

module.exports = async (req, extend) =>  {
    return req.helpers.json.merge({
        "type":"stringKey",
        "configs":{
            "aioconfig":{},
            "mongodb":{
                "default":{
                    "enable":true,
                    "value":"'internally'"
                },
                "match":{
                    "enable":true,
                    "message":req.helpers.json.val(messages, 'default.enums'),
                    "value":`${await req.helpers.enums.builder.async.init(req, [`data.exposed.default`], {node:'id', regex:true})}`,
                }
            }
        }
    }, (extend || {}))
}

module.exports = async (req) => {
    return {
        "message":{
            "error":{
                "checks":{
                    regex:req.helpers.json.val(messages, 'default.enums'),
                    required:req.helpers.json.val(messages, 'default.required'),
                }
            }
        },
        "checks":{
            "regex": {
                "value":`${await req.helpers.enums.builder.async.init(req, [`data.exposed.default`], {node:'id', regex:true})}`,
            },
            "required":{
                "value":"required"
            }
        }
    }
}