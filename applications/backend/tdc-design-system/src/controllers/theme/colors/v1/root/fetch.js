const ah = process.aioAppHelpers();

module.exports = async (req, res, next) => {
    const type = req.helpers.json.val(req, 'params.id', '')
    const resp = req.helpers.json.val(ah, 'configs.theme.colors.root', {});

    debugger;

    //req.helpers.express.response.send('json', resp, 200, req, res, next);
    return req.helpers.express.response.getRespByCode(200, req, res, next, {data:resp});
}