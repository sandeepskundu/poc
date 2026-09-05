const messages = process.aioBeLibs('helpers/_private/utils/messages');
const schema = process.aioBeLibs(`helpers/_private/schemas/structures`);

const type = async (req) => {
    return await schema.universal.string.value(req, {
        "configs":{
            "mongodb":{
                "default":{
                    "enable":true,
                    "value":`'reader'`
                },
                "match":{
                    "enable":true,
                    "message":`${req.helpers.json.val(messages, 'default.enums')}`,
                    "value":`${await req.helpers.enums.builder.async.init(req, [`access.role.type.default`], {node:'id', regex:true})}`
                }
            }
        }
    })
}

const userId = async (req) => {
    return `{
        validator: async function (value) {
            return await helpers.mongoose.validate.document.isexist(this, 'emps', {_id:value, isActive:true}, {})
        },
        message: (props)  => {
            return {
                path: props.path,
                message:"Selected user is not valid. Please check and try again."
            }
        },
    }`
}

exports.get = async (private, appConfig, req) => {
    return {
        "collection":{
            "name":'ibp'
        },
        "schema":{
            "type":await type(req),
            "hashId":await schema.universal.hashId(req, {}),
            "itemId":await schema.universal.mongoId(req, {
                "configs":{
                    "mongodb":{
                        "unique":false
                    }
                }
            }),
            "userId":await schema.universal.mongoId(req, {
                "configs":{
                    "mongodb":{
                        "unique":false,
                        'validate':await userId(req)
                    }
                }
            }),
            
        }
    }
}