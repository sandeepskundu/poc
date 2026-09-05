const utils = process.aioBeLibs('helpers/_private/utils')

const sample = {
    "ip":"",
    "ipHash":"",
    "hashId":"",
    "timestamps":[],
    "requestCount":"",
    "startWIndow":"",
    "blockedUntil":"",
    "violationCount":"",
    "postBlockRequestCount":""
}

const schema = {
    "collection":{
        "name":utils.constants.rateLimit.RATE_LIMIT_COLLECTION_NAME
    },
    "schema":{
        "ip":{
            "type":"string",
            "configs":{
                "aioconfig":{},
                "mongodb":{
                    "default": {
                        "value":``
                    },
                }
            }
        },
        "hashId":{
            "type":"stringKey",
            "configs":{
                "aioconfig":{},
                "mongodb":{
                    "trim":true,
                    "unique":true,
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
        "timestamps":{
            "type":"timestampsList",
             "configs":{
                "aioconfig":{},
                "mongodb":{
                    "default": {
                        "value":`[]`,
                        "enable":true
                    },
                }
            }
        },
        "requestCount":{
            "type":"number",
            "configs":{
                "aioconfig":{},
                "mongodb":{
                    "default": {
                        "value":0,
                        "enable":true
                    },
                }
            }
        },
        "startWIndow":{
            "type":"date",
            "configs":{
                "aioconfig":{},
                "mongodb":{
                    "default": {
                        "value":`Date.now`,
                        "enable":true
                    },
                }
            }
        },
        "blockedUntil":{
            "type":"date",
            "configs":{
                "aioconfig":{},
                "mongodb":{
                    "default": {
                        "value":null,
                        "enable":true
                    },
                }
            }
        },
        "violationCount":{
            "type":"number",
            "configs":{
                "aioconfig":{},
                "mongodb":{
                    "default": {
                        "value":0,
                        "enable":true
                    },
                }
            }
        },
        "postBlockRequestCount":{
            "type":"number",
            "configs":{
                "aioconfig":{},
                "mongodb":{
                    "default": {
                        "value":0,
                        "enable":true
                    },
                }
            }
        }
    }
}

module.exports = schema;