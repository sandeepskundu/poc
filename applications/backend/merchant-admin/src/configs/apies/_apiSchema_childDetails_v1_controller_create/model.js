module.exports = {
    "md5Hash":{
        "hashId":{
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
        },
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
        "dbId":true,
        "appId":true,
        "type":true,
        "name":true,
        "hashId":true,
        "parentId":true,
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
    }
}