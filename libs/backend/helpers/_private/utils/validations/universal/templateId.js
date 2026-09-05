const utils = process.aioBeLibs('helpers/_private/utils');

module.exports = async (req) => {
    return {
        "message":{
            "error":{
                "checks":{
                    regex:"Please enter valid template id.",
                    required: "Template id is required field."
                }
            }
        },
        "checks":{
            "regex": {
                "value":req.helpers.json.val(utils, 'regex.md5Hash.value')
            },
            "required":{
                "value":"required"
            }
        }
    }
}