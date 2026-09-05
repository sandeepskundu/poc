const employee = process.aioAppModels('employee');
const mongodb = process.aioBeLibs('helpers/_private/mongodb');

const qp = {
    query:{
        otherConfigs:{
            doNotCheckQueryLength:true
        }
    }
}

const getModel = async (req, res, next) => {
    return req.helpers.json.merge(await req.helpers.express.docs.json.get('model', req, res, next), qp)
}

const parse = async (resp, req, res, next) => {
    const list = [];
    const results = req.helpers.json.val(resp, 'data.result', []);

    for(const a in results){
        let result = results[a].toJSON();
            result.ud = await employee.find.getMultipleTypeDetailsById({cd:true, pI:true}, result.userId, req, res, next, true);
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
    return await parse(await mongodb.query.find.init('tbu', {teamId:id}, await getModel(req, res, next), req, res, next), req, res, next); 
}

const detailsById = async (id, req, res, next) => {
    return await parse(await mongodb.query.find.init('tbu', {_id:id}, await getModel(req, res, next), req, res, next), req, res, next);
}


exports.detailsById = detailsById;
exports.listByTeamId = listByTeamId;