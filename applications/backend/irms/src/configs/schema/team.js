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
                    "value":`${await req.helpers.enums.builder.async.init(req, [`access.from.default`], {node:'id', regex:true})}`
                }
            }
        }
    }, (extend || {}))
}

const mapId = async (req, name) => {
    return `{
        validator: async function (value) {
            return true;
            let type = this?.runtime?.req?.body?.data?.type;

			switch (\`\${type}\`) {
				case '1':
					return await helpers.mongoose.validate.document.isexist(this, 'emps', {_id:value}, {})
				break;
				case '2':
					return await helpers.mongoose.validate.document.isexist(this, 'emps', {_id:value}, {})
				break;
				case '3':
					return await helpers.mongoose.validate.document.isexist(this, 'emps', {_id:value}, {})
				break;
				case '4':
					return await helpers.mongoose.validate.document.isexist(this, 'emps', {_id:value}, {})
				break;
				case '5':
					return await helpers.mongoose.validate.document.isexist(this, 'emps', {_id:value}, {})
				break;
				case '6':
					return await helpers.mongoose.validate.document.isexist(this, 'emps', {_id:value}, {})
				break;
				case '7':
					return await helpers.mongoose.validate.document.isexist(this, 'emps', {_id:value}, {})
				break;
				case '8':
					return await helpers.mongoose.validate.document.isexist(this, 'emps', {_id:value}, {})
				break;
				case '9':
					return await helpers.mongoose.validate.document.isexist(this, 'emps', {_id:value}, {})
				break;
				case '10':
					return await helpers.mongoose.validate.document.isexist(this, 'emps', {_id:value}, {})
				break;
				default:
					return false
			}
        },
        message: (props)  => {
			return {
            	path: props.path,
            	message:"Please select a valid option and try again. -----"
        	}
		},
    }`
}

exports.get = async (private, appConfig, req) => {
    const rval = {
        "collection":{
            "name":'team'
        },
        "schema":{
            "type":await types(req),

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

            "name":await schema.universal.text.title(req, {}),
            "nameHash":await schema.universal.hashId(req, {}),
            "description":await schema.universal.text.description(req, {}),
        }
    };

    return rval;
}