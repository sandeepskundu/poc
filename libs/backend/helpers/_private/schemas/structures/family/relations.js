const messages = process.aioBeLibs('helpers/_private/utils/messages')

const get = async (req, type, extend) =>  {
    return req.helpers.json.merge({
        "type":`stringKey`,
        "configs":{
            "mongodb":{
                "trim":true,
                "match":{
                    "enable":true,
                    "value":`${await req.helpers.enums.builder.async.init(req, [`family.relations.${type}`], {node:'id', regex:true})}`,
                    "message":req.helpers.json.val(messages, `family.relations`, req.helpers.json.val(messages, 'default.enums'))
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
    }, (extend || {}))
}

exports.all = async (req, extra) => { return await get(req, 'all', extra)};
exports.inlaw = async (req, extra) => { return await get(req, 'inlaw', extra)};
exports.immediate = async (req, extra) => { return await get(req, 'immediate', extra)};
exports.immediateAndInlaws = async (req, extra) => { return await get(req, 'immediateAndInlaws', extra)};