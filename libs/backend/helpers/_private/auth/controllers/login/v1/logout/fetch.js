const auth = process.aioBeLibs('helpers/_private/auth');
const session = process.aioBeLibs('helpers/_private/session');

module.exports = async (req, res, next) => {
    let ad = await session.authInfo(req)

    if(ad && ad.login === 0){
        let resp = await req.helpers.json.val(auth, 'constants.RESPONSES.ERRORS.ACCOUNT_ALREADY_LOGGED_OUT');
            resp = await req.helpers.json.merge(resp, {data:await session.authInfo(req)});
        return resp;
    }else{
         await session.logout(req, res);
    let resp = await req.helpers.json.val(auth, 'constants.RESPONSES.SUCESS.ACCOUNT_LOGOUT_SUCCESSFULLY');
        resp = await req.helpers.json.merge(resp, {data:await session.authInfo(req)});
        return await req.helpers.express.response.getRespByCode(200, req, res, next, resp);
    }
}