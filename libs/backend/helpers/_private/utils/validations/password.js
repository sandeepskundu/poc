const utils = process.aioBeLibs('helpers/_private/utils');

module.exports = {
    "message":{
        "error":{
            "checks":{
                "regex":utils.regex.password.message,
                "required":"Password is required."
            }
        }
    },
    "checks":{
        "regex": {
            "value":utils.regex.password.value
        },
        "required":{
            "value":"required"
        }
    }
}