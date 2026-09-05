const sample = {
    "name":'',
    "hashId":'',
    "details":{},
    "parentId":'',
    "hasChilds":'',
    "description":""
}

const schema = {
    "name":{
        "type":"paragraph",
        "configs":{
            "mongodb":{
                "trim":true,
                "required":{
                    "value":true,
                    "enable":true,
                    "message":"This field is required"
                }
            }
        }
    },

    "description":{
        "type":"paragraph",
        "configs":{
            "mongodb":{
                "trim":true,
                "required":{
                    "value":true,
                    "enable":true,
                    "message":"This field is required"
                },
                "minLength":{
                    "value":"10",
                    "enable":true,
                    "message":"Min length is not valid"
                },
                "maxLength":{
                    "value":"240",
                    "enable":true,
                    "message":"Max length is not valid"
                }
            }
        }
    },

    "hasChilds":{
        "type":"boolean",
        "configs":{
            "aioconfig":{},
            "mongodb":{
                "default":{
                    "value":false
                }
            }
        }
    },

    "hashId":{
        "type":"stringKey",
        "configs":{
            "aioconfig":{
                "private":true
            },
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
                    "message":"Min length is not valid"
                },
                "maxLength":{
                    "value":"32",
                    "enable":true,
                    "message":"Max length is not valid"
                },
                "immutable":true
            }
        }
    },

    "parentId":{
        "type":"stringKey",
        "configs":{
            "aioconfig":{
                "private":true
            },
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
                    "message":"Min length is not valid"
                },
                "maxLength":{
                    "value":"32",
                    "enable":true,
                    "message":"Max length is not valid"
                },
                "immutable":true
            }
        }
    },

    "details":{
        "type":"object",
        "configs":{
            "aioconfig":{},
            "mongodb":{
                "default":{
                    "value":{}
                }
            }
        }
    }
}

module.exports = {
    "collection":{
        "name":"internalMasterData"
    },
    "schema":schema
}