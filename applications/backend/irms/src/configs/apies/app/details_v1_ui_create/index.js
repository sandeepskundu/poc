const model = require('./model');
const validation = require('./validation');

const get = async (req) => {
    return {
        model:await model(req),
        validation:await validation(req)
    }
}

exports.get = get;