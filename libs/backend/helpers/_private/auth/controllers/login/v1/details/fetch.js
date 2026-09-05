const session = process.aioBeLibs('helpers/_private/session');

module.exports = async (req, res, next) => {
    return await req.helpers.express.response.getRespByCode(200, req, res, next, {data:await session.authInfo(req)});
}