
const auth = process.aioBeLibs('helpers/_private/auth');
const session = process.aioBeLibs('helpers/_private/session');
const predefined = process.aioAppConfigs('storybook/predefined');

module.exports = async (req, res, next) => {
    const ad = await session.details(req);

    if((ad && ad.login === 1) || (1 === 1)){
        return await req.helpers.express.response.getRespByCode(200, req, res, next, {
            data:req.helpers.json.get(predefined, 'tree', {})
        });
    }else{
        return await req.helpers.json.val(auth, 'constants.RESPONSES.ERRORS.ACCOUNT_NOT_AUTHORIZED')
    }
}