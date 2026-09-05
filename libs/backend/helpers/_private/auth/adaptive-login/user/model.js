const config = {
     "schema": {
        "emailHash": true,
        "mobileHash": true,
        "usernameHash": true,
        "passwordHash": true
    },

    "values": {
        "default": {},
        "exclude": {},
        "hardcoded": {},
    },

    "valuemap": {
        "_merchantId": {
            "valuemap": {
                "map": "id",
                "from": "merchant"
            }
        }
    },

    "query": {
        "hidden": {
            "enable": true,
            "configs": {
                "columns": {
                    "merchantId": {
                        "enable": true
                    }
                }
            }
        }
    },

    "md5Hash": {
        "emailHash": {
            "nodes": {
                "0": {
                    "map": "runtimeUtils.merchantRootHash",
                    "from": "appConfig"
                },
                "1": {
                    "map": "org.email.id",
                    "from": "body-item"
                }
            }
        },
        "mobileHash": {
            "nodes": {
                "0": {
                    "map": "runtimeUtils.merchantRootHash",
                    "from": "appConfig"
                },
                "1": {
                    "map": "org.mobile.iso2",
                    "from": "body-item"
                },
                "2": {
                    "map": "org.mobile.iso3",
                    "from": "body-item"
                },
                "3": {
                    "map": "org.mobile.isd",
                    "from": "body-item"
                },
                "4": {
                    "map": "org.mobile.number",
                    "from": "body-item"
                }
            }
        }
    }
}

module.exports = config;