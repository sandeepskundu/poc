module.exports = {
    "md5Hash":{
        "hashId":{
            "nodes":{
                "0":{
                    "map":"runtimeUtils.merchantRootHash",
                    "from":"appConfig"
                },
                "1":{
                    "map":"parentId",
                    "from":"body-item"
                },
                "2":{
                    "map":"name",
                    "from":"body-item"
                }
            }
        },
    },

    "valuemap": {
        "name":{
            "valuemap": {
                "map":"name",
                "from":"body-item"
            }
        },
        "hasChilds":{
            "valuemap": {
                "map":"hasChilds",
                "from":"body-item"
            }
        },
        "parentId":{
            "valuemap": {
                "map":"parentId",
                "from":"body-item"
            }
        }
    },

    "schema":{
        "name":true,
        "hashId":true,
        "exposed":true,
        "parentId":true,
        "hasChilds":true,
        "description":true,
        "details.value":true,
        "details.label":true,
    },

    "signature":{
        "merge":{
            "enable":true
        },
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
                "query":{
                    "0":{
                        "cloumn":"_id",
                        "value":{
                            "map":"id",
                            "from":"params"
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