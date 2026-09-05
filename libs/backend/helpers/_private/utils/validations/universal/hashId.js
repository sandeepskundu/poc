const utils = process.aioBeLibs('helpers/_private/utils');

module.exports = async (req) => {
    let msg = req.helpers.json.val(utils, 'regex.md5Hash.message');

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
                "value":req.helpers.json.val(utils, `regex.md5Hash.value`)
            },
            "required":{
                "value":"required"
            }
        }
    }
}