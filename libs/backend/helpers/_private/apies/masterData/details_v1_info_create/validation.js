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
                "code":await validation.build(req, 'universal.text.code'),
                "parentId":await validation.build(req, 'universal.hashId'),
                "name":await validation.build(req, 'universal.text.title'),
                "details.value":await validation.build(req, 'universal.text.title'),
                "details.label":await validation.build(req, 'universal.text.title'),
                "exposed":await validation.build(req, 'universal.exposed', 'optional'),
                "description":await validation.build(req, 'universal.text.description'),
                "hasChilds":await validation.build(req, 'universal.boolean', 'optional'),
                "isAccessControlled":await validation.build(req, 'universal.boolean', 'optional')
            }
        }
    }
}