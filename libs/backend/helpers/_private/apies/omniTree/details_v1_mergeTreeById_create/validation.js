const validate = require('./../validation');
const validation = process.aioBeLibs('helpers/_private/utils/validations');

const required = async (req, routeConf, globalConf) => {
    return {
        "checks":{
            "required":{
                "value":"required"
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
            "body":await validate.compile.body({
                "sourceId":await validate.mapId(req, await required(req, routeConf, globalConf)),
                "targetId":await validate.mapId(req, await required(req, routeConf, globalConf)),
            }, req, routeConf, globalConf)
        }
    }
}