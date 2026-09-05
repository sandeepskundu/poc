const validation = process.aioBeLibs('helpers/_private/utils/validations');

module.exports = async (req) => {
    return {
        "request":{
            "methods":{
                "get":await validation.build(req, 'methods.get')
            },
        }
    }
}