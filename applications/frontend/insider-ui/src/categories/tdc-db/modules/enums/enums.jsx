const map = {
    UNIQUE:{
        "id":"unique",
        "label":"Unique",
        "valuemap":'configs.mongodb.unique'
    },
    INDEX:{
        "id":"index",
        "label":"Index",
        "valuemap":'configs.mongodb.index'
    }
}

export default {
    SCHEMA_TYPES:{
        DEFAULT_VALUES:{
            NESTED:{
                "type":'nested',
                "schema":{}
            },
            EMAIL:{
                "type":'email',
                "configs":{
                    "aioconfig":{},
                    "mongodb":{
                        trim:true
                    }
                }
            },
            STRING:{
                "type":'string',
                "configs":{
                    "aioconfig":{},
                    "mongodb":{
                        trim:true
                    }
                }
            },
            STRINGKEY:{
                "type":'stringKey',
                "configs":{
                    "aioconfig":{},
                    "mongodb":{
                        trim:true
                    }
                }
            },
            PARAGRAPH:{
                "type":'paragraph',
                "configs":{
                    "aioconfig":{},
                    "mongodb":{
                        trim:true
                    }
                }
            },
            DATE:{
                "type":'date',
                "configs":{
                    "aioconfig":{},
                    "mongodb":{}
                }
            },
            OBJECT:{
                "type":'object',
                "configs":{
                    "aioconfig":{},
                    "mongodb":{}
                }
            },
            OBJECTID:{
                "type":'objectId',
                "configs":{
                    "aioconfig":{},
                    "mongodb":{}
                }
            },
            NUMBER:{
                "type":'number',
                "configs":{
                    "aioconfig":{},
                    "mongodb":{}
                }
            },
            SWITCH:{
                "type":'switch',
                "configs":{
                    "aioconfig":{},
                    "mongodb":{}
                }
            },
            BOOLEAN:{
                "type":'boolean',
                "configs":{
                    "aioconfig":{},
                    "mongodb":{}
                }
            }
        }
    },
    SCHEMA_OPTIONS:{
        DEFAULT_VALUES:{
            "TRIM":true,
            "AUTO":true,
            "UNIQUE":true,
            "INDEX":true,
            "PRIVATE":true,
            "IMMUTABLE":true,
            "LOWERCASE":true,
            "UPPERCASE":true,
            
            "MIN":{
                "value":2,
                "enable":true,
                "message":'Min value is not valid'
            },
            "MAX":{
                "value":1,
                "enable":true,
                "message":'Max value is not valid'
            },
            "MINLENGTH":{
                "value":2,
                "enable":true,
                "message":'Min length is not valid'
            },
            "MAXLENGTH":{
                "value":2,
                "enable":true,
                "message":'Max length is not valid'
            },
            "REQUIRED":{
                "value":true,
                "enable":true,
                "message":'This field is required'
            },

            "ENUM":{
                "message":"Provide value is not matching with defined data options."
            },
            "MATCH":{
                "message":"Provide value is not matching with defined data pattern."
            },
            "DEFAULT":{
                "STRING":{
                    value:""
                },
                "EMAIL":{
                    value:""
                },
                "PARAGRAPH":{
                    value:""
                },
                "STRINGKEY":{
                    value:""
                },
                "OBJECT":{
                    value:{}
                },
                "SWITCH":{
                    value:0
                },
                "NUMBER":{
                    value:0
                },
                "BOOLEAN":{
                    value:false
                }
            }
        }
    },

    UI_ENUMS:{
        HASMAP:{
            _EMAIL:'STRING',
            STRING:'STRING',
            PARAGRAPH:'STRING',
            STRINGKEY:'STRING'
        },
        EMAIL:[],
        DATE:[
            {
                "id":"min",
                "label":"Minimum",
                "valuemap":'configs.mongodb.min'
            }, {
                "id":"max",
                "label":"Maximum",
                "valuemap":'configs.mongodb.max'
            }, {
                "id":'expires',
                "label":"Expires",
                "valuemap":'configs.mongodb.expires'
            }
        ],
        STRING:[
            {
                "id":'match',
                "label":"RegExp",
                "valuemap":'configs.mongodb.match'
            }, {
                "id":'enum',
                "label":"Enums",
                "valuemap":'configs.mongodb.enum'
            }, {
                "id":"minLength",
                "label":"Min length",
                "valuemap":'configs.mongodb.minLength'
            }, {
                "id":"maxLength",
                "label":"Max length",
                "valuemap":'configs.mongodb.maxLength'
            }
        ],
        NUMBERS:[
            {
                "id":"min",
                "label":"Minimum",
                "valuemap":'configs.mongodb.min'
            }, {
                "id":"max",
                "label":"Maximum",
                "valuemap":'configs.mongodb.max'
            }, {
                "id":'enum',
                "label":"Enums",
                "valuemap":'configs.mongodb.enum'
            }, {
                "id":'populate',
                "label":"Populate - TBD",
                "valuemap":'configs.mongodb.populate'
            }
        ],
        GLOBAL:[
            {
                "id":"private",
                "label":"Private",
                "valuemap":'configs.aioconfig.private'
            }, {
                "id":"immutable",
                "label":"Non Editable",
                "valuemap":'configs.mongodb.immutable'
            }
        ],
        COMMON_FOR_ALL:[
            {
                "id":"default",
                "label":"Default Value",
                "valuemap":'configs.mongodb.default'
            }, {
                "id":"required",
                "label":"Required",
                "valuemap":'configs.mongodb.required'
            }
        ],
        TYPE_BASE:{
            STRING:[
                {
                    "id":"lowercase",
                    "label":"Lowercase",
                    "valuemap":'configs.mongodb.lowercase'
                }, {
                    "id":"uppercase",
                    "label":"Uppercase",
                    "valuemap":'configs.mongodb.uppercase'
                }, {
                    "id":"trim",
                    "label":"Trim",
                    "valuemap":'configs.mongodb.trim'
                },
                map.UNIQUE,
            ],
            OBJECTID:[
                {
                    "id":"auto",
                    "label":"Auto create",
                    "valuemap":'configs.mongodb.auto'
                },
                map.UNIQUE,
                map.INDEX
            ],
            NUMBER:[]
        }
    }
}