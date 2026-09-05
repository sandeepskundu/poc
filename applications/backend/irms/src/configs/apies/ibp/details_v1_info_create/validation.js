const valdate = require('./../validation');
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
                "type":await valdate.type(req),
                "itemId":await validation.build(req, 'universal.mongoId'),
                "userId":await validation.build(req, 'universal.mongoId')
            }
        }
    }
}