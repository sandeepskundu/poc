const utils = process.aioBeLibs('helpers/_private/utils');
const schema = process.aioBeLibs(`helpers/_private/schemas/structures`);

const dbId = async (req, name) => {
    return `{
        validator: async function (value) {
            return await helpers.mongoose.validate.document.isexist(this, 'db_catalog', {_id:value}, {})
        },
        message: (props)  => {
			return {
            	path: props.path,
            	message:"The selected database is invalid. Please choose a valid database and try again."
        	}
		},
    }`
}


exports.get = async (private, appConfig, req) => {
    const rval = {
        "collection":{
            "name":'db_collection'
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
            dbId:await schema.universal.mongoId(req, {
                "configs":{
                    "mongodb":{
                        'validate':await dbId(req),
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