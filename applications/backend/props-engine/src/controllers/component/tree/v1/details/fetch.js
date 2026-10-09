const auth = process.aioBeLibs('helpers/_private/auth');
const component = process.aioAppMiddlewares('components');
const session = process.aioBeLibs('helpers/_private/session');

module.exports = async (req, res, next) => {
    const ad = await session.details(req);

    if((ad && ad.login === 1) || (1 === 1)){
        return await req.helpers.express.response.getRespByCode(200, req, res, next, {
            data:await component.tree.details(req, res, next)
        });
    }else{
        return await req.helpers.json.val(auth, 'constants.RESPONSES.ERRORS.ACCOUNT_NOT_AUTHORIZED')
    }
}