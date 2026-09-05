const utils = process.aioBeLibs('helpers/_private/utils');
const messages = process.aioBeLibs('helpers/_private/utils/messages');

module.exports = async (req) => {
    const msg = req.helpers.json.val(messages, `blood.groups`, req.helpers.json.val(messages, 'default.enums'))
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
            "regex":{
                "value":await req.helpers.enums.builder.async.init(req, [`blood.groups`], {node:'id', regex:true})
            },
            "required":{
                "value":"required"
            }
        }
    }
}