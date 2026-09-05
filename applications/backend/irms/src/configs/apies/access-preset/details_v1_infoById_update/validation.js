
const validate = require('./../validation');
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
                "type":await validate.type(req),
                "actions.fetch":await validate.action(req),
                "actions.update":await validate.action(req),
                "actions.create":await validate.action(req),
                "actions.remove":await validate.action(req),
                "mapId":await validation.build(req, 'universal.mongoId'),
                "name":await validation.build(req, 'universal.text.title'),
                "description":await validation.build(req, 'universal.text.description'),
                "roleMapping":await validation.build(req, 'universal.idmap.required')
            }
        }
    }
}