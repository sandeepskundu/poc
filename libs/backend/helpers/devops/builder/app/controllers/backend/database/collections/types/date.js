const chelpers = require('./../helper');

const dconf = {
    '___type':"Date"
}

const start = async (rval, item, name, schemaData, appConfig, req, res, next) => {
    let conf = req.helpers.json.val(item, 'configs.mongodb', {});
        return chelpers.setNode(rval, {...dconf, ...conf}, name, item, req, res, next);
}

exports.start = start;