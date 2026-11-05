const catalog = require('./catalog');

exports.get = async (private, appConfig, req, res, next) => {
    return [
        await catalog.get(private, appConfig, req)
    ]
}
