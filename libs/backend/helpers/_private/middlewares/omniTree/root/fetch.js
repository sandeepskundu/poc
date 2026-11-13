const mongodb = process.aioBeLibs('helpers/_private/mongodb');
const helpers = process.aioBeLibs('helpers/_private/helpers/omniTree');

const init = async (req, res, next) => {
    let mapId = req.helpers.json.get(req, 'params.id', '');
    let conf = req.helpers.json.get(req, 'runtime.model.config', {});

    return await mongodb.query.find.init(conf.name, {
        mapId:null
    }, conf, req, res, next);
}

exports.init = init;