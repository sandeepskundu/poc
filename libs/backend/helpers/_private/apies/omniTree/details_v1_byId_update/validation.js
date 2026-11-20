const validate = require('./../validation');
const validation = process.aioBeLibs('helpers/_private/utils/validations');

const optional = async (req, routeConf, globalConf) => {
    return {
        "checks":{
            "required":{
                "value":"optional"
            }
        }
    }
}

module.exports = async (req, routeConf, globalConf) => {
    return {
        "request":{
            "body":await validation.build(req, 'request.body.object'),
            "methods":{
                "put":await validation.build(req, 'request.methods.put')
            }
        },
        "validation":{
            "params":{
                "id":await validation.build(req, 'universal.mongoId')
            },
            "body":await validate.compile.body({
                "key":await validate.key(req, await optional(req, routeConf, globalConf)),
                "name":await validate.name(req, await optional(req, routeConf, globalConf)),
                "value":await validate.value(req, await optional(req, routeConf, globalConf)),
                "mapId":await validate.mapId(req, await optional(req, routeConf, globalConf)),
                "details":await validate.details(req, await optional(req, routeConf, globalConf)),
                "summary":await validate.summary(req, await optional(req, routeConf, globalConf)),
                "description":await validate.description(req, await optional(req, routeConf, globalConf)),
            }, req, routeConf, globalConf)
        }
    }
}