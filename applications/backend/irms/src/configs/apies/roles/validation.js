const messages = process.aioBeLibs('helpers/_private/utils/messages');

const bandOrGrade = async (req, type, optional) => {
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
                "value":await req.helpers.enums.builder.async.init(req, [`employment.${type}.default`], {node:'id', regex:true})
            }
        }
    }
}

exports.bandOrGrade = bandOrGrade