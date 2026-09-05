const auth = process.aioBeLibs('helpers/_private/auth');
const session = process.aioBeLibs('helpers/_private/session');

module.exports = async (req, res, next) => {
    const ad = await session.details(req);

    if(ad && ad.login === 1){
        return await req.helpers.json.val(auth, 'constants.RESPONSES.ERRORS.USER_AUTHORISED_ALREADY')
    }else{
        return auth.module.login.password.forgot.init(await auth.helpers.checks.login.loginByType(req), req, res, next); 
    }
}