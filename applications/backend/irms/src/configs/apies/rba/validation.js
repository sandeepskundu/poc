const messages = process.aioBeLibs('helpers/_private/utils/messages');

const linkFor = async (req, type, optional) => {
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
                "value":await req.helpers.enums.builder.async.init(req, [`access.link.for`], {node:'id', regex:true})
            }
        }
    }
}

const linkType = async (req, type, optional) => {
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
                "value":await req.helpers.enums.builder.async.init(req, [`access.link.type`], {node:'id', regex:true})
            }
        }
    }
}

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
                "value":await req.helpers.enums.builder.async.init(req, [`access.rolebaseAccess.permissons.types`], {node:'id', regex:true})
            }
        }
    }
}

exports.type = type;
exports.linkFor = linkFor;
exports.linkType = linkType;