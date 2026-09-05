const valdate = require('./../validation');
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
                "type":await valdate.type(req),
                "linkFor":await valdate.linkFor(req),
                "linkType":await valdate.linkType(req),
                "mapId":await validation.build(req, 'universal.mongoId'),
                "mapping":await validation.build(req, 'universal.idmap.required')
            }
        }
    }
}