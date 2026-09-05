const update = require('./../update');

const start = async (model, req, res, next) => {
    return await update.start(model, req, res, next, true);
}

exports.start = start;