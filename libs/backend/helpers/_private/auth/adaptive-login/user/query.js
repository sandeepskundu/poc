const mobileHash = () => {
    return {
        "query":{
            "runtime":{
                "enable":true,
                "configs":{
                    "query":{
                        "0":{
                            "cloumn":"mobileHash",
                            "value":{
                                "from":"body-item",
                                "map":"mobileHash"
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
}

const emailHash = () => {
    return {
        "query":{
            "runtime":{
                "enable":true,
                "configs":{
                    "query":{
                        "0":{
                            "cloumn":"emailHash",
                            "value":{
                                "from":"body-item",
                                "map":"emailHash"
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
}

const query = {
    "email":emailHash(),
    "mobile":mobileHash()
}

exports.type = query;