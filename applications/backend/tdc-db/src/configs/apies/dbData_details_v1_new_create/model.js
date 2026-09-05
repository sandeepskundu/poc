const sample = {
    "name":'',
    "hashId":'',
}

const nameHash = () => {
    return {
        "nodes":{
            "0":{
                "map": "id",
                "from": "merchant"
            },
            "1":{
                "map":"name",
                "from":"body-item"
            },
        }
    }
}

module.exports = {
    "md5Hash":{
        "hashId":nameHash(),
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
        "name":true,
        "hashId":true,
        "parentId":true,
        "description":true
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
    }
}