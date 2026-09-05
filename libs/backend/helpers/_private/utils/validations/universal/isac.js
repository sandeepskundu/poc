const messages = process.aioBeLibs('helpers/_private/utils/messages');

module.exports = async (req, extend) => {
    return req.helpers.json.merge({
        "message":{
            "error":{
                "default":req.helpers.json.val(messages, 'data.types.boolean', '')
            }
        },
        "checks":{
            "boolean":{
                "value":"required"
            },
            "required":{
                "value":"optional",
            }
        }
    }, (extend || {}));
}