const messages = process.aioBeLibs('helpers/_private/utils/messages');

const enums = async (req, map, optional) => {
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
                "value":await req.helpers.enums.builder.async.init(req, [map], {node:'id', regex:true}, {})
            }
        }
    }
}


const types = async (req, optional) => {
    return await enums(req, 'employment.type.default', optional)
}

const status = async (req, optional) => {
    return await enums(req, 'employment.status.default', optional)
}

const workMode = async (req, optional) => {
    return await enums(req, 'employment.workMode.default', optional)
}

const employedBy =  async (req, optional) => {
    return await enums(req, 'employment.employedBy.default', optional)
}

exports.types = types;
exports.status = status;
exports.workMode = workMode;
exports.employedBy = employedBy;