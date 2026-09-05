const validation = process.aioBeLibs('helpers/_private/utils/validations');

module.exports = async (rval, req, type) => {
    let rv = req.helpers.json.merge(rval, {
        "appConfig.dbConfigs.dbId":await validation.build(req, 'universal.mongoId')
    });

    if(type === 'update'){

    }

    return rv;
}