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