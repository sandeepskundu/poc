const utils = process.aioBeLibs('helpers/_private/utils');
const messages = process.aioBeLibs('helpers/_private/utils/messages');

const required = async (req, msg) => {
    return {
        "value":true,
        "enable":true,
        "message":(msg || req.helpers.json.val(messages, 'default.required'))
    }
}

const get = async (req, extra, type) => {
    let msg = req.helpers.json.val(utils, `regex.text.${type}.message`);

    return req.helpers.json.merge({
        "type":`string`,
        "configs":{
            "mongodb":{
                "trim":true,
                "required":await required(req, msg),
                "validate":`{
                    validator: async function (v) {
                        if (!v) {
                            return true;
                        }else{
                            const regex = new RegExp(\`${req.helpers.json.val(utils, `regex.text.${type}.value`)}\`);
                            return regex.test(v);
                        }
                    },
                    message: props => ({
                        path: props.path,
                        message:"${msg}"
                    }),
                }`
            }
        }
    }, (extra || {}));
}

const minmax = (req, type, count) => {
    let msg = {
        min:req.helpers.json.val(messages, 'default.length.min', "Min length is not valid"),
        max:req.helpers.json.val(messages, 'default.length.min', "Max length is not valid")
    };

    if(msg[type] && count > -1){
        return {
            "value":count,
            "enable":true,
            "message":msg[type]
        }
    }

    return {};
}

const description = async (req, extra) => {
    return req.helpers.json.merge({
        "type":"paragraph",
        "configs":{
            "mongodb":{
                "trim":true,
                "minLength":minmax(req, 'min', 10),
                "maxLength":minmax(req, 'max', 1000),
                "required":await required(req)
            }
        }
    }, (extra || {}));
}

const title = async (req, extra) => {
    return req.helpers.json.merge({
        "type":"paragraph",
        "configs":{
            "mongodb":{
                "trim":true,
                "minLength":minmax(req, 'min', 2),
                "maxLength":minmax(req, 'max', 100),
                "required":await required(req),
            }
        }
    }, (extra || {}));
}


exports.title = title;
exports.description = description;
exports.key = async (req, extra) => {return await get(req, extra, 'key')};
exports.code = async (req, extra) => {return await get(req, extra, 'code')};
exports.richtext = async (req, extra) => {return await get(req, extra, 'richtext')}
exports.paragraph = async (req, extra) => {return await get(req, extra, 'paragraph')};
exports.paragraphs = async (req, extra) => {return await get(req, extra, 'paragraphs')};