module.exports = async (req, extend) =>  {
    return req.helpers.json.merge({
        "type":"boolean",
        "configs":{
            "aioconfig":{},
            "mongodb":{
                "default":{
                    "value":true,
                    "enable":true
                }
            }
        }
    }, (extend || {}))
}