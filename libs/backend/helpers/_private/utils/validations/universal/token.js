const utils = process.aioBeLibs('helpers/_private/utils');

module.exports = async (req) => {
    return {
        "message":{
            "error":{
                "checks":{
                    regex:utils.regex.token.message,
                    required: "This field is required."
                }
            }
        },
        "checks":{
            "regex": {
                "value":utils.regex.token.value
            },
            "required":{
                "value":"required"
            }
        }
    }
}