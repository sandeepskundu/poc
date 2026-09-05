const valdate = require('./../validation');
const validation = process.aioBeLibs('helpers/_private/utils/validations');

module.exports = async (req) => {
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
            "body":{
                "linkFor":await valdate.linkFor(req),
                "mapId":await validation.build(req, 'universal.mongoId'),
                "code":await validation.build(req, 'universal.text.code'),
                "name":await validation.build(req, 'universal.text.title'),
                "description":await validation.build(req, 'universal.text.description'),
                "hasChilds":await validation.build(req, 'universal.boolean', {
                    "checks":{
                        "required":{
                            "value":"optional"
                        }
                    }
                })
            }
        }
    }
}