const utils = process.aioBeLibs('helpers/_private/utils');
const messages = process.aioBeLibs('helpers/_private/utils/messages');

const title = async (req, type, extend) => {
    const msg = req.helpers.json.val(messages, `name.titles`, req.helpers.json.val(messages, 'default.enums'));
    return req.helpers.json.merge({
        "message":{
            "error":{
                "checks":{
                    "enums":msg,
                    "required":msg
                }
            }
        },
        "checks":{
            "enums":{
                "value":await req.helpers.enums.builder.async.init(req, [`name.titles.${type}`], {node:'id', returnmap:true})
            },
            "required":{
                "value":"required"
            }
        }
    }, (extend || {}));
}

const name = async (req, type, extend) => {
    let msg = req.helpers.json.val(utils, `regex.name.${type}.message`);
    let regex = req.helpers.json.val(utils, `regex.name.${type}.value`);
    return req.helpers.json.merge({
        "message":{
            "error":{
                "checks":{
                    "regex":msg,
                    "required":msg
                }
            }
        },
        "checks":{
            "regex": {
                "value":regex
            },
            "required":{
                "value":"required"
            }
        }
    }, (extend || {}));
}

module.exports = {
    fn:async (req, extend) => {return await name(req, 'fn', extend)},
    mn:async (req, extend) => {return await name(req, 'mn', extend)},
    ln:async (req, extend) => {return await name(req, 'ln', extend)},
    fmn:async (req, extend) => {return await name(req, 'fmn', extend)},
    titles:{
        all:async (req, extend) => {return await title(req, 'all', extend)},
        child:async (req, extend) => {return await title(req, 'child', extend)},
        infant:async (req, extend) => {return await title(req, 'infant', extend)},
        adults:async (req, extend) => {return await title(req, 'adults', extend)}
    },
}