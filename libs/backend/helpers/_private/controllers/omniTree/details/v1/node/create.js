const auth = process.aioBeLibs('helpers/_private/auth');
const session = process.aioBeLibs('helpers/_private/session');
const mw = process.aioBeLibs('helpers/_private/middlewares/omniTree');

module.exports = async (req, res, next) => {
    const ad = await session.details(req);

    if ((ad && ad.login === 1) || (1 === 1)) {
        return await mw.node.create.init(req, res, next);
        //return await req.helpers.express.response.getRespByCode(200, req, res, next, {data: {}});
    } else {
        return await req.helpers.json.val(auth, 'constants.RESPONSES.ERRORS.ACCOUNT_NOT_AUTHORIZED')
    }
}