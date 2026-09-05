const nameHash = () => {
    return {
        "nodes":{
            "0":{
                "map":"parentId",
                "from":"body-item"
            },
            "2":{
                "map":"type",
                "from":"body-item"
            },
            "3":{
                "map":"name",
                "from":"body-item"
            }
        }
    }
}

module.exports = {
    "md5Hash":{
        "hashId":nameHash(),
        "nameHashId":nameHash()
    },

    "schema":{
        "appId": true,
        "type": true,
        "name": true,
        "hashId": true,
        "parentId": true,
        "nameHashId":true,
        "collection.id":true,
        "model.response.exclude.enable": true,
        "model.response.exclude.kies": true,
        "model.schemaSample": true,
        "model.valuemap": true,
        "model.pagination.enable": true,
        "model.signature.merge.enable": true,
        "model.signature.creation.enable": true,
        "model.query.hidden.enable": true,
        "model.query.hidden.columns": true,
        "model.query.runtime.enable": true,
        "model.query.runtime.configs": true,
        "validation.request.body.type": true,
        "validation.request.body.message.error": true,
        "validation.request.body.message.success": true,
        "validation.request.methods.get.allowed": true,
        "validation.request.methods.get.message.error": true,
        "validation.request.methods.get.message.success": true,
        "validation.request.methods.post.allowed": true,
        "validation.request.methods.post.message.error": true,
        "validation.request.methods.post.message.success": true,
        "validation.request.methods.put.allowed": true,
        "validation.request.methods.put.message.error": true,
        "validation.request.methods.put.message.success": true,
        "validation.request.methods.delete.allowed": true,
        "validation.request.methods.delete.message.error": true,
        "validation.request.methods.delete.message.success": true,
        "validation.validation":true,
        "validation.validation.body": true,
        "validation.validation.query": true,
        "validation.validation.params": true,
        "validation.validation.headers": true,
        "validation.validation.cookies": true
    },

    "signature":{
        "creation":{
            "enable":true,
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