const utils = process.aioBeLibs('helpers/_private/utils');

module.exports = {
    "data.mobile.isd":{
        "message":{
            "error":{
                "checks":{
                    "enums":"That’s not a real dialing code, buddy.",
                    "required":"Dialing code is required."
                }
            }
        },
        "checks":{
            "enums":{
                "value":{
                    "91":true,
                }
            },
            "required":{
                "value":"required"
            }
        }
    },

    "data.mobile.iso2":{
        "message":{
            "error":{
                "checks":{
                    "enums":"Please enter a valid iso2 code",
                    "required":"ISO2 code is required."
                }
            }
        },
        "checks":{
            "enums":{
                "value":{
                    "IN":true,
                }
            },
            "required":{
                "value":"required"
            }
        }
    },

    "data.mobile.iso3":{
        "message":{
            "error":{
                "checks":{
                    "enums":"Please enter a valid iso3 code",
                    "required":"ISO3 code is required."
                }
            }
        },
        "checks":{
            "enums":{
                "value":{
                    "IND":true,
                }
            },
            "required":{
                "value":"required"
            }
        }
    },

    "data.mobile.number":{
        "message":{
            "error":{
                "checks":{
                    "enums":utils.regex.mobile.dom.message,
                    "required":"Mobile number is required."
                }
            }
        },
        "checks":{
            "regex": {
                "value":utils.regex.mobile.dom.value
            },
            "required":{
                "value":"required"
            }
        }
    }
}