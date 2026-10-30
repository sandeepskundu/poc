const configs = process.aioAppConfigs('storybook');

const getConfigByTypeAndMap = async (map, type, overwrite, config, req, res, next) => {
    let rval = {};
    let typ = (type || 'props');

    if(map){
        map = map.replace(/\/index$/, '');
        map = req.helpers.string.replace.word(map, '/', '.');
        rval = req.helpers.json.merge(rval, req.helpers.json.copy(req.helpers.json.get(configs, `${map}.${typ}`, {})));

        if(overwrite && req.helpers.data.type.is(overwrite, 'object')){
            rval = req.helpers.json.merge(rval, overwrite);
        }
    }

    return rval;
}

exports.getConfigByTypeAndMap = getConfigByTypeAndMap;