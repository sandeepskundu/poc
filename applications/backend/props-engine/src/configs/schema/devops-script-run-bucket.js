const schema = process.aioBeLibs(`helpers/_private/schemas/structures`);

exports.get = async (private, appConfig, req) => {
    const rval = {
        "collection":{
            "name":'devOpsScriptRunBucket'
        },
        "schema":{
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