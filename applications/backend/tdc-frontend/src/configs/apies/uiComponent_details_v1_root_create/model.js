module.exports = {
    "md5Hash":{
        "hashId":{
            "nodes":{
                "0":{
                    "map":"runtimeUtils.merchantRootHash",
                    "from":"appConfig"
                },
                "1":{
                    "map":"name",
                    "from":"body-item"
                }
            }
        },
        "pathPrefixHashId":{
            "nodes":{
                "0":{
                    "map":"runtimeUtils.merchantRootHash",
                    "from":"appConfig"
                },
                "1":{
                    "map":"pathPrefix",
                    "from":"body-item"
                }
            }
        }
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
                "map":"runtimeUtils.merchantRootHash",
                "from":"appConfig"
            }
        }
    },

    "schema":{
        "name": true,
        "hashId": true,
        "exposed":true,
        "parentId": true,
        "hasChilds": true,
        "isRoot":true,
        "pathPrefix":true,
        "description": true,
        "hasAtomicChilds":true,
        "pathPrefixHashId":true
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
    }
}