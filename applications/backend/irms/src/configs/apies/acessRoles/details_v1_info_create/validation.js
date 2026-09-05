const validation = process.aioBeLibs('helpers/_private/utils/validations');

const action = () => {
    return {
        "checks":{
            "required":{
                "value":"required",
            }
        }
    }
}

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
                "name":await validation.build(req, 'universal.text.title'),
                "parentId":await validation.build(req, 'universal.hashId'),
                "actions.fetch":await validation.build(req, 'universal.boolean', action()),
                "actions.update":await validation.build(req, 'universal.boolean', action()),
                "actions.create":await validation.build(req, 'universal.boolean', action()),
                "actions.remove":await validation.build(req, 'universal.boolean', action()),
                "description":await validation.build(req, 'universal.text.description'),
                "isAccessControlled":await validation.build(req, 'universal.boolean', 'optional')
            }
        }
    }
}