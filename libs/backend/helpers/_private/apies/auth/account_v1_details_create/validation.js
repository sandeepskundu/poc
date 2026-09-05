const validation = process.aioBeLibs('helpers/_private/utils/validations');

module.exports = async (req) => {
    return {
        "request":{
            "methods":{
                "post":await validation.build(req, 'request.methods.post')
            }
        },
        "validation":{
            "body":{
                "email.id":await validation.build(req, 'email.id'),
                "mobile.isd":await validation.build(req, 'mobile.isd'),
                "mobile.iso2":await validation.build(req, 'mobile.iso2'),
                "mobile.iso3":await validation.build(req, 'mobile.iso3'),
                "mobile.number":await validation.build(req, 'mobile.number')
            }
        }
    }
}