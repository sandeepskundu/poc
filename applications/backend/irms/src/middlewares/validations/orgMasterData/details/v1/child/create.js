const vhelpers = process.aioBeLibs('helpers/_private/utils/validations');

module.exports = async (validation, req, res, next) => {
    return req.helpers.json.merge(validation, {
        validation:{
            body:{
                isAccessControlled:await vhelpers.build(req, 'universal.boolean')
            }
        }
    });
}