module.exports = async (req) => {
    return {
        "message":{
            "error":{
                "checks":{
                    "required":"This field is required.",
                    "regex":"The provided value doesn't seem to be valid. Please verify and try again.",
                }
            }
        },
        "checks":{
            "regex": {
                "value":`^${req.helpers.random.id(36)}$`
            },
            "required":{
                "value":"required"
            }
        }
    }
}