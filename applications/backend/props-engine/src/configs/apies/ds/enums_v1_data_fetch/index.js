const validation = require('./validation');

const get = async (name, req) => {
    return {
        model:{},
        validation:await validation(req)
    }
}

exports.get = get;