const auth = process.aioBeLibs('helpers/_private/auth');
const session = process.aioBeLibs('helpers/_private/session');

module.exports = async (req, res, next) => {
    const ad = await session.details(req);

    if((ad && ad.login === 1) || 1 == 1){
        return await auth.module.insert.save.withouthOtp(req.helpers.json.val(req, 'body.data', {}), req, res, false, true);
    }else{
        //return await auth.module.insert.save.withouthOtp(req.helpers.json.val(req, 'body.data', {}), req, res, false, false);
        return await req.helpers.json.val(auth, 'constants.RESPONSES.ERRORS.ACCOUNT_NOT_AUTHORIZED')
    }
}