const props = process.aioAppMiddlewares('props');
const auth = process.aioBeLibs('helpers/_private/auth');
const session = process.aioBeLibs('helpers/_private/session');

module.exports = async (req, res, next) => {
    const ad = await session.details(req);

    if((ad && ad.login === 1) || (1 === 1)){
        let map = req.helpers.json.get(req, 'body.data.map');


        return await req.helpers.express.response.getRespByCode(200, req, res, next, {
            data:{
                props:await props.configs.getByMap(map, 'props', {}, req, res, next),
                storybook:await props.configs.getByMap(map, 'storybook', {}, req, res, next)
            }
        });
    }else{
        return await req.helpers.json.val(auth, 'constants.RESPONSES.ERRORS.ACCOUNT_NOT_AUTHORIZED')
    }
}