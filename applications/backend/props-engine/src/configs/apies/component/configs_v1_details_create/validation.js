const validation = process.aioBeLibs('helpers/_private/utils/validations');

module.exports = async (req) => {
    return {
        "request":{
            "methods":{
                "post":await validation.build(req, 'request.methods.post')
            }
        },
        "validation":{
            "body":{
                "app.name":await validation.build(req, 'universal.require'),
                "component.path":await validation.build(req, 'universal.require'),
                "storybook.props":await validation.build(req, 'universal.require')
            }
        }
    }
}