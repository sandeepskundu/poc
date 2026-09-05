const getById = {
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

const getByCate = {
    "runtime":{
        "enable":true,
        "configs":{
            "query":{
                "0":{
                    "cloumn":"category",
                    "value":{
                        "from":"params",
                        "map":"id"
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

exports.getById = getById;
exports.getByCate = getByCate;