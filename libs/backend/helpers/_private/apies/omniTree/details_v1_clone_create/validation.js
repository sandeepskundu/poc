const validate = require('./../validation');
const validation = process.aioBeLibs('helpers/_private/utils/validations');

const required = async (req, routeConf, globalConf) => {
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
                "post":await validation.build(req, 'request.methods.post')
            }
        },
        "validation":{
            "params":{
                id:await validation.build(req, 'universal.mongoId')
            },
            "body":await validate.compile.body({
                "key":await validate.key(req, await required(req, routeConf, globalConf)),
                "name":await validate.name(req, await required(req, routeConf, globalConf)),
                "mapId":await validate.mapId(req, await required(req, routeConf, globalConf)),
            }, req, routeConf, globalConf)
        }
    }
}