const messages = process.aioBeLibs('helpers/_private/utils/messages');

module.exports = async (req, extend) => {
    const msg = req.helpers.json.val(messages, 'default.enums');
    return req.helpers.json.merge({
        "message":{
            "error":{
                "checks":{
                    "regex":msg,
                    "required":msg
                }
            }
        },
        "checks":{
            "required":{
                "value":"required"
            }
        }
    }, (extend || {}));
}