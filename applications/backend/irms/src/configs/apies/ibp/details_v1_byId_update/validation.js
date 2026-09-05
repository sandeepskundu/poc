const valdate = require('./../validation');
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
                "type":await valdate.type(req),
                "itemId":await validation.build(req, 'universal.mongoId'),
                "userId":await validation.build(req, 'universal.mongoId')
            }
        }
    }
}