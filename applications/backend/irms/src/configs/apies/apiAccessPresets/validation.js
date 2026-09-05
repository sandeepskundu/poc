const CONSTS = require('./../../constants')
const messages = process.aioBeLibs('helpers/_private/utils/messages');

const code = async (req, optional) => {
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
                "value":await req.helpers.enums.builder.async.init(req, [`orgStructsTypes`], {node:'id', regex:true}, {orgStructsTypes:CONSTS.access.api.presets.types})
            }
        }
    }
}

exports.code = code