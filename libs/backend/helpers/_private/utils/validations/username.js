const utils = process.aioBeLibs('helpers/_private/utils');

module.exports = {
    "message":{
        "error":{
            "checks":{
                "regex":utils.regex.username.message,
                "required":"Username is required."
            }
        }
    },
    "checks":{
        "regex": {
            "value":utils.regex.username.value
        },
        "required":{
            "value":"required"
        }
    }
}