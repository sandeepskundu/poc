const model = require('./model');
const validation = require('./validation');

exports.get = async (name, req) => {
    return {
        model:await model(req),
        validation:await validation(req)
    }
}
