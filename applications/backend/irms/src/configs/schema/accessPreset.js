const messages = process.aioBeLibs('helpers/_private/utils/messages');
const schema = process.aioBeLibs(`helpers/_private/schemas/structures`);

const types = async (req, extend) => {
    return req.helpers.json.merge({
        "type":"number",
        "configs":{
            "mongodb":{
                "trim":true,
                "required":{
                    "value":true,
                    "enable":true,
                    "message":`${req.helpers.json.val(messages, 'default.required')}`
                },
                "match":{
                    "enable":true,
                    "message":`${req.helpers.json.val(messages, 'default.enums')}`,
                    "value":`${await req.helpers.enums.builder.async.init(req, [`access.map.types.all`], {node:'id', regex:true})}`
                }
            }
        }
    }, (extend || {}))
}



const mapId = async (req, name) => {
    return `{
        validator: async function (value) {
            return true;
            return await helpers.mongoose.validate.document.isexist(this, 'accessMap', {_id:value}, {});
        },
        message: (props)  => {
			return {
            	path: props.path,
            	message:"Please select a valid option and try again."
        	}
		}
    }`
}

const action = async (req, extend) => {
    return req.helpers.json.merge({
        "type":"number",
        "configs":{
            "mongodb":{
                "required":{
                    "value":true,
                    "enable":true,
                    "message":`${req.helpers.json.val(messages, 'default.required')}`
                },
                "match":{
                    "enable":true,
                    "message":`${req.helpers.json.val(messages, 'default.enums')}`,
                    "value":`${await req.helpers.enums.builder.async.init(req, [`access.actions.permission.type.all`], {node:'id', regex:true})}`
                }
            }
        }
    }, (extend || {}))
}

exports.get = async (private, appConfig, req) => {
    const rval = {
        "collection":{
            "name":'accessPreset'
        },
        "schema":{
            "hashId":await schema.universal.hashId(req, {
                "configs":{
                    "mongodb":{
                        "immutable":true
                    }
                }
            }),

            "mapId":await schema.universal.mongoId(req, {
                "configs":{
                    "mongodb":{
                        "unique":false,
                        'validate':await mapId(req)
                    }
                }
            }),

            "actions":{
                type:"nested",
                schema:{
                    fetch:await action(req),
                    update:await action(req),
                    create:await action(req),
                    remove:await action(req)
                }
            },

            "type":await types(req),
            "name":await schema.universal.text.title(req, {}),
            "nameHash":await schema.universal.hashId(req, {}),
            "roleMappingHash":await schema.universal.hashId(req, {}),
            "description":await schema.universal.text.description(req, {}),
            "roleMapping":await schema.universal.idmap.required(req, {}),
        }
    };

    return rval;
}