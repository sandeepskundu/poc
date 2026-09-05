const model = require('./model');
const validation = require('./validation');

const get = async (name, req) => {
    return {
        model:model,
        validation:await validation(req)
    }
}

exports.get = get;