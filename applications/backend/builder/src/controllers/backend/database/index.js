const collections = require('./collections');

const create = async (config, req, res, next) => {

    config = await collections.start(config, req, res, next);

    return config;
}

exports.create = create;