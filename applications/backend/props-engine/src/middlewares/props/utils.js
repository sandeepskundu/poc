const configs = process.aioAppConfigs('storybook');

const getConfigByTypeAndMap = async (map, type, overwirte, config, req, res, next) => {
    let rval = {};
    let typ = (type || 'props');

    if(map){
        map = map.replace(/\/index$/, '');
        map = req.helpers.string.replace.word(map, '/', '.');
        rval = req.helpers.json.merge(rval, req.helpers.json.copy(req.helpers.json.get(configs, `${map}.${typ}`, {})));

        console.log(JSON.stringify(rval));

        if(overwirte){
            if(req.helpers.data.type.is(overwirte, 'object')){
                rval = req.helpers.json.merge(rval, overwirte);
            }
        }
    }

    return rval;
}

exports.getConfigByTypeAndMap = getConfigByTypeAndMap;