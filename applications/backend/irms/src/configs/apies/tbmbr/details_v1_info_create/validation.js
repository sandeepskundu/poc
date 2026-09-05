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
                "linkwith":await validate.linkwith(req),
                "itemId":await validation.build(req, 'universal.mongoId'),
                "teamId":await validation.build(req, 'universal.mongoId'),
                "rolemap":await validation.build(req, 'universal.idmap.required')
            }
        }
    }
}