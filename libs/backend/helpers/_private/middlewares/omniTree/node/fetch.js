const mongodb = process.aioBeLibs('helpers/_private/mongodb');
const helpers = process.aioBeLibs('helpers/_private/helpers/omniTree');

const byId = async (req, res, next) => {
    let conf = req.helpers.json.get(req, 'runtime.model.config', {}); 
    return await mongodb.query.find.init(conf.name, {}, conf, req, res, next);
}

exports.byId = byId;