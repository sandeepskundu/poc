
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