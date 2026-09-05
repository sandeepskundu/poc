const collections = require('./collections');

const create = async (config, req, res, next) => {
    return await collections.start(config, req, res, next);
}

exports.create = create;