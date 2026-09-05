const messages = process.aioBeLibs('helpers/_private/utils/messages');
const schema = process.aioBeLibs(`helpers/_private/schemas/structures`);

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

exports.get = async (private, appConfig, req) => {
    const rval = {
        "collection":{
            "name":'ar'
        },
        "schema":{
            "mapId":await schema.universal.mongoId(req, {
                "configs":{
                    "mongodb":{
                        "unique":false
                    }
                }
            }),

            "hasChilds":await schema.universal.boolean(req, {
                "configs":{
                    "mongodb":{
                        "default":{
                            "value":false
                        }
                    }
                }
            }),

            "linkFor":await linkFor(req),
            "isac":await schema.universal.isac(req, {}),
            "code":await schema.universal.text.code(req, {}),
            "codeHash":await schema.universal.hashId(req, {}),
            "name":await schema.universal.text.title(req, {}),
            "nameHash":await schema.universal.hashId(req, {}),
            "description":await schema.universal.text.description(req, {}),
        }
    };

    return rval;
}