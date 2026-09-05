module.exports = {
    "md5Hash":{
        "hashId":{
            "nodes":{
                "0":{
                    "map":"id",
                    "from":"merchant"
                },
                "1":{
                    "map":"appId",
                    "from":"body-item"
                },
                "3":{
                    "map":"type",
                    "from":"body-item"
                },
                "4":{
                    "map":"name",
                    "from":"body-item"
                }
            }
        },
        "parentId":{
            "nodes":{
                "0":{
                    "map":"id",
                    "from":"merchant"
                },
                "1":{
                    "map":"appId",
                    "from":"body-item"
                }
            }
        }
    },

    "valuemap": {
        "_merchantId": {
            "valuemap": {
                "map": "id",
                "from": "merchant"
            }
        }
    },

    "schema":{
        "dbId": true,
        "appId": true,
        "type": true,
        "name": true,
        "hashId":true,
        "parentId":true
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