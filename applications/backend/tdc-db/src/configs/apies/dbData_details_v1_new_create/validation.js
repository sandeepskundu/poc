module.exports = {
    "request":{
        "methods":{
            "post":{
                "allowed":true,
                "message":{
                    "error":"Only post method is allowed",
                    "success":"Only post method is allowed"
                }
            }
        },
        "body":{
            "min":1,
            "max":10,
            "type":"object",
            "required":"required",
            "message":{
                "error":"Put method is allowed",
                "success":"Put method is allowed"
            }
        }
    },
    "validation":{
        "body":{
            "name":{
                "message":{
                    "error":{
                        "checks":{
                            "required":"Database name is required.",
                            "regex":"Database name is not in valid format"
                        }
                    },
                },
                "checks":{
                    "regex":{
                        "value":'^[a-zA-Z-]+$',
                        "uivalue":'^[a-zA-Z-]+$',
                        "bothAreSame":true
                    },
                    "minLength":{
                        "value":4,
                        "uivalue":4,
                        "bothAreSame":true
                    },
                    "maxLength":{
                        "value":40,
                        "uivalue":40,
                        "bothAreSame":true
                    },
                    "required":{
                        "value":"required",
                        "uivalue":"required",
                        "bothAreSame":true
                    }
                }
            },
            "description":{
                "message":{
                    "error":{
                        "checks":{
                            "required":"This field is required."
                        }
                    }, 
                    "success":{
                        "default":"IN",
                        "checks":{
                            "required":"This field is required."
                        }
                    }
                },
                "checks":{
                    "minLength":{
                        "value":2,
                        "uivalue":2,
                        "bothAreSame":true
                    },
                    "maxLength":{
                        "value":240,
                        "uivalue":240,
                        "bothAreSame":true
                    },
                    "required":{
                        "value":"required",
                        "uivalue":"required",
                        "bothAreSame":true
                    }
                }
            }
        }
    }
}