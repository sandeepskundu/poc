const sample = {
    "name":'',
    "hashId":'',
    "exposed":'',
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
                    "enable":true,
                    "value":false
                }
            }
        }
    },

    "exposed":{
        "type":"stringKey",
        "configs":{
            "aioconfig":{},
            "mongodb":{
                "default":{
                    "enable":true,
                    "value":'internally'
                }
            }
        }
    },

    "hashId":{
        "type":"stringKey",
        "configs":{
            "aioconfig":{},
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
                }
            }
        }
    },

    "parentId":{
        "type":"stringKey",
        "configs":{
            "aioconfig":{},
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
                }
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
        "name":"templateData"
    },
    "schema":schema
}