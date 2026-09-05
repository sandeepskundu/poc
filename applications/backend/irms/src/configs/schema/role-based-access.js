const messages = process.aioBeLibs('helpers/_private/utils/messages');
const schema = process.aioBeLibs(`helpers/_private/schemas/structures`);

const linkType = async (req) => {
    return await schema.universal.string.value(req,{
        "configs":{
            "mongodb":{
                "match":{
                    "enable":true,
                    "message":`${req.helpers.json.val(messages, 'default.enums')}`,
                    "value":`${await req.helpers.enums.builder.async.init(req, [`access.link.type`], {node:'id', regex:true})}`
                }
            }
        }
    })
}

const linkFor = async (req) => {
    return await schema.universal.string.value(req,{
        "configs":{
            "mongodb":{
                "match":{
                    "enable":true,
                    "message":`${req.helpers.json.val(messages, 'default.enums')}`,
                    "value":`${await req.helpers.enums.builder.async.init(req, [`access.link.for`], {node:'id', regex:true})}`
                }
            }
        }
    })
}

const type = async (req) => {
    return await schema.universal.string.value(req,{
        "configs":{
            "mongodb":{
                "default":{
                    "enable":true,
                    "value":`'blocked'`,
                },
                "match":{
                    "enable":true,
                    "message":`${req.helpers.json.val(messages, 'default.enums')}`,
                    "value":`${await req.helpers.enums.builder.async.init(req, [`access.rolebaseAccess.permissons.types`], {node:'id', regex:true})}`
                }
            }
        }
    })
}

exports.get = async (private, appConfig, req) => {
    return {
        "collection":{
            "name":'rba'
        },
        "schema":{
            "type":await type(req),
            "linkFor":await linkFor(req),
            "linkType":await linkType(req),
            "isac":await schema.universal.isac(req, {}),
            "hashId":await schema.universal.hashId(req, {}),
            "mapping":await schema.universal.idmap.required(req, {}),
            "mapId":await schema.universal.mongoId(req, {
                "configs":{
                    "mongodb":{
                        "unique":false,
                    }
                }
            })
        }
    }
}