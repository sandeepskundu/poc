const messages = process.aioBeLibs('helpers/_private/utils/messages');
const schema = process.aioBeLibs(`helpers/_private/schemas/structures`);

const types = async (req, extend) => {
    return req.helpers.json.merge({
        "type":"string",
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
                    "value":`${await req.helpers.enums.builder.async.init(req, [`employment.team.type`], {node:'id', regex:true})}`
                }
            }
        }
    }, (extend || {}))
}

const empId = async (req, name) => {
    return `{
        validator: async function (value) {
            return await helpers.mongoose.validate.document.isexist(this, 'emps', {_id:value}, {})
        },
        message: (props)  => {
			return {
            	path: props.path,
            	message:"Please select a valid option and try again."
        	}
		},
    }`
}

const mapping = async (req, type) => {
    return `{
        validator: async function (value) {
            return await helpers.mongoose.validate.document.idmap.required(this, 'eat', value, '_id', {})
        },
        message: props => ({
            path: props.path,
            message:"Selected team is not valid, please select a valid team and try again."
        }),
    }`
}

exports.get = async (private, appConfig, req) => {
    const rval = {
        "collection":{
            "name":'empTeam'
        },
        "schema":{
            "type":await types(req),
            "empId":await schema.universal.mongoId(req, {
                "configs":{
                    "mongodb":{
                        "unique":false,
                        'validate':await empId(req)
                    }
                }
            }),
            "mapping":await schema.universal.idmap.required(req, {
                "configs":{
                    "mongodb":{
                        'validate':await mapping(req)
                    }
                }
            }),
            "uniqueHash":await schema.universal.hashId(req, {
                "configs":{
                    "mongodb":{}
                }
            }),
        }
    };

    return rval;
}