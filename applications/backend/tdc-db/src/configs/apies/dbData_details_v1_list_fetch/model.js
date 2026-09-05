module.exports = {
    "response":{
        "exclude":{
            "enable":true,
            "kies":{
                "ts":true,
                "hashId":true,
                "parentId":true
            }
        }
    },

    "md5Hash":{
        "parentId":{
            "nodes":{
                "0":{
                    "map": "id",
                    "from": "merchant"
                }
            }
        }
    },

    "schema":{
        "parentId":true
    },

    "signature":{
        "creation":{
            "enable":true,
            "nodes":{
                "_id":{
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
        "runtime":{
            "enable":true,
            "configs":{
                "logical":{
                    "and":{
                        "query":{
                            "0":{
                                "cloumn":"parentId",
                                "value":{
                                    "from":"body-item",
                                    "map":"parentId"
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
    }
}