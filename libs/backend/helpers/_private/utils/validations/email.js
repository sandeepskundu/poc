const utils = process.aioBeLibs('helpers/_private/utils');

module.exports = {
    id:{
        "message":{
            "error":{
                "checks":{
                    "regex":utils.regex.email.message,
                    "required":"Email id is required.",
                    "date":"Invalid date"
                }
            }
        },
        "checks":{
            "regex": {
                "value":utils.regex.email.value
            },
            "required":{
                "value":"required"
            },
            __date:{
                value:{
                    valuemap:{
                        from:"body-item",
                        map:"adult"
                    },
                    to:'2025-08-11',
                    from:'2025-08-11'
                }
            }
        }
    }
}