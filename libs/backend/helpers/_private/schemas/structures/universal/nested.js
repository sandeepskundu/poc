module.exports = async (req, extend) =>  {
    return req.helpers.json.merge({
        "type":"nested",
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