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
                "parentId":await validation.build(req, 'universal.hashId'),
                "code":await validation.build(req, 'universal.text.code'),
                "name":await validation.build(req, 'universal.text.title'),
                "exposed":await validation.build(req, 'universal.exposed', 'optional'),
                "description":await validation.build(req, 'universal.text.description'),
                "details.value":await validation.build(req, 'universal.text.title', 'optional'),
                "details.label":await validation.build(req, 'universal.text.title', 'optional'),
                "isAccessControlled":await validation.build(req, 'universal.boolean', 'optional')
            }
        }
    }
}