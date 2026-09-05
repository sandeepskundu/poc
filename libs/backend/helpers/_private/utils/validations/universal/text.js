const utils = process.aioBeLibs('helpers/_private/utils');
const messages = process.aioBeLibs('helpers/_private/utils/messages');

const required = () => {
    return {
        "value":"required"
    }
}

const get = async (req, type, extra) => {
    let msg = req.helpers.json.val(utils, `regex.text.${type}.message`);

    return {
        "message":{
            "error":{
                "default":msg
            }
        },
        "checks":{
            "regex": {
                "value":req.helpers.json.val(utils, `regex.text.${type}.value`)
            },
            "required":required()
        }
    }
}


const minmax = async (count) => {
    if(count > -1){
        return {
            "value":count
        }
    }

    return {};
}

const error = (req) => {
    return {
        "default":req.helpers.json.val(messages, 'default.required'),
        "checks":{
            minLength:req.helpers.json.val(messages, 'default.length.min', "Min length is not valid"),
            maxLength:req.helpers.json.val(messages, 'default.length.max', "Max length is not valid")
        }
    }
}

const description = async (req) => {
    return {
        "message":{
            "error":error(req)
        },
        "checks":{
            "required":required(req),
            "minLength":await minmax(10),
            "maxLength":await minmax(500)
        }
    }
}

const title = async (req) => {
    return {
        "message":{
            "error":error(req)
        },
        "checks":{
            "required":required(req),
            "minLength":await minmax(2),
            "maxLength":await minmax(50)
        }
    }
}

exports.title = title;
exports.description = description;
exports.key = async (req, extra) => {return await get(req, 'key', extra)}
exports.code = async (req, extra) => {return await get(req, 'code', extra)}
exports.lowerCode = async (req, extra) => {return await get(req, 'lowerCode', extra)}
exports.richtext = async (req, extra) => {return await get(req, 'richtext', extra)}
exports.paragraph = async (req, extra) => {return await get(req, 'paragraph', extra)};
exports.paragraphs = async (req, extra) => {return await get(req, 'paragraphs', extra)};