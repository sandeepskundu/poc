const catalog = require('./catalog');
const collection = require('./collection');

exports.get = async (private, appConfig, req, res, next) => {
    return [
        await catalog.get(private, appConfig, req),
        await collection.get(private, appConfig, req)
    ]
}
