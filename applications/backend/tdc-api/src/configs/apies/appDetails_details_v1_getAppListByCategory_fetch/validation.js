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
        },
    },
    "validation":{
        "params":{
            "id":{
                "message":{
                    "error":{
                        "checks":{
                            "enums":"Please select a vaild app category",
                            "required":"App category is required."
                        }
                    }
                },
                "checks":{
                    "enums":{
                        "value":{
                            "ui":true,
                            "api":true
                        },
                        "uivalue":{
                            "ui":true,
                            "api":true
                        },
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