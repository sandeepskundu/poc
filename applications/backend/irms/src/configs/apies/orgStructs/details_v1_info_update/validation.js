const valid = require('./../validation');
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
                id:await validation.build(req, 'universal.mongoId')
            },
            "body":{
                "type":await valid.types(req, 'optional'),
                "code":await validation.build(req, 'universal.text.code', 'optional'),
                "exposed":await validation.build(req, 'universal.exposed', 'optional'),
                "name":await validation.build(req, 'universal.text.title', 'optional'),
                "hasChilds":await validation.build(req, 'universal.boolean', 'optional'),
                "description":await validation.build(req, 'universal.text.description', 'optional'),
                "isAccessControlled":await validation.build(req, 'universal.boolean', 'optional')
            }
        }
    }
}