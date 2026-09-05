const vhelpers = process.aioBeLibs('helpers/_private/utils/validations');

module.exports = async (req, res, next) => {
    return await req.helpers.mongoose.actions.initialize(req, res, next);
}