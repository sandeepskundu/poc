const utils = process.aioBeLibs('helpers/_private/utils');
const schema = process.aioBeLibs(`helpers/_private/schemas/structures`);

exports.get = async (private, appConfig, req) => {
    const rval = {
        "collection":{
            "name":'db_catalog'
        },
        "schema":{
            nameHash:await schema.universal.hashId(req, {}),
            name:await schema.universal.string.key(req, {
                "configs":{
                    "mongodb":{
                        "required": {
                            "enable":true
                        },
                        "match":{
                            "enable":true,
                            "value":utils.regex.string.key.value
                        }
                    }
                }
            }),
            displayName:await schema.universal.text.title(req, {
                "configs":{
                    "mongodb":{
                        "required": {
                            "enable":true
                        }
                    }
                }
            }),
            summary:await schema.universal.text.title(req, {
                "configs":{
                    "mongodb":{
                        "required": {
                            "enable":true
                        },
                        "minLength":{},
                        "maxLength":{
                            "value":250,
                        }
                    }
                }
            }),
            description:await schema.universal.text.title(req, {
                "configs":{
                    "mongodb":{
                        "required": {
                            "enable":true
                        },
                        "minLength":{},
                        "maxLength":{
                            "value":2000,
                        }
                    }
                }
            }),
            mapId:await schema.universal.mongoId(req, {
                "configs":{
                    "mongodb":{
                        "required": {
                            "enable":true
                        }
                    }
                }
            })
        }
    };

    return rval;
}