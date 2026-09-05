const messages = process.aioBeLibs('helpers/_private/utils/messages');
const schema = process.aioBeLibs(`helpers/_private/schemas/structures`);

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
                path: props.path,
                message:"Selected item id is not valid. Please verify and try again."
            }
        },
    }`
}


const userId = async (req) => {
    return `{
        validator: async function (value) {
            return await helpers.mongoose.validate.document.isexist(this, 'emps', {_id:value, isActive:true}, {})
        },
        message: (props)  => {
            return {
                path: props.path,
                message:"Selected user is not valid. Please verify and try again."
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
                message:"Selected item id is not valid. Please verify and try again."
            }
        },
    }`
}

exports.get = async (private, appConfig, req) => {
    return {
        "collection":{
            "name":'tbu' // Team base user
        },
        "schema":{
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
            "userId":await schema.universal.mongoId(req, {
                "configs":{
                    "mongodb":{
                        "unique":false,
                        "immutable":true,
                        'validate':await userId(req)
                    }
                }
            })
        }
    }
}