const messages = process.aioBeLibs('helpers/_private/utils/messages');
const schema = process.aioBeLibs(`helpers/_private/schemas/structures`);

const linkwith = async (req) => {
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
                    "value":`${await req.helpers.enums.builder.async.init(req, [`access.link.for`], {node:'id', regex:true})}`
                }
            }
        }
    })
}

const itemId = async (req) => {
    return `{
        validator: async function (value) {
            let team = await helpers.mongoose.query.find.byQuery.init('tbi', {}, {_id:this.teamId}, true, true);

            if(team && team.relation){
                return await helpers.mongoose.validate.document.isexist(this, team.relation, {_id:value}, {})
            }else{
                return false;
            }
        },
        message: (props)  => {
            return {
                path:props.path,
                message:"Selected item id is not valid. Please verify and try again."
            }
        },
    }`
}

const teamId = async (req) => {
    return `{
        validator: async function (value) {
            return await helpers.mongoose.validate.document.isexist(this, 'tbi', {_id:value}, {})
        },
        message: (props)  => {
            return {
                path: props.path,
                message:"Selected team id is not valid. Please verify and try again."
            }
        },
    }`
}

const rolemap = async (req) => {
    return `{
        validator: async function (value) {
            return await helpers.mongoose.validate.document.idmap.required(this, 'ar', (value?value.toString():''), '_id', {})
        },
        message: (props)  => {
            return {
                path: props.path,
                message:"Selected role map is not valid. Please verify and try again."
            }
        },
    }`
}

exports.get = async (private, appConfig, req) => {
    return {
        "collection":{
            "name":'tbmbr' // Team base map by roles
        },
        "schema":{
            "linkwith":await linkwith(req),
            "isac":await schema.universal.isac(req, {}),
            "hashId":await schema.universal.hashId(req, {}),
            "teamId":await schema.universal.mongoId(req, {
                "configs":{
                    "mongodb":{
                        "unique":false,
                        'validate':await teamId(req)
                    }
                }
            }),
            "itemId":await schema.universal.mongoId(req, {
                "configs":{
                    "mongodb":{
                        "unique":false,
                        "immutable":true,
                        'validate':await itemId(req)
                    }
                }
            }),
            "rolemap":await schema.universal.idmap.required(req, {
                "configs":{
                    "mongodb":{
                        "unique":false,
                        'validate':await rolemap(req)
                    }
                }
            })
        }
    }
}