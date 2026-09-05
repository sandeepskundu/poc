const messages = process.aioBeLibs('helpers/_private/utils/messages');

const type = async (req, type, optional) => {
    const msg = req.helpers.json.val(messages, 'default.enums');
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
            "required":{
                "value":optional?optional:"required"
            },
            "regex":{
                "value":await req.helpers.enums.builder.async.init(req, [`access.from.default`], {node:'id', regex:true})
            }
        }
    }
}

exports.type = type