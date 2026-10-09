const utils = require('./../utils');

exports.getByMap = async (map, type, config, req, res, next) => {
    return await utils.getConfigByTypeAndMap(map, type, {}, config, req, res, next);
}