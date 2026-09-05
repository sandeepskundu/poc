const props = process.aioAppMiddlewares('props');
const auth = process.aioBeLibs('helpers/_private/auth');
const session = process.aioBeLibs('helpers/_private/session');

module.exports = async (req, res, next) => {
    const ad = await session.details(req);

    if((ad && ad.login === 1) || (1 === 1)){
        return await req.helpers.express.response.getRespByCode(200, req, res, next, {
            data:{
                props:{
                    default:await props.details.getByMap(req.helpers.json.get(req, 'body.data.map'), {detailed:false}, req, res, next),
                    detailed:await props.details.getByMap(req.helpers.json.get(req, 'body.data.map'), {detailed:true}, req, res, next),
                },
                storybook:{
                    details:await props.story.getByMap(req.helpers.json.get(req, 'body.data.map'), {detailed:false}, req, res, next),
                    propTypes:await props.type.getByMap(req.helpers.json.get(req, 'body.data.map'), {detailed:false}, req, res, next),
                }
            }
        });
    }else{
        return await req.helpers.json.val(auth, 'constants.RESPONSES.ERRORS.ACCOUNT_NOT_AUTHORIZED')
    }
}