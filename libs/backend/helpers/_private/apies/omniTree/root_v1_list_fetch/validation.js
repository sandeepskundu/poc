const validate = require('./../validation');
const validation = process.aioBeLibs('helpers/_private/utils/validations');

module.exports = async (req, routeConf, globalConf) => {
    return {
        "request":{
            "methods":{
                "get":await validation.build(req, 'request.methods.get')
            }
        },
        "validation":{}
    }
}