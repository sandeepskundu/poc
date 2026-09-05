const schemas = {
    "collection":{
        "name":"Collections"
    },
    "schema":{
        "merchantId":{
            "type":"objectId",
            "configs":{
                "aioconfig":{
                    "private":true
                },
                "mongodb":{
                    "required":{
                        "value":true,
                        "enable":true,
                        "message":"This field is required"
                    },
                    "immutable":true
                }
            }
        },
        "dbId":{
            "type":"objectId",
            "configs":{
                "aioconfig":{},
                "mongodb":{
                    "required":{
                        "value":true,
                        "enable":true,
                        "message":"This field is required"
                    },
                    "immutable":true
                }
            }
        },
        "appId":{
            "type":"objectId",
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
        },
        "collection":{
            "type":"nested",
            "schema":{
                "name":{
                    "type":"stringKey",
                    "configs":{
                        "aioconfig":{},
                        "mongodb":{
                            "trim":true,
                            "required":{
                                "value":true,
                                "enable":true,
                                "message":"This field is required"
                            }
                        }
                    }
                }
            }
        },
        "schema":{
            "type":"object",
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

module.exports = schemas;