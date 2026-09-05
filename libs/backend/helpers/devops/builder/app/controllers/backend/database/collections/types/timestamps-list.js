const chelpers = require('./../helper');

const dconf = {
    "___type":"[Date]",
    
}

const start = async (rval, item, name, schemaData, appConfig, req, res, next) => {
    let conf = req.helpers.json.val(item, 'configs.mongodb', {});
        rval = chelpers.setNode(rval, {...dconf, ...conf}, name, item, req, res, next);

    return rval;
}

exports.start = start;