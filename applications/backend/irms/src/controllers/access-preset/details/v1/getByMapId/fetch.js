const session = process.aioBeLibs('helpers/_private/session');
const mongodb = process.aioBeLibs('helpers/_private/mongodb');

const roleDetails = async (item, req, res, next) => {
    if(1 === 1){
        let roles = {};
        let qp = {
            response:{
                exclude:{
                    enable:true,
                    kies:{
                        ts:true,
                        codeHash:true,
                        typeHash:true,
                        nameHash:true
                    }
                },
            },
            query:{
                otherConfigs:{
                    doNotCheckQueryLength:true
                }
            }
        }
        
        let map = req.helpers.json.val(item, 'roleMapping');
            map = map.split('.');

        if(map && map.length > 0){
            for(const a in map){
                let presets = await mongodb.query.find.init('accessRole', {_id:map[a]}, qp, req, res, next);
                let results = req.helpers.json.val(presets, 'data.result.0', {});
                    roles[a] = results.toJSON();
            };
            item.roles = roles;
        }
    }

    return item;
}

module.exports = async (req, res, next) => {
    const ad = await session.details(req);

    if(ad && ad.login === 1){
        let list = [];
        let config = await req.helpers.express.docs.json.get('model', req, res, next);
        let presets = await mongodb.query.find.init('accessPreset', {}, config, req, res, next);
        let results = req.helpers.json.val(presets, 'data.result', []);

        for(const a in results){
            let map = results[a].toJSON();
                map = await roleDetails(map, req, res, next);
                list.push(map);
        }

        if(list.length > 0){
            let rval = await req.helpers.express.response.getRespByCode(200, req, res, next);
                rval.data = {
                    result:list
                }

            return rval;
        }else{
            return await req.helpers.express.response.noResult(req, res, next, {});
        }
    }else{
        return await req.helpers.json.val(auth, 'constants.RESPONSES.ERRORS.ACCOUNT_NOT_AUTHORIZED')
    }
}