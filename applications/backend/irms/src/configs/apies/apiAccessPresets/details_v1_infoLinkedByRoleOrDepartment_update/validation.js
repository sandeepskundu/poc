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
                "code":await valid.code(req, 'optional'),
                "name":await validation.build(req, 'universal.text.title', 'optional'),
                "hasChilds":await validation.build(req, 'universal.boolean', 'optional'),
                "description":await validation.build(req, 'universal.text.description', 'optional'),
                "departOrRoleHash":await validation.build(req, 'universal.hashId'),
                "departOrRoleHashMap":await validation.build(req, 'universal.hashmap.optional')
            }
        }
    }
}