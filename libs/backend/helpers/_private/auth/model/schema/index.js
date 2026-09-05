const constants = require('./../../constants')

const defaultSchemaByType = async (type, req, res) => {
    const common = req.helpers.json.val(constants, 'SCHEMA.COMMON', {});
    const bytype = req.helpers.json.val(constants, `SCHEMA.${type}`, {});

    return req.helpers.json.merge(common, bytype);
}

exports.defaultSchemaByType = defaultSchemaByType;