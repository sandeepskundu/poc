
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
                "band":await validate.bandOrGrade(req, 'band'),
                "grade":await validate.bandOrGrade(req, 'grades'),
                "code":await validation.build(req, 'universal.text.code'),
                "name":await validation.build(req, 'universal.text.title'),
                "departmentHash":await validation.build(req, 'universal.hashId'),
                "description":await validation.build(req, 'universal.text.description')
            }
        }
    }
}