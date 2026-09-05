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
            "name":'mbt' // Members by Team
        },
        "schema":{
            "active":await schema.universal.boolean(req, {}),
            "teamHash":await schema.universal.hashId(req, {}),
            "userHash":await schema.universal.hashId(req, {}),
            "teamId":await schema.universal.mongoId(req, {
                "configs":{
                    "mongodb":{
                        "unique":false
                    }
                }
            }),
            "userId":await schema.universal.mongoId(req, {
                "configs":{
                    "mongodb":{
                        "unique":false
                    }
                }
            })
        }
    };

    return rval;
}