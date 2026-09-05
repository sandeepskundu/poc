module.exports = {

    "response":{
        "exclude":{
            "enable":true,
            "kies":{
                "ts":true,
                "hooks":true,
                "hashId":true,
                "appInfo":true,
                "appConfig":true,
                "portHashId":true,
                "scssConfig":true,
                "hooksKeyNames":true
            }
        },
        "transform":{
            "enable":true,
            "kies":{
                "_id":"id",
            }
        }
    },

    "valuemap": {
        "category": {
            "valuemap": {
                "map": "id",
                "from": "params"
            }
        }
    },

    "schema":{
        "category":true,
    },

    "signature":{
        "creation":{
            "enable":false,
            "nodes":{
                "_id":{
                    "enable":true,
                    "valueType":"objectId"
                },
                "_userId":{
                    "enable":true,
                    "valueType":"objectId"
                },
                "_mapId":{
                    "enable":true,
                    "valueType":"objectId"
                },
                "_merchantId":{
                    "enable":true,
                    "valueType":"objectId"
                }
            }
        }
    },

    "query":{
        "hidden":{
            "merchantId":true
        },
        "runtime":{
            "enable":true,
            "configs":{
                "query":{
                    "0":{
                        "cloumn":"category",
                        "value":{
                            "from":"params",
                            "map":"id"
                        },
                        "operation":{
                            "eq":{
                                "enable":true,
                                "opType":"eq"
                            }
                        }
                    }
                }
            }
        }
    }                   
}