const utils = process.aioBeLibs('helpers/_private/utils');

module.exports = async (req, extend) =>  {
    let msg = req.helpers.json.val(utils, 'regex.mongoId.message');

    return req.helpers.json.merge({
        "type":`objectId`,
        "configs":{
            "mongodb":{
                "trim":true,
                "unique":true,
                "required":{
                    "value":true,
                    "enable":true,
                    "message":msg
                },
                "match":{
                    "enable":true,
                    "message":msg,
                    "value":`${req.helpers.json.val(utils, `regex.mongoId.value`)}`
                }
            }
        }
    }, (extend || {}))
}