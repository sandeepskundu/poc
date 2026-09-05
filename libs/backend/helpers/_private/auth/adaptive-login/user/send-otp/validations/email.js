const utils = process.aioBeLibs('helpers/_private/utils');

module.exports = {
    "data.email.id":{
        "message":{
            "error":{
                "checks":{
                    "regex":utils.regex.email.message,
                    "required":"Email id is required."
                }
            }
        },
        "checks":{
            "regex": {
                "value":utils.regex.email.value
            },
            "required":{
                "value":"required"
            }
        }
    }
}