const valid = require('./../validation');
const validation = process.aioBeLibs('helpers/_private/utils/validations');

module.exports = async (req) => {
    return {
        "request":{
            "methods":{
                "get":await validation.build(req, 'request.methods.get')
            }
        },
        "validation":{
            "params":{
                id:await valid.types(req)
            }
        }
    }
}