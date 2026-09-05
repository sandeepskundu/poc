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
                "name":await validation.build(req, 'universal.text.title'),
                "roleHash":await validation.build(req, 'universal.hashId'),
                "presetHash":await validation.build(req, 'universal.hashId'),
                "description":await validation.build(req, 'universal.text.description'),
                "roleHashMap":await validation.build(req, 'universal.hashmap.required'),
            }
        }
    }
}