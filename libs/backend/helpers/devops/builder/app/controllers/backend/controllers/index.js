const validations = require('./validations');

const create = async (config, req, res, next) => {
    config = await validations.start(config, req, res, next);

    return config;
}

exports.create = create;