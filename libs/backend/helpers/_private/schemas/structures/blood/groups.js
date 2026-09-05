const utils = process.aioBeLibs('helpers/_private/utils');
const messages = process.aioBeLibs('helpers/_private/utils/messages')

module.exports = async (req, extend) =>  {
    return req.helpers.json.merge({
        "type":`stringKey`,
        "configs":{
            "mongodb":{
                "trim":true,
                "match":{
                    "enable":true,
                    "value":`${await req.helpers.enums.builder.async.init(req, [`blood.groups`], {node:'id', regex:true})}`,
                    "message":req.helpers.json.val(messages, `blood.groups`, req.helpers.json.val(messages, 'default.enums'))
                },
                "required":{
                    "value":true,
                    "enable":true,
                    "message":req.helpers.json.val(messages, 'default.required')
                },
                "default":{
                    "enable":true,
                    "value":null
                }
            }
        }
    }, (extend || {}))
}