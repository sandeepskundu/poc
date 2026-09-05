const valid = require('./../validation');
const validation = process.aioBeLibs('helpers/_private/utils/validations');

module.exports = async (req) => {
    return {
        "request":{
            "body":await validation.build(req, 'request.body.object'),
            "methods":{
                "post":await validation.build(req, 'request.methods.post')
            }
        },
        "validation":{
            "body":{
                "type":await valid.types(req),
                "code":await validation.build(req, 'universal.text.code'),
                "name":await validation.build(req, 'universal.text.title'),
                "description":await validation.build(req, 'universal.text.description'),
                "exposed":await validation.build(req, 'universal.exposed', 'optional'),
                "isAccessControlled":await validation.build(req, 'universal.boolean', 'optional'),
            }
        }
    }
}