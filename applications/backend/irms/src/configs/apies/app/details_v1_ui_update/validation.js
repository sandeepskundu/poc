const valdate = require('./../validation');
const validation = process.aioBeLibs('helpers/_private/utils/validations');

const body = async (req) => {
    let rval = await valdate.appCommon({}, req, 'update');
        rval = await valdate.uiAppBody(rval, req, 'update');
    
    return rval;
}

module.exports = async (req) => { 
    return {
        "request":{
            "methods":{
                "put":await validation.build(req, 'request.methods.put')
            }
        },
        "validation":{
            "body":await body(req),
            "params":{
                "id":await validation.build(req, 'universal.mongoId')
            }
        }
    }
}