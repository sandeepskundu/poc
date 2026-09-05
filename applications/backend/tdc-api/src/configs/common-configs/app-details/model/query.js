const getAppById = {
    "runtime":{
        "enable":true,
        "configs":{
            "query":{
                "0":{
                    "cloumn":"_id",
                    "value":{
                        "map":"id",
                        "from":"params",
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

exports.getAppById = getAppById;