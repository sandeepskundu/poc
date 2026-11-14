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
                "mapId":await validate.mapId(req, {}),
                "root.key":await validate.key(req, {}),
                "root.name":await validate.name(req, {}),
                "data":await validation.build(req, 'universal.object', {
                    "checks":{
                        "object": {
                            "value": "required"
                        },
                        "required":{
                            "value":"required"
                        }
                    }
                }),
                "___.key":await validate.key(req, {}),
                "___.name":await validate.name(req, {}),
                "___.value":await validate.value(req, {}),
                "___.mapId":await validate.mapId(req, {}),
                "___.details":await validate.details(req, {}),
                "___.summary":await validate.summary(req, {}),
                "___.description":await validate.description(req, {}),
            }, req, routeConf, globalConf)
        }
    }
}