module.exports = {
    "id":{
        "message":{
            "error":{
                "checks":{
                    "regex":"Please provide vaild id",
                    "minlength":"Please provide vaild id",
                    "maxlength":"Please provide vaild id",
                    "required":"Please provide vaild id"
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
}