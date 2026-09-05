const messages = process.aioBeLibs('helpers/_private/utils/messages');
const schema = process.aioBeLibs(`helpers/_private/schemas/structures`);

const getEnums = async (req, type, extend) => {
    return req.helpers.json.merge({
        "type":"stringKey",
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
                    "value":`${await req.helpers.enums.builder.async.init(req, [`employment.${type}.default`], {node:'id', regex:true})}`
                }
            }
        }
    }, (extend || {}))
}

const validation = async (req, name) => {
    return `{
        validator: async function (value) {
            return await helpers.mongoose.validate.document.isexist(this, 'departments', {_id:value}, {})
        },
        message: props => ({
            path: props.path,
            message:"Selected department is not valid, Please select a valid and try again."
        }),
    }`
}

exports.get = async (private, appConfig, req) => {
    const rval = {
        "collection":{
            "name":'roles'
        },
        "schema":{
            "code":await schema.universal.text.code(req, {
                "configs":{
                    "mongodb":{}
                }
            }),
            "hashId":await schema.universal.hashId(req, {
                "configs":{
                    "mongodb":{
                        "immutable":true
                    }
                }
            }),
            "departmentId":await schema.universal.mongoId(req, {
                "configs":{
                    "mongodb":{
                        "unique":false,
                        'validate':await validation(req)
                    }
                }
            }),
            "bandHash":await schema.universal.hashId(req, {
                "configs":{
                    "mongodb":{
                        "unique":false
                    }
                }
            }),
            "gradeHash":await schema.universal.hashId(req, {
                "configs":{
                    "mongodb":{
                        "unique":false
                    }
                }
            }),
            "band":await getEnums(req, 'band'),
            "grade":await getEnums(req, 'grades'),
            "name":await schema.universal.text.title(req, {}),
            "nameHash":await schema.universal.hashId(req, {}),
            "codeHash":await schema.universal.hashId(req, {}),
            "description":await schema.universal.text.description(req, {}),
        }
    };

    return rval;
}