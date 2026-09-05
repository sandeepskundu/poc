const utils = process.aioBeLibs('helpers/_private/utils');
const messages = process.aioBeLibs('helpers/_private/utils/messages');

const get = async (req, type) => {
    const msg = req.helpers.json.val(messages, `gender.types.${type}`, req.helpers.json.val(messages, 'default.enums'));
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
                "value":await req.helpers.enums.builder.async.init(req, [`gender.types.${type}`], {node:'id', regex:true})
            },
            "required":{
                "value":"required"
            }
        }
    }
}

exports.default = async (req) => { return await get(req, 'default')};