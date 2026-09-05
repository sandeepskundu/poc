const ahelpers = process.aioBeLibs('helpers/_private/apies/helpers');

module.exports = async (rval, appConfig, req, res, next) => {
    return req.helpers.json.merge(rval, await ahelpers.compiler({}, {
        auth:'users'
    }, appConfig, req));
}