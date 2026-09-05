const md5Hash = require('./../../md5-hash');

const usernameHash = () => {
    return {
        "md5Hash":{
            "usernameHash":md5Hash.username.md5Hash,
        },

        "schema":{
            "usernameHash":true
        },
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
}

const mobileHash = () => {
    return {
        "md5Hash":{
            "mobileHash":md5Hash.mobile.md5Hash
        },
        "schema":{
            "mobileHash":true
        },
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
        "md5Hash":{
            "emailHash":md5Hash.email.md5Hash
        },

        "schema":{
            "emailHash":true
        },
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
    "email-with-otp":emailHash(),
    "mobile-with-otp":mobileHash(),
    'email-with-password':emailHash(),
    'mobile-with-password':mobileHash(),
    "username-with-password":usernameHash(),
    "username-with-email-otp":usernameHash(),
    "username-with-mobile-otp":usernameHash(),
}

exports.type = query;