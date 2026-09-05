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
        "hashId":{
            "type":"stringKey",
            "configs":{
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
                        "message":"Min length is not valid {VALUE}"
                    },
                    "maxLength":{
                        "value":"32",
                        "enable":true,
                        "message":"Max length is not valid"
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
                },
                "description":{
                    "type": "string",
                    "configs": {
                        "aioconfig": {},
                        "mongodb": {
                            "trim": true,
                            "required": {
                                "value": true,
                                "enable": true,
                                "message": "This field is required"
                            },
                            "minLength": {
                                "value": "2",
                                "enable": true,
                                "message": "Min length is not valid"
                            },
                            "maxLength": {
                                "value": "240",
                                "enable": true,
                                "message": "Max length is not valid"
                            }
                        }
                    }
                },
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