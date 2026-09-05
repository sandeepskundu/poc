const signature = {
    "signature.id":{
        "message":{
            "error":{
                "checks":{
                    "regex":"Please provide vaild signature id",
                    "minlength":"Please provide vaild signature id",
                    "maxlength":"Please provide vaild signature id",
                    "required":"Signature id is required"
                }
            }
        },
        "checks":{
            "regex":{
                "value":'^[a-zA-Z0-9]+$',
                "uivalue":'^[a-zA-Z0-9]+$',
                "bothAreSame":true
            },
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

    "signature.token":{
        "message":{
            "error":{
                "checks":{
                    "minlength":"Please provide vaild signature token",
                    "required":"Signature token is required"
                }
            }
        },
        "checks":{
            "minlength":{
                "value":32
            },
            "required":{
                "value":"required"
            }
        }
    },
}

module.exports = signature;