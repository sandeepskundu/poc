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