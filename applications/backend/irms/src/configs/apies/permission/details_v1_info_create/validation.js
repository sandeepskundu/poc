
const validate = require('./../validation');
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
                "type":await validate.type(req),
                "itemId":await validation.build(req, 'universal.mongoId'),
                "userId":await validation.build(req, 'universal.mongoId'),
                "relation":await validation.build(req, 'universal.text.code', {}),
                //"perms.fetch":await validation.build(req, 'universal.boolean'),
                //"perms.create":await validation.build(req, 'universal.boolean'),
                //"perms.update":await validation.build(req, 'universal.boolean'),
                //"perms.remove":await validation.build(req, 'universal.boolean')
            }
        }
    }
}