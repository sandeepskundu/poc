
const validate = require('./../validation');
const validation = process.aioBeLibs('helpers/_private/utils/validations');

module.exports = async (req) => {
    return {
        "request":{
            "methods":{
                "put":await validation.build(req, 'request.methods.put')
            }
        },
        "validation":{
            "body":{
                mapId:await validate.mapId(req, {}),
                summary:await validate.summary(req, {
                    "checks":{
                        "required":{
                            "value":"optional"
                        }
                    }
                }),
                displayName:await validate.displayName(req, {
                    "checks":{
                        "required":{
                            "value":"optional"
                        }
                    }
                }),
                description:await validate.description(req, {
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