const valid = require('./../validation');
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
                "dob":await validation.build(req, 'date.adult'),
                "name.first":await validation.build(req, 'name.fn'),
                "name.title":await validation.build(req, 'name.titles.adults'),
                "name.last":await validation.build(req, 'name.ln',),
                "name.middle":await validation.build(req, 'name.mn', valid.optional()),
                "country":await validation.build(req, 'country.iso3'),
                "marital":await validation.build(req, 'marital.status.default'),
                "gender":await validation.build(req, 'gender.types.default'),
            }
        }
    }
}