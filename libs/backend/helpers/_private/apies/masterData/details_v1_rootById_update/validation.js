const validation = process.aioBeLibs('helpers/_private/utils/validations');

module.exports = async (req) => {
    return {
        "request":{
            "body":await validation.build(req, 'request.body.object'),
            "methods":{
                "put":await validation.build(req, 'request.methods.put')
            }
        },
        "validation":{
            "params":{
                "id":await validation.build(req, 'universal.mongoId')
            },
            "body":{
                "signature.id":await validation.build(req, 'signature.id'),
                "signature.token":await validation.build(req, 'signature.token'),
                "exposed":await validation.build(req, 'universal.exposed', 'optional'),
                "name":await validation.build(req, 'universal.text.title'),
                "details.value":await validation.build(req, 'universal.text.title', 'optional'),
                "details.label":await validation.build(req, 'universal.text.title', 'optional'),
                "description":await validation.build(req, 'universal.text.description'),
                "isAccessControlled":await validation.build(req, 'universal.boolean', 'optional')
            }
        }
    }
}