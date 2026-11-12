module.exports = async (req, extend) =>  {
    return req.helpers.json.merge({
        "type": "mixed",
        "configs": {
            "mongodb": {
                "required": {
                    "value":true,
                    "enable":false,
                    "message": "This field is required"
                }
            }
        }
    }, (extend || {}))
}