const auth = process.aioBeLibs('helpers/_private/auth');
const session = process.aioBeLibs('helpers/_private/session');
const iCounter = process.aioBeLibs('helpers/_private/index-counter')

module.exports = async (req, res, next) => {
    //const i = await iCounter.getNext(req, 'users');
    const ad = await session.details(req);

    if(ad && ad.login === 1){
        return await req.helpers.json.val(auth, 'constants.RESPONSES.ERRORS.USER_AUTHORISED_ALREADY')
    }else{
        const type = await auth.helpers.checks.login.loginByType(req);
        const otpmap = {
            'email-with-otp':true,
            'mobile-with-otp':true,
            'username-with-email-otp':true,
            'username-with-mobile-otp':true
        }

        if(otpmap[type]){
            return auth.module.login.sendOtpByType(type, req, res, next);
        }else{
            return auth.module.login.loginWithPassword(type, req, res, next)
        }
    }
}