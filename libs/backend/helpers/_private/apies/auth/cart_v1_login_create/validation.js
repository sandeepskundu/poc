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
                //"cart.contacts.mobile.isd":await validation.build(req, 'mobile.isd'),
                //"cart.contacts.mobile.iso2":await validation.build(req, 'mobile.iso2'),
                //"cart.contacts.mobile.iso3":await validation.build(req, 'mobile.iso3'),
                //"cart.contacts.mobile.number":await validation.build(req, 'mobile.number'),
            }
        }
    }
}