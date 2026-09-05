const validation = process.aioBeLibs('helpers/_private/utils/validations');

const otp = () => {
    return {
        "checks":{
            "required":{
                "value":"optional"
            }
        }
    }
}

module.exports = async (req) => {
    return {
        "request":{
            "methods":{
                "post":await validation.build(req, 'request.methods.post')
            }
        },
        "validation":{
            "body":{
                "otp.sms":await validation.build(req, 'otp.code', otp()),
                "otp.email":await validation.build(req, 'otp.code', otp()),
                "otp.whatsapp":await validation.build(req, 'otp.code', otp()),
                "otp.token":await validation.build(req, 'universal.token', {
                    "message":{
                        "error":{
                            "checks":{
                                "regex":"Invalid OTP token. Please check and try again.",
                                "required":"Token is a required field."
                            }
                        }
                    }
                }),
                "otp.trackId":await validation.build(req, 'universal.mongoId', {
                    "message":{
                        "error":{
                            "checks":{
                                "required":"Track ID is a required field."
                            }
                        }
                    }
                })
            }
        }
    }
}