const utils = process.aioBeLibs('helpers/_private/utils');

const name = async (req, res) => {
    return req.helpers.json.val(req, 'appConfig.appConfig.authConfigs.collection.name');
}

const get = async (req, res) => {
    return req.helpers.json.val(req, `mdb.models.${(await name(req, res)).toLowerCase()}`);
}

exports.get = get;
exports.name = name;