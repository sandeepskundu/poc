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
                            "required":"This field is required."
                        }
                    }
                },
                "checks":{
                    "minlength":{
                        "value":32
                    },
                    "maxlength":{
                        "value":32
                    },
                    "required":{
                        "value":"required"
                    }
                }
            }
        }
    }
}