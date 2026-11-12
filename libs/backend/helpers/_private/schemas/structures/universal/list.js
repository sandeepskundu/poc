module.exports = async (req, extend) =>  {
    return req.helpers.json.merge({
        "type":"list",
        "configs":{
            
        },
        "childs":{
            /*--
                c0:{
                    "aioconfig":{},
                    "mongodb":{
                        "default":{
                            "value":{}
                        }
                    }
                }
            --*/
        }
    }, (extend || {}))
}