
const validate = require('./../validation');
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
                name:await validate.name(req, {}),
                mapId:await validate.mapId(req, {}),
                summary:await validate.summary(req, {}),
                displayName:await validate.displayName(req, {}),
                description:await validate.description(req, {}),
            }
        }
    }
}