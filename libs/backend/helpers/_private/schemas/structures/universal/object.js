module.exports = async (req, extend) =>  {
    return req.helpers.json.merge({
        "type":"object",
        "configs":{
            "aioconfig":{},
            "mongodb":{
                "default":{
                    "value":{}
                }
            }
        }
    }, (extend || {}))
}