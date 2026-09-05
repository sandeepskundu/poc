const nameHash = () => {
    return {
        "nodes":{
            "0":{
                "map":"appId",
                "from":"body-item"
            },
            "1":{
                "map":"type",
                "from":"body-item"
            },
            "2":{
                "map":"name",
                "from":"body-item"
            }
        }
    }
};

module.exports = {
    "md5Hash":{
        "hashId":nameHash(),
        "nameHashId":nameHash(),
        "parentId":{
            "nodes":{
                "0":{
                    "map":"runtimeUtils.merchantRootHash",
                    "from":"appConfig"
                }
            }
        }
    },

    "schema":{
        "dbId": true,
        "appId": true,
        "type": true,
        "name": true,
        "hashId":true,
        "parentId":true,
        "nameHashId":true
    },

    "signature":{
        "creation":{
            "enable":true,
            "nodes":{
                "_id":{
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
        "runtime":{
            "enable":true,
            "configs":{
                "logical":{
                    "and":{
                        "query":{
                            "0":{
                                "cloumn":"_id",
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
    }
}