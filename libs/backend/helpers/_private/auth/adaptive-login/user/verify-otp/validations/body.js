const validation = process.aioBeLibs('helpers/_private/utils/validations');

module.exports = async (req) => {
    return {
        "token":await validation.build(req, 'universal.token'),
        "trackId":await validation.build(req, 'universal.mongoId')
    }
}