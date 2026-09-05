
const utils = process.aioBeLibs('helpers/_private/utils');
const messages = process.aioBeLibs('helpers/_private/utils/messages');

const get = async (req, type) => {
    const msg = req.helpers.json.val(messages, `family.relations`, req.helpers.json.val(messages, 'default.enums'));
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
                "value":await req.helpers.enums.builder.async.init(req, [`family.relations.${type}`], {node:'id', regex:true})
            },
            "required":{
                "value":"required"
            }
        }
    }
}

exports.inlaw = async (req) => { return await get(req, 'inlaw')};
exports.immediate = async (req) => { return await get(req, 'immediate')};
exports.immediateAndInlaws = async (req) => { return await get(req, 'immediateAndInlaws')};