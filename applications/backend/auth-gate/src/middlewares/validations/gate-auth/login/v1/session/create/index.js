const auth = process.aioBeLibs('helpers/_private/auth')

module.exports = async (validation, req, res, next) => {
    return await auth.middlewares.validations.login.v1.session.create(validation, auth, req, res, next);
}