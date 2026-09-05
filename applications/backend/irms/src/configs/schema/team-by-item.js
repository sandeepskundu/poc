const messages = process.aioBeLibs('helpers/_private/utils/messages');
const schema = process.aioBeLibs(`helpers/_private/schemas/structures`);

const access = async (req) => {
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

const type = async (req) => {
    return await schema.universal.string.value(req, {
        "configs":{
            "mongodb":{
                "default":{
                    "enable":true,
                    "value":`''`
                },
                "match":{
                    "enable":true,
                    "message":`${req.helpers.json.val(messages, 'default.enums')}`,
                    "value":`${await req.helpers.enums.builder.async.init(req, [`access.team.types.default`], {node:'id', regex:true})}`
                }
            }
        }
    })
}

const relation = async (req) => {
    return `{
        validator: async function (value) {
			let l = [];

			Object.values(mdb.connection.models).map(model => {
				if(model?.modelName){
					l.push(model?.modelName.toUpperCase()); 
				}
			});

			if(value && (l.indexOf(value.toUpperCase()) > -1)){
				return true;
			}else{
				return false;
			}
        },
        message: (props)  => {
            return {
                path: props.path,
                message:"Selected relation is not valid. Please verify and try again."
            }
        },
    }`
}

const itemId = async (req) => {
    return `{
        validator: async function (value) {
            let l = {};
            let r = this.relation;
                r = (r?r.toUpperCase():'')

            Object.values(mdb.connection.models).map(model => {
                if(model?.modelName){
                    l[model?.modelName.toUpperCase()] = model;
                }
            });

            if(l[r]){
                let exists = await l[r].exists({_id:value});
                return exists?true:false
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

exports.get = async (private, appConfig, req) => {
    return {
        "collection":{
            "name":'tbi' // Team by Item
        },
        "schema":{
            "type":await type(req),
            "access":await access(req),
            "isac":await schema.universal.isac(req, {}),
            "hashId":await schema.universal.hashId(req, {}),
            "active":await schema.universal.boolean(req, {
                "configs":{
                    "mongodb":{
                        "default":{
                            "enable":true,
                            "value":true
                        }
                    }
                }
            }),
            "relation":await schema.universal.text.key(req, {
                "configs":{
                    "mongodb":{
                        "immutable":true,
                        'validate':await relation(req)
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
            })
        }
    }
}