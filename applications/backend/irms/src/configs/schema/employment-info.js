const messages = process.aioBeLibs('helpers/_private/utils/messages');
const schema = process.aioBeLibs(`helpers/_private/schemas/structures`);

const userId = async (req, name) => {
    return `{
        validator: async function (value) {
            return await helpers.mongoose.validate.document.isexist(this, 'emps', {_id:value}, {})
        },
        message: props => ({
            path: props.path,
            message:"Selected user is not valid, please select a valid user id and try again."
        }),
    }`
}

const empCode = async (req, name) => {
    return `{
        validator: async function (value) {
            return await helpers.mongoose.validate.document.optionalOrUnique(this, value, {empCode:value}, {}, 0)
        },
        message: props => ({
            path: props.path,
            message:"Selected user is not valid, please select a valid user id and try again."
        }),
    }`
}

const empCodeHash = async () => {
    return `{
        validator: async function (value) {
            return await helpers.mongoose.validate.document.optionalOrUnique(this, value, {empCodeHash:value}, {})
        },
        message: props => ({
            path: props.path,
            message:"Selected user is not valid, please select a valid user id and try again."
        }),
    }`
}

const type = async (req, map) => {
    return {
        "type":`stringKey`,
        "configs":{
            "mongodb":{
                "trim":true,
                "default":{
                    "enable":true,
                    "value":'INTERN'
                },
                "match":{
                    "enable":true,
                    "message":req.helpers.json.val(messages, 'default.enums'),
                    "value":`${await req.helpers.enums.builder.async.init(req, [map], {node:'id', regex:true}, {})}`
                },
                "required":{
                    "value":true,
                    "enable":true,
                    "message":req.helpers.json.val(messages, 'default.required')
                },
                "default":{
                    "enable":true,
                    "value":null
                }
            }
        }
    }
}

const employer = async (req, coll) => {
    return `{
        validator: async function (value) {
            return true;
            return await helpers.mongoose.validate.document.isexist(this, 'employer', {_id:value}, {})
        },
        message: props => ({
            path: props.path,
            message:"Selected user is not valid, please select a valid user id and try again."
        }),
    }`
}

const bv = async (req, coll) => {
    return `{
        validator: async function (value) {
            return await helpers.mongoose.validate.document.idmap.required(this, 'businessVerticals', value, '_id', {})
        },
        message: props => ({
            path: props.path,
            message:"Selected user is not valid, please select a valid user id and try again."
        }),
    }`
}


const bu = async (req) => {
    return `{
        validator: async function (value) {
            return await helpers.mongoose.validate.document.isexist(this, 'businessUnit', {_id:value}, {})
        },
        message: props => ({
            path: props.path,
            message:"Selected user is not valid, please select a valid user id and try again."
        }),
    }`
}

const employedBy = async (req, extend) => {
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
                    "value":`${await req.helpers.enums.builder.async.init(req, [`employment.employedBy.default`], {node:'id', regex:true})}`
                }
            }
        }
    }, (extend || {}))
}

const designation = async (req, coll) => {
    return `{
        validator: async function (value) {
            return await helpers.mongoose.validate.document.isexist(this, 'roles', {_id:value}, {})
        },
        message: props => ({
            path: props.path,
            message:"Selected user is not valid, please select a valid user id and try again."
        }),
    }`
}

const department = async (req, type) => {
    return `{
        validator: async function (value) {
            return await helpers.mongoose.validate.document.idmap.required(this, 'departments', value, '_id', {})
        },
        message: props => ({
            path: props.path,
            message:"Selected user is not valid, please select a valid user id and try again."
        }),
    }`
}

exports.get = async (private, appConfig, req) => {
    const rval = {
        "collection":{
            "name":'employmentInfo'
        },
        "schema":{
            employedBy:await employedBy(req, {}),
            type:await type(req, `employment.type.default`),
            status:await type(req, `employment.status.default`),
            workMode:await type(req, `employment.workMode.default`),
            location:await schema.universal.mongoId(req, {
                "configs":{
                    "mongodb":{}
                }
            }),
            bu:await schema.universal.mongoId(req, {
                "configs":{
                    "mongodb":{
                        'validate':await bu(req)
                    }
                }
            }),
            bv:await schema.universal.idmap.required(req, {
                "configs":{
                    "mongodb":{
                        'validate':await bv(req)
                    }
                }
            }),
            mapId:await schema.universal.mongoId(req, {
                "configs":{
                    "mongodb":{
                        'validate':await userId(req)
                    }
                }
            }),
            employer:await schema.universal.mongoId(req, {
                "configs":{
                    "mongodb":{
                        "unique":false,
                        "required":false,
                        'validate':await employer(req)
                    }
                }
            }),
            manager:await schema.universal.mongoId(req, {
                "configs":{
                    "mongodb":{
                        "unique":false,
                        'validate':await userId(req)
                    }
                }
            }),
            empCode:await schema.universal.number.id(req, {
                "configs":{
                    "mongodb":{
                        "default":{
                            "value":0,
                            "enable":true
                        },
                        'validate':await empCode(req)
                    }
                }
            }),
            empCodeHash:await schema.universal.hashId(req, {
                "configs":{
                    "mongodb":{
                        "required":false,
                        'validate':await empCodeHash(req)
                    }
                }
            }),
            department:await schema.universal.idmap.required(req, {
                "configs":{
                    "mongodb":{
                        'validate':await department(req)
                    }
                }
            }),
            designation:await schema.universal.mongoId(req, {
                "configs":{
                    "mongodb":{
                        "unique":false,
                        'validate':await designation(req)
                    }
                }
            })
        }
    };

    return rval;
}