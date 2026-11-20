const model = require('./model');
const validation = require('./validation');

const get = async (name, req, routeConf, globalConf) => {
    return {
        model:await model(req, routeConf, globalConf),
        validation:await validation(req, routeConf, globalConf)
    }
}

exports.get = get;