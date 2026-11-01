const schema = process.aioBeLibs(`helpers/_private/schemas/structures`);

const enums = async (req, enums, dvalue) => {
    return {
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
                    "value":await req.helpers.enums.builder.async.init(req, enums, {node:'id', regex:true})
                }
            }
        }
    }
}

exports.get = async (private, appConfig, req) => {
    const rval = {
        "collection":{
            "name":'devOpsScriptRun'
        },
        "schema":{
            batchId:await schema.universal.mongoId(req, {
                "configs":{
                    "mongodb":{
                        "required": {
                            "enable":true
                        }
                    }
                }
            }),
            pid:await schema.universal.number.value(req, {
                "configs":{
                    "mongodb":{
                        "default":{
                            "enable":true,
                            "value":null,
                        }
                    }
                }
            }),
            cmd:await schema.universal.text.title(req, {
                "configs":{
                    "mongodb":{
                        "required": {
                            "enable":true
                        }
                    }
                }
            }),
            exitCode:await schema.universal.number.value(req, {
                "configs":{
                    "mongodb":{
                        "default":{
                            "enable":true,
                            "value":null,
                        }
                    }
                }
            }),
            byteOffset:await schema.universal.number.value(req, {
                "configs":{
                    "mongodb":{
                        "default":{
                            "enable":true,
                            "value":0,
                        }
                    }
                }
            }),
            env:await schema.universal.object(req, {}),
            cwd:await schema.universal.text.title(req, {}),
            mode:await enums(req,  ['devops.script.run.mode'], 'queue'),
            status:await enums(req,  ['devops.script.run.status'], 'queued')
        }
    };

    return rval;
}