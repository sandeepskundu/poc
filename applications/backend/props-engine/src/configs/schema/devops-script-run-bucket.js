const schema = process.aioBeLibs(`helpers/_private/schemas/structures`);

const authDetails = async (req) => {
    return await schema.universal.nested(req, {
        "childs":{
            "uId":await schema.universal.mongoId(req, {
                "configs":{
                    "mongodb":{
                        "unique":false,
                        "required": {
                            "enable":false
                        }
                    }
                }
            }),
            "aId":await schema.universal.mongoId(req, {
                "configs":{
                    "mongodb":{
                        "unique":false,
                        "required": {
                            "enable":false
                        }
                    }
                }
            })
        }
    })
}

exports.get = async (private, appConfig, req) => {
    const rval = {
        "collection":{
            "name":'devOpsScriptRunBucket'
        },
        "schema":{
            ud:await authDetails(req),
            runId:await schema.universal.mongoId(req, {
                "configs":{
                    "mongodb":{
                        "required": {
                            "enable":true
                        }
                    }
                }
            }),
            count:await schema.universal.number.value(req, {
                "configs":{
                    "mongodb":{
                        "default":{
                            "enable":true,
                            "value":0,
                        }
                    }
                }
            }),
            logs:await schema.universal.list(req, {
                childs:{
                    ud:await authDetails(req),
                    type:await schema.universal.string.value(req, {
                        "configs":{
                            "mongodb":{
                                "required": {
                                    "enable":false
                                }
                            }
                        }
                    }),
                    msg:await schema.universal.string.value(req, {
                        "configs":{
                            "mongodb":{
                                "required": {
                                    "enable":false
                                }
                            }
                        }
                    }),
                    ts:await schema.date.default(req, {
                        "configs":{
                            "mongodb":{
                                "required": {
                                    "enable":false
                                },
                                "default":{
                                    "enable":true,
                                    "value":`Date.now()`
                                }
                            }
                        }
                    })
                }
            }),

            

            /*--logs: [
                {
                    _id: false,
                    type: { type: String },
                    msg: { type: String },
                    ts: { type: Date, default: Date.now },
                },
            ],--*/
        }
    };

    return rval;
}