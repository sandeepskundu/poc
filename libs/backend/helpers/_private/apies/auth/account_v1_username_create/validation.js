const validation = process.aioBeLibs('helpers/_private/utils/validations');

module.exports = async (req) => {
    return {
        "request":{
            "methods":{
                "post":await validation.build(req, 'request.methods.post')
            },
        },
        "validation":{
            "body":{
                "username":await validation.build(req, 'username')
            }
        }
    }
}