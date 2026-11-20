const validate = require('./../validation');
const validation = process.aioBeLibs('helpers/_private/utils/validations');

module.exports = async (req, routeConf, globalConf) => {
    return {
        "request":{
            "methods":{
                "delete":await validation.build(req, 'request.methods.delete')
            }
        },
        "validation":{
            "params":{
                //id:await validation.build(req, 'universal.mongoId')
            },
            "body":{
                "signature.id":await validation.build(req, 'signature.id'),
                "signature.token":await validation.build(req, 'signature.token')
            }
        }
    }
}