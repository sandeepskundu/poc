const create = {
    "creation":{
        "enable":true,
        "nodes":{
            "_id":{
                "enable":true,
                "valueType":"objectId"
            },
            "_userId":{
                "enable":false,
                "valueType":"objectId"
            },
            "_mapId":{
                "enable":false,
                "valueType":"objectId"
            },
            "_merchantId":{
                "enable":true,
                "valueType":"objectId"
            }
        }
    }
}

exports.create = create;