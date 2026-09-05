const validation = require('./validations');

const getName = (name, item, req, res, next) => {
    const prv = req.helpers.json.val(item, 'configs.aioconfig.private');

    if(prv){
        return `_${name}`;
    }else{
        return name;
    }
}

const setNode = (rval, config, name, item, req, res, next) => {
    let cl = req.helpers.json.length(config || {});
        name = getName(name, item, req, res, next);

        config = validation.start(rval, config, name, item, req, res, next);

        if(name && cl && cl > 0){
            rval = req.helpers.json.set(rval, `nodes.${name}`, config);
        }

    return rval;
}

exports.setNode = setNode;
exports.getName = getName;