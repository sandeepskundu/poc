const schema = {
    "collection":{
        "name":"DbData"
    },
    "schema":{
        "name":{
            "type": "stringKey",
            "configs": {
                "aioconfig": {},
                "mongodb": {
                    "trim": true,
                    "required": {
                        "value": true,
                        "enable": true,
                        "message": "This field is required"
                    },
                    "minLength": {
                        "value": "4",
                        "enable": true,
                        "message": "Min length is not valid"
                    },
                    "maxLength": {
                        "value": "40",
                        "enable": true,
                        "message": "Max length is not valid"
                    }
                }
            }
        },
        "description":{
            "type": "string",
            "configs": {
                "aioconfig": {},
                "mongodb": {
                    "trim": true,
                    "required": {
                        "value": true,
                        "enable": true,
                        "message": "This field is required"
                    },
                    "minLength": {
                        "value": "2",
                        "enable": true,
                        "message": "Min length is not valid"
                    },
                    "maxLength": {
                        "value": "240",
                        "enable": true,
                        "message": "Max length is not valid"
                    }
                }
            }
        },
        "hashId":{
            "type":"stringKey",
            "configs":{
                "mongodb":{
                    "trim":true,
                    "unique":true,
                    "required":{
                        "value":true,
                        "enable":true,
                        "message":"This field is required"
                    },
                    "minLength":{
                        "value":"32",
                        "enable":true,
                        "message":"Min length is not valid {VALUE}"
                    },
                    "maxLength":{
                        "value":"32",
                        "enable":true,
                        "message":"Max length is not valid"
                    }
                }
            }
        },
        "parentId":{
            "type":"stringKey",
            "configs":{
                "mongodb":{
                    "trim":true,
                    "required":{
                        "value":true,
                        "enable":true,
                        "message":"This field is required"
                    },
                    "minLength":{
                        "value":"32",
                        "enable":true,
                        "message":"Min length is not valid {VALUE}"
                    },
                    "maxLength":{
                        "value":"32",
                        "enable":true,
                        "message":"Max length is not valid"
                    }
                }
            }
        },
    }
}


module.exports = schema;