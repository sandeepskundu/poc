module.exports = {
    "md5Hash":{
        "_hashId":{
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
        "_parentId":{
            "valuemap": {
                "map":"parentId",
                "from":"body-item"
            }
        },
        "_merchantId": {
            "valuemap": {
                "map": "id",
                "from": "merchant"
            }
        }
    },

    "schema":{
        "name": true,
        "details": true,
        "_hashId": true,
        "_parentId": true,
        "hasChilds": true,
        "description": true,
    },

    "signature":{
        "merge":{
            "enable":false
        },
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
    }
}