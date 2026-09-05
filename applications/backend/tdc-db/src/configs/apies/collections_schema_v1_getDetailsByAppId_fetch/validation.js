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
                            "minlength":"App ID is not valid",
                            "maxlength":"App ID is not valid",
                            "required":"App ID is required."
                        }
                    }
                },
                "checks":{
                    "minlength":{
                        "value":24,
                        "uivalue":24,
                        "bothAreSame":true
                    },
                    "maxlength":{
                        "value":24,
                        "uivalue":24,
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