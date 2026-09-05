const utils = process.aioBeLibs('helpers/_private/utils');
const messages = process.aioBeLibs('helpers/_private/utils/messages')

const get = async (req, type, extend) =>  {
    return req.helpers.json.merge({
        "type":`stringKey`,
        "configs":{
            "mongodb":{
                "trim":true,
                "match":{
                    "enable":true,
                    "value":`${await req.helpers.enums.builder.async.init(req, [`india.states.${type}`], {node:'id', regex:true})}`,
                    "message":req.helpers.json.val(messages, `address.states.${type}`, req.helpers.json.val(messages, 'default.enums'))
                },
                "required":{
                    "value":true,
                    "enable":true,
                    "message":req.helpers.json.val(messages, 'default.required')
                },
                "default":{
                    "enable":true,
                    "value":null
                }
            }
        }
    }, (extend || {}));
}

exports.ut = async (req, extra) => {return await get(req, 'ut', extra)},
exports.all = async (req, extra) => {return await get(req, 'all', extra)},
exports.states = async (req, extra) => {return await get(req, 'states', extra)}