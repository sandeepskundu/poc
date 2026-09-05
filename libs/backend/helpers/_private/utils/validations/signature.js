
const utils = process.aioBeLibs('helpers/_private/utils');
const messages = process.aioBeLibs('helpers/_private/utils/messages');

const checks = (req, type) => {
    return {
        regex:{
            value:req.helpers.json.val(utils, `regex.${type}.value`)
        },
        required:{
            value:"required"
        }
    }
}

const message = (req, msg) => {
    return {
        error:{
            checks:{
                regex:msg,
                required:msg
            }
        }
    }
}

const id = async (req) => {
    return {
        checks:checks(req, 'mongoId'),
        message:message(req, req.helpers.json.val(messages, 'signature.id'))
    }
}

const token = async (req) => {
    return {
        checks:checks(req, 'token'),
        message:message(req, req.helpers.json.val(messages, 'signature.token'))
    }
}

module.exports = {
    id:id,
    token:token
}