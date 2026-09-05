const model = process.aioBeLibs('helpers/_private/auth/model');

module.exports = {
    "values":model.values.always,
    "md5Hash":{
        "usernameHash":model.md5Hash.username.md5Hash
    },

    "schema":{
        "username":true,
        "usernameHash":true,
    },

    "valuemap": {},

    "query":{
        "runtime":{
            "enable":true,
            "configs":{
                "query":{
                    "0":{
                        "cloumn":"usernameHash",
                        "value":{
                            "from":"body-item",
                            "map":"usernameHash"
                        },
                        "operation":{
                            "eq":{
                                "enable":true,
                                "opType":"eq"
                            }
                        }
                    }
                }
            }
        }
    }
}