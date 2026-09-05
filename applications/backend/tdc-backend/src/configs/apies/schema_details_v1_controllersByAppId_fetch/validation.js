module.exports = {
    "request":{
        "methods":{
            "get":{
                "allowed":true,
                "message":{
                    "error":"Only get method is allowed",
                    "success":"Only get method is allowed"
                }
            }
        },

        "body":{
            "min":1,
            "max":10,
            "type":"nothing",
            "required":"optional",
            "message":{
                "error":"Only put method is allowed",
                "success":"Only put method is allowed"
            }
        }
    },
    "validation":{
        "params":{
            "id":{
                "message":{
                    "error":{
                        "checks":{
                            "minlength":"Id is not valid",
                            "maxlength":"Id is not valid",
                            "required":"Id is required"
                        }
                    }
                },
                "checks":{
                    "minlength":{
                        "value":24
                    },
                    "maxlength":{
                        "value":24
                    },
                    "required":{
                        "value":"required"
                    }
                }
            },
            "subId":{
                "message":{
                    "error":{
                        "checks":{
                            "minlength":"Id is not required",
                            "required":"Sub type is required"
                        }
                    }, 
                    "success":{
                        "checks":{
                            "minlength":"Id is not required",
                            "required":"Sub type is required"
                        }
                    }
                },
                "checks":{
                    "minlength":{
                        "value":2
                    },
                    "required":{
                        "value":"required"
                    }
                }
            }
        }
    }
}