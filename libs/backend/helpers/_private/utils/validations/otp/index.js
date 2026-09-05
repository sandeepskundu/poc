const utils = process.aioBeLibs('helpers/_private/utils');

const code = async (req) => {
    return {
        "message":{
            "error":{
                "checks":{
                    "regex":req.helpers.json.val(utils, 'regex.otp.message'),
                    "required":req.helpers.json.val(utils, 'regex.otp.message')
                }
            }
        },
        "checks":{
            "regex": {
                "value":req.helpers.json.val(utils, 'regex.otp.value')
            },
            "required":{
                "value":"required"
            }
        }
    }
}

const via = async (req) => {
    return {
        "message":{
            "error":{
                "checks":{
                    "enums":"You can receive the OTP on your email or mobile number.",
                    "required":"You can receive the OTP on your email or mobile number."
                }
            }
        },
        "checks":{
            "enums":{
                "value":{
                    "email":true,
                    "mobile":true
                }
            },
            "required":{
                "value":"required"
            }
        }
    }
}

exports.via = via;
exports.code = code;