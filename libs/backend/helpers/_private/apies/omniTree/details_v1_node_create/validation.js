const validate = require('./../validation');
const validation = process.aioBeLibs('helpers/_private/utils/validations');

module.exports = async (req, routeConf, globalConf) => {
    return {
        "request":{
            "body":await validation.build(req, 'request.body.object'),
            "methods":{
                "post":await validation.build(req, 'request.methods.post')
            }
        },
        "validation":{
            "body":await validate.compile.body({
                "key":await validate.key(req, {}),
                "name":await validate.name(req, {}),
                "value":await validate.value(req, {}),
                "mapId":await validate.mapId(req, {}),
                "details":await validate.details(req, {}),
                "summary":await validate.summary(req, {}),
                "description":await validate.description(req, {}),
            }, req, routeConf, globalConf)
        }
    }
}