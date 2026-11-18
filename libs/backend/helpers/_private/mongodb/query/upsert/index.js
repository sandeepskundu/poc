const utils = require('./../utils');
const insertQ = require('./../insert');
const updateQ = require('./../update');

const isvalidList = (docs, req) => {
    return !(!req.helpers.data.type.is(docs, 'list') || docs.length === 0);
}

const updateBulk = async (saveDetails, updateList, node, collname, req, res, next) => {
    debugger;

    console.log(saveDetails, updateList, node, collname, req, res, next);
}

const updateAndInsertBoth = async (docs, node, collname, req, res, next) => {
    let insert = req.helpers.json.get(docs, 'insert', []);
    let update = req.helpers.json.get(docs, 'update', []);
    let model = utils.getModel(collname, req);

    if(!model){
        return req.helpers.express.response.getRespByCode(400, req, res, next, {data:[]});
    }

    if((!isvalidList(insert, req) && !isvalidList(update, req))){
        return req.helpers.express.response.getRespByCode(400, req, res, next, {data:[]});
    };

    let rval = req.helpers.express.response.getRespByCode(200, req, res, next, {})

    if(isvalidList(insert, req)){
        rval = await insertQ.bulkInsert(insert, collname, req, res, next);
    }

    if(rval.valid && isvalidList(update, req) && key){
        return await updateBulk(rval, update, node, collname, req, res, next)
    }else{
        rval.data = rval.data || [];

        for (let i of update) {
            rval.data.push(i);
        }
    }

    
    return rval;
}

exports.updateAndInsertBoth = updateAndInsertBoth;