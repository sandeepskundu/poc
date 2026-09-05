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
                "code":await valid.code(req),
                "name":await validation.build(req, 'universal.text.title'),
                "parentId":await validation.build(req, 'universal.hashId'),
                "description":await validation.build(req, 'universal.text.description'),
                "departOrRoleHash":await validation.build(req, 'universal.hashId'),
                "departOrRoleHashMap":await validation.build(req, 'universal.hashmap.optional'),
            }
        }
    }
}