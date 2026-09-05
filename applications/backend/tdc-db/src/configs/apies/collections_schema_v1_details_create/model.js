const nameHash = () => {
    return {
        "nodes":{
            "0":{
                "map":"dbId",
                "from":"body-item"
            },
            "1":{
                "from":"body-item",
                "map":"collection.name",
            }
        }
    }
}

module.exports = {
    "md5Hash":{
        "hashId":nameHash(),
    },

    "schema":{
        "dbId":true,
        "appId":true,
        "hashId":true,
        "schema":true,
        "collection.name":true,
        "collection.description":true
    },

    "signature":{
        "creation":{
            "enable":true,
            "nodes":{
                "_id":{
                    "enable":true,
                    "valueType":"objectId"
                },
                "dbId":{
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