const utils = process.aioBeLibs('helpers/_private/utils')

const json = {
    "hashId":"",
    "sequence":1000,
}

const schema = {
    "collection":{
        "name":utils.constants.db.COUNTER_INDEX_COLLECTION_NAME
    },
    "schema":{
        "hashId":{
            "type":"stringKey",
            "configs":{
                "aioconfig":{},
                "mongodb":{
                    "trim":true,
                    "unique":true,
                    "required":{
                        "value":true,
                        "enable":true,
                        "message":"This field is required"
                    },
                    "minLength":{
                        "value":"32",
                        "enable":true,
                        "message":"Min length is not valid"
                    },
                    "maxLength":{
                        "value":"32",
                        "enable":true,
                        "message":"Max length is not valid"
                    },
                }
            }
        },
        "sequence":{
            "type":"number",
            "configs":{
                "aioconfig":{},
                "mongodb":{
                     "required":{
                        "value":true,
                        "enable":true,
                        "message":"This field is required"
                    }
                }
            }
        }
    }
}

module.exports = schema;