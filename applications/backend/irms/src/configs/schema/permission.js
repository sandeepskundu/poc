const messages = process.aioBeLibs('helpers/_private/utils/messages');
const schema = process.aioBeLibs(`helpers/_private/schemas/structures`);

const type = async (req) => {
    return await schema.universal.string.value(req,{
        "configs":{
            "mongodb":{
                "match":{
                    "enable":true,
                    "message":`${req.helpers.json.val(messages, 'default.enums')}`,
                    "value":`${await req.helpers.enums.builder.async.init(req, [`access.role.type.default`], {node:'id', regex:true})}`
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
    }`
}

const itemId = async (req) => {
    return `{
        validator: async function (value) {
            let l = {};
            let r = this.relation;

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
                message:"Selected relation type and id are not matching. Please verify and try again."
            }
        },
    }`
}

exports.get = async (private, appConfig, req) => {
    return {
        "collection":{
            "name":'permission'
        },
        "schema":{
            "type":await type(req),
            "isac":await schema.universal.isac(req, {}),
            "hashId":await schema.universal.hashId(req, {}),
            "relation":await schema.universal.text.code(req, {
                "configs":{
                    "mongodb":{
                        'validate':await relation(req)
                    }
                }
            }),
            "itemId":await schema.universal.mongoId(req, {
                "configs":{
                    "mongodb":{
                        "unique":false,
                        'validate':await itemId(req)
                    }
                }
            }),
            "userId":await schema.universal.mongoId(req, {
                "configs":{
                    "mongodb":{
                        "unique":false
                        //'validate':await mapId(req)
                    }
                }
            }),
            
        }
    }
}