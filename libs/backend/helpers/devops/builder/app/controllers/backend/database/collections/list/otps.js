const utils = process.aioBeLibs('helpers/_private/utils')

const date = () => {
    return {
        "type":`date`,
        "configs":{
            "mongodb":{
                "required":{
                    "value":true,
                    "enable":true,
                    "message":"This field is required"
                }
            }
        }
    }
}

const encoded = () => {
    return {
        "type":"stringKey",
        "configs":{
            "mongodb":{
                "trim":true,
                "required":{
                    "value":true,
                    "enable":true,
                    "message":"This field is required"
                }
            }
        }
    }
}

const emailOrMobileHash = (required) => {
    let mdb = {
        "trim":true,
        "minLength":{
            "value":"32",
            "enable":true,
            "message":"Min length is not valid"
        },
        "maxLength":{
            "value":"32",
            "enable":true,
            "message":"Max length is not valid"
        }
    }

    if(required){
        mdb = {...mdb, ...{
            "required":{
                "value":true,
                "enable":true,
                "message":"This field is required"
            }
        }}
    }

    return {
        "type":"stringKey",
        "configs":{
            "mongodb":mdb,
            "aioconfig":{}
        }
    }
}

const schema = {
    "collection":{
        "name":utils.constants.otp.OTP_COLLECTION_NAME
    },
    "schema":{
        "resendAt":date(),
        "validTill":date(),

        "otps":encoded(),
        "status":encoded(),
        "channels":encoded(),
        "recipients":encoded(),
        
        "emailHash":emailOrMobileHash(),
        "mobileHash":emailOrMobileHash(),
        "hashId":emailOrMobileHash(true),

        "verifiedAt":{
            "type":`date`
        },

        "created":{
            "type":`date`,
            "configs":{
                "mongodb":{
                    "default":{
                        "value":`Date.now()`,
                        "enable":true,
                        "message":"This field is required"
                    }
                }
            }
        },

        "metaData":{
            "type":`object`,
            "configs":{
                "mongodb":{
                    "required":{
                        "value":true,
                        "enable":true,
                        "message":"This field is required"
                    }
                }
            }
        },

        "progress":{
            "type":`stringKey`,
            "configs":{
                "mongodb":{
                    "enum":{
                        "enable":true,
                        "value":`['SENT', 'EXPIRED', 'VALIDATED', 'RESENT']`
                    },
                    "default":{
                        "enable":true,
                        "value":`"SENT"`,
                        "message":"This field is required"
                    }
                }
            }
        },

        "purpose":{
            "type":`stringKey`,
            "configs":{
                "mongodb":{
                    "enum":{
                        "enable":true,
                        "value":`['LOGIN', 'ADAPTIVE_LOGIN', 'REGISTER', 'VERIFY', 'UPDATE_EMAIL', 'UPDATE_MOBILE', 'FORGOT_PASSWORD']`
                    },
                    "default":{
                        "enable":true,
                        "value":`"VERIFY"`,
                        "message":"This field is required"
                    }
                }
            }
        }
    }
}

module.exports = schema;