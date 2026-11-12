const catalog = require('./catalog');
const collection = require('./collection');

exports.get = async (rval, appConfig, req) => {
    rval = await catalog.get(rval, appConfig, req);
    rval = await collection.get(rval, appConfig, req);

    return rval;
}