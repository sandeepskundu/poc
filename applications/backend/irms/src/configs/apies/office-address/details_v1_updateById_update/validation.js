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
                "city":await validation.build(req, 'address.city'),
                "line1":await validation.build(req, 'address.line1'),
                "line2":await validation.build(req, 'address.line2'),
                "country":await validation.build(req, 'country.iso3'),
                "mapId":await validation.build(req, 'universal.mongoId'),
                "pincode":await validation.build(req, 'address.pincode'),
                "state":await validation.build(req, 'address.states.all'),
                "landmark":await validation.build(req, 'address.landmark'),
                "name":await validation.build(req, 'universal.text.title')
            }
        }
    }
}