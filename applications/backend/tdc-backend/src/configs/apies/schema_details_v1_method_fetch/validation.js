module.exports = {
    "request":{
        "methods":{
            "get":{
                "allowed":true,
                "message":{
                    "error":"Only put method is allowed",
                    "success":"Only put method is allowed"
                }
            }
        }
    },
    "validation":{
        "params":{
            "id":{
                "message":{
                    "error":{
                        "checks":{
                            "minlength":"ID is not valid",
                            "maxlength":"ID is not valid",
                            "required":"This field is required."
                        }
                    }, 
                    "success":{
                        "checks":{
                            "minlength":"ID is not valid",
                            "maxlength":"ID is not valid",
                            "required":"This field is required."
                        }
                    }
                },
                "checks":{
                    "minlength":{
                        "value":32,
                        "uivalue":32,
                        "bothAreSame":true
                    },
                    "maxlength":{
                        "value":32,
                        "uivalue":32,
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