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
                "otp.token":await validation.build(req, 'universal.hashId', {
                    "message":{
                        "error":{
                            "checks":{
                                "regex":"Invalid OTP token. Please check and try again.",
                                "required":"An OTP token is required to proceed."
                            }
                        }
                    }
                }),
                "trackId":await validation.build(req, 'universal.mongoId'),
                "password":await validation.build(req, 'password'),
                "confirmPassowrd":await validation.build(req, 'password', {
                    "message":{
                        "error":{
                            "checks":{
                                "required":"Confirm password is required."
                            }
                        }
                    }
                })
            }
        }
    }
}