const schema = process.aioBeLibs(`helpers/_private/schemas/structures`);

const enums = async (req, enm, dvalue, enums, extra) => {
    return req.helpers.json.merge({
        "type":`stringKey`,
        "configs":{
            "mongodb":{
                "trim":true,
                "default":{
                    "enable":true,
                    "value":`'${dvalue || ''}'`
                },
                "match":{
                    "enable":true,
                    "value":await req.helpers.enums.builder.async.init(req, enm, {node:'id', regex:true}, enums)
                }
            }
        }
    }, extra || {});
}

const userDetails = async (req) => {
    return await schema.universal.nested(req, {
        "childs": {
            "uId": await schema.universal.mongoId(req, {
                "configs": {
                    "mongodb": {
                        "unique": false,
                        "required": {
                            "enable": false
                        }
                    }
                }
            }),
            "aId": await schema.universal.mongoId(req, {
                "configs": {
                    "mongodb": {
                        "unique": false,
                        "required": {
                            "enable": false
                        }
                    }
                }
            })
        }
    })
}


const logSchema = async (req, dH) => {
    return {
        hostId:await schema.universal.string.value(req, {
            "configs":{
                "mongodb":{
                    "required": {
                        "enable":false
                    }
                }
            }
        }),
        type:await enums(req,  ['EVENT_TYPES'], dH.devops.constants.MAP.EVENT_TYPES.STDOUT, dH.devops.constants.ENUMS, {
            "configs": {
                "mongodb": {
                    "required": {
                        "enable":true
                    }
                }
            }
        }),
        progress:await schema.universal.number.value(req, {
            "configs":{
                "mongodb":{
                    "min":{
                        "value":0,
                        "enable":true
                    },
                    "max":{
                        "value":0,
                        "enable":true
                    },
                    "default":{
                        "enable":false,
                        "value":undefined,
                    }
                }
            }
        }),
        msg:await schema.universal.string.value(req, {
            "configs":{
                "mongodb":{
                     "default":{
                        "value":'',
                        "enable":true
                    },
                    "required": {
                        "enable":true
                    }
                }
            }
        }),
        ts:await schema.date.default(req, {
            "configs":{
                "mongodb":{
                    "required": {
                        "enable":true
                    },
                    "default":{
                        "enable":true,
                        "value":`Date.now()`
                    }
                }
            }
        })
    }
};

exports.enums = enums;
exports.logSchema = logSchema;
exports.userDetails = userDetails;