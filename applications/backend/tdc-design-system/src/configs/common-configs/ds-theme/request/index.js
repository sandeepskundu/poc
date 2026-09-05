module.exports = {
    "methods":{
        "post":{
            "allowed":true,
            "message":{
                "error":"Only post method is allowed",
                "success":"Only post method is allowed"
            }
        }
    },

    "body":{
        "create":{
            "min":1,
            "max":10,
            "type":"object",
            "required":"required",
            "message":{
                "error":"Request body data can have only object value",
                "success":""
            }
        }
    }
}