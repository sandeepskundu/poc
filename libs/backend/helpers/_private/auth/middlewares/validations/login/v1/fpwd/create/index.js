module.exports = async (validation, model, req, res, next) => {
    req.body.data = req.body.data || {};
    req.body.data.otpvia = req.body.data.otpvia || 'mobile'

    delete req.body.password;
    delete req.body.data.password;
    return await model.helpers.validations.mapping.byLoginType.get(validation, model, req, res, next);
}