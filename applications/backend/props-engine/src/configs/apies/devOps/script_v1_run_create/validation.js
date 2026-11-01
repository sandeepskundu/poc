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
                "mode":await validation.build(req, 'universal.require'),
                "stream":await validation.build(req, 'universal.require'),
                "commands":await validation.build(req, 'universal.require')
            }
        }
    }
}