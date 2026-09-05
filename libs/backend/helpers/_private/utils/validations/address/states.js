const messages = process.aioBeLibs('helpers/_private/utils/messages');

const get = async (req, type) => {
    const msg = req.helpers.json.val(messages, `address.states.${type}`, req.helpers.json.val(messages, 'default.enums'));
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
                "value":await req.helpers.enums.builder.async.init(req, [`india.states.${type}`], {node:'id', regex:true})
            },
            "required":{
                "value":"required"
            }
        }
    }
}

module.exports = {
    ut:async (req) => {return await get(req, 'ut')},
    all:async (req) => {return await get(req, 'all')},
    states:async (req) => {return await get(req, 'states')}
}