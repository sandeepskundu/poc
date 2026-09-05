module.exports = async (validation, model, req, res, next) => {
    return await model.helpers.validations.mapping.byLoginType.get(validation, model, req, res, next);
}