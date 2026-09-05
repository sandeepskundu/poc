const get = async (req, arg) => {
    return req.helpers.json.merge({
        "min":1,
        "max":10,
        "type":"object",
        "required":"required",
        "message":{
            "error":"Pls provide correct data details"
        }
    }, arg || {})
}

const object = async (req) => {
    return await get(req, {})
}

exports.object = object;