const schema = {
    "collection":{
        "name":"CollectionSchemas"
    },
    "schema":{
        "name":{
            "type":"string",
            "configs":{
                "required":true
            }
        },
        "dbId":{
            "private":true,
            "type":"objectId",
            "configs":{
                "required":true
            }
        },
        "appId":{
            "private":true,
            "type":"objectId",
            "configs":{
                "required":true
            }   
        },
        "schema":{
            "type":"object",
            "configs":{
                "required":true
            }   
        }
    }
}

module.exports = schema;