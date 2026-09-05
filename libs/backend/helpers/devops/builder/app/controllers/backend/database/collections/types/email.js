const chelpers = require('./../helper');

const dconf = {
    "lowercase":true,
    "___type":"String",
    "___set":(v) => {
        if(v){
            v = v.replace(/\\s/g, '')
        };
        return v;
    },
}

const start = async (rval, item, name, schemaData, appConfig, req, res, next) => {
    let conf = req.helpers.json.val(item, 'configs.mongodb', {});
        rval = chelpers.setNode(rval, {...dconf, ...conf}, name, item, req, res, next);

    return rval;
}

exports.start = start;