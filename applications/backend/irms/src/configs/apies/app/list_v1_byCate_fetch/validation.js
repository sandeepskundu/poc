const validation = process.aioBeLibs('helpers/_private/utils/validations');

const category = async (req) => {
    return await validation.build(req, 'universal.require', {
        "checks":{
            "regex":{
                "value":await req.helpers.enums.builder.async.init(req, [`appConfigs.applicationTypes`], {node:'id', regex:true})
            }
        }
    })
};

module.exports = async (req) => { 
    return {
        "request":{
            "methods":{
                "get":await validation.build(req, 'request.methods.get')
            }
        },
        "validation":{
            "params":{
                "id":await category(req)
            }
        }
    }
}