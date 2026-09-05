const utils = process.aioBeLibs('helpers/_private/utils');

module.exports = async (req) => {
    let msg = req.helpers.json.val(utils, 'regex.mongoId.message');

    return {
        "message":{
            "error":{
                "checks":{
                    "regex":msg,
                    "required":msg
                }
            }
        },
        "checks":{
            "regex": {
                "value":req.helpers.json.val(utils, `regex.mongoId.value`)
            },
            "required":{
                "value":"required"
            }
        }
    }
}