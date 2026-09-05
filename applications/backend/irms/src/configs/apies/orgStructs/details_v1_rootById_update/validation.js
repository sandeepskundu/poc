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
                "name":await validation.build(req, 'universal.text.title'),
                "exposed":await validation.build(req, 'universal.exposed', 'optional'),
                "description":await validation.build(req, 'universal.text.description'),
                "isAccessControlled":await validation.build(req, 'universal.boolean', 'optional')
            }
        }
    }
}