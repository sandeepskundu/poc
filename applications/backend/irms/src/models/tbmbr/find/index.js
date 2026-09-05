const employee = process.aioAppModels('employee');
const mongodb = process.aioBeLibs('helpers/_private/mongodb');

const qp = {
    response:{
        exclude:{
            enable:true,
            kies:{
                ts:true,
                isac:true,
                mapId:true,
                hashId:true,
                active:true,
                codeHash:true,
                nameHash:true,
                parentId:true,
                hasChilds:true,
                description:true
            }
        },
    },
    query:{
        otherConfigs:{
            doNotCheckQueryLength:true
        }
    }
}

const getModel = async (req, res, next) => {
    return req.helpers.json.merge(await req.helpers.express.docs.json.get('model', req, res, next), qp)
}

const getItem = async (record, req, res, next) => {
    let tId = req.helpers.json.val(record, 'vd.team.itemId', '');
    let rel = req.helpers.json.val(record, 'vd.team.relation', '');

    if(rel && tId){
        return await mongodb.query.find.refined(rel, {_id:tId}, qp, req, res, next, true);
    }

    return {};
}

const parse = async (resp, req, res, next) => {
    const list = [];
    const results = req.helpers.json.val(resp, 'data.result', []);

    for(const a in results){
        let result = results[a].toJSON();
            result.vd = result.vd || {};
            result.vd.team = await mongodb.query.find.refined('tbi', {_id:result.teamId}, qp, req, res, next, true);
            result.vd.roles = await mongodb.query.find.getByMap('ar', result.rolemap.toString(), '_id', {}, qp, req, res, next, true);
            result.vd.item = await getItem(result, req, res, next);

            list.push(result);
    }

    if(list.length > 0){
        return await req.helpers.express.response.getRespByCode(200, req, res, next, {
            data:{
                result:list
            }
        });
    }else{
        return await req.helpers.express.response.noResult(req, res, next, {});
    }
}

const listByTeamId = async (id, req, res, next) => {
    return await parse(await mongodb.query.find.init('tbmbr', {teamId:id}, await getModel(req, res, next), req, res, next), req, res, next); 
}

const detailsById = async (id, req, res, next) => {
    return await parse(await mongodb.query.find.init('tbmbr', {_id:id}, await getModel(req, res, next), req, res, next), req, res, next);
}


exports.detailsById = detailsById;
exports.listByTeamId = listByTeamId;