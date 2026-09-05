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
                "put":await validation.build(req, 'request.methods.put')
            }
        },
        "validation":{
            "params":{
                id:await validation.build(req, 'universal.mongoId')
            },
            "body":{
                "code":await validation.build(req, 'universal.text.code', 'optional'),
                "actions.fetch":await validation.build(req, 'universal.boolean', action()),
                "actions.update":await validation.build(req, 'universal.boolean', action()),
                "actions.create":await validation.build(req, 'universal.boolean', action()),
                "actions.remove":await validation.build(req, 'universal.boolean', action()),
                "name":await validation.build(req, 'universal.text.title', 'optional'),
                "hasChilds":await validation.build(req, 'universal.boolean', 'optional'),
                "isAccessControlled":await validation.build(req, 'universal.boolean', 'optional'),
                "description":await validation.build(req, 'universal.text.description', 'optional')
            }
        }
    }
}