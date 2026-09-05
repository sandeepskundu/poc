const valdate = require('./../validation');
const validation = process.aioBeLibs('helpers/_private/utils/validations');

const body = async (req) => {
    let rval = await valdate.appCommon({}, req);
        rval = await valdate.uiAppBody(rval, req);
    
    return rval;
}

module.exports = async (req) => { 
    return {
        "request":{
            "methods":{
                "post":await validation.build(req, 'request.methods.post')
            }
        },
        "validation":{
            "body":await body(req)
        }
    }
}