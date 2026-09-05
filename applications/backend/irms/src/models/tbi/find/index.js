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

const getItemDetails = async (collname, id, req, res, next) => {
    return await mongodb.query.find.refined(collname, {_id:id}, qp, req, res, next, true);
}

const parse = async (resp, req, res, next) => {
    const list = [];
    const results = req.helpers.json.val(resp, 'data.result', []);

    for(const a in results){
        let result = results[a].toJSON();
            //result.item = await getItemDetails(result.relation, result.itemId, req, res, next);
            //result.name = `Team ${result.access} - ${req.helpers.json.val(result.item, 'name', req.helpers.json.val(result.item, 'label', ''))}`
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

const listByItemId = async (id, req, res, next) => {
    return await parse(await mongodb.query.find.init('tbi', {itemId:id}, await getModel(req, res, next), req, res, next), req, res, next); 
}

const detailsById = async (id, req, res, next) => {
    return await parse(await mongodb.query.find.init('ibp', {_id:id}, await getModel(req, res, next), req, res, next), req, res, next);
}


exports.detailsById = detailsById;
exports.listByItemId = listByItemId;