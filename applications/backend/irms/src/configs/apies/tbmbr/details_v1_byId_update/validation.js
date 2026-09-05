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
                "id":await validation.build(req, 'universal.mongoId')
            },
            "body":{
                "linkwith":await validate.linkwith(req),
                "teamId":await validation.build(req, 'universal.mongoId'),
                "rolemap":await validation.build(req, 'universal.idmap.required')
            }
        }
    }
}