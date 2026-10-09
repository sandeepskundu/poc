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
                "map":await validation.build(req, 'universal.require'),
                "detailed":await validation.build(req, 'universal.boolean')
            }
        }
    }
}