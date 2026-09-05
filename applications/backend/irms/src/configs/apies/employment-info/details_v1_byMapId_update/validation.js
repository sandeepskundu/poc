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
                "id":await validation.build(req, 'universal.mongoId')
            },
            "body":{
                "type":await valid.types(req),
                "status":await valid.status(req),
                "workMode":await valid.workMode(req),
                "employedBy":await valid.employedBy(req),
                "mapId":await validation.build(req, 'universal.mongoId'),
                "manager":await validation.build(req, 'universal.mongoId'),
                "employer":await validation.build(req, 'universal.mongoId'),
                "designation":await validation.build(req, 'universal.mongoId'),
                "department":await validation.build(req, 'universal.idmap.required'),
                "bu":await validation.build(req, 'universal.mongoId'),
                "bv":await validation.build(req, 'universal.idmap.required'),
                "location":await validation.build(req, 'universal.mongoId'),
            }
        }
    }
}