const catalog = require('./catalog');

exports.get = async (rval, appConfig, req) => {
    return await catalog.get(rval, appConfig, req);
}