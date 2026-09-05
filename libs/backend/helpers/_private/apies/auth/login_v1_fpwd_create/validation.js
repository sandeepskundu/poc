const validation = process.aioBeLibs('helpers/_private/utils/validations');

module.exports = async (req) => {
    return {
        "request":{
            "methods":{
                "post":await validation.build(req, 'request.methods.post')
            }
        },
        "validation":{
            "body":{
                "isd":await validation.build(req, 'mobile.isd'),
                "iso2":await validation.build(req, 'mobile.iso2'),
                "iso3":await validation.build(req, 'mobile.iso3'),
                "otpvia":await validation.build(req, 'otp.via' , {
                    "checks":{
                        "required":{
                            "value":"optional"
                        }
                    }
                }),
                "identifier":await validation.build(req, 'username', {
                    "message":{
                        "error":{
                            "checks":{
                                "required":"Please enter a valid mobile number/email/username."
                            }
                        }
                    }
                })
            }
        }
    }
}