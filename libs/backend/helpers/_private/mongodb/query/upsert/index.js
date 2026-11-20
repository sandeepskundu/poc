const utils = require('./../utils');
const insertQ = require('./../insert');
const updateQ = require('./../update');
const treeAudit = process.aioBeLibs('helpers/_private/middlewares/omniTreeAudit');

const isvalidList = (docs, req) => {
    return !(!req.helpers.data.type.is(docs, 'list') || docs.length === 0);
}

const treeAuditLogs = async (docs, action, req, res, next) => {
    if(docs && docs.length > 0){
        for(let doc of docs){
            treeAudit.log.create.init(doc._id, action, null, doc, req, res)
        }
    }
}

const updateBulk = async (saved, updates, node, model, collname, req, res, next) => {
    let slist = (saved?.data ? saved.data : []);
    let rval = await updateQ.byKeyName(updates, node, collname, req, true, req);
    let li = req.helpers.json.get(rval, 'data', []);
    let snapshots = req.helpers.json.get(rval, 'snapshots', {});
        li = (li && req.helpers.data.type.is(li)) ? li : [];

        debugger;
        delete rval.snapshots;
        rval.data = [...slist, ...li];

        if (rval.valid && saved.valid) {
            await treeAuditLogs(slist, 'MERGE_CREATE', model, collname, req, res, next);
            await treeAuditLogs(li, 'MERGE_UPDATE', model, collname, req, res, next, snapshots);
            return rval;
        }

    let ids = [];

    slist.map((doc) => {
        let id = req.helpers.json.get(doc, 'vd.id', '');

        if (id) {
            ids.push(id);
        }
    });

    if (ids.length > 0) {
        await utils.deleteById(ids, model, req);
    }

    return req.helpers.express.response.getRespByCode(400, req, res, next, { data: rval.data });;
}

const updateAndInsertBoth = async (docs, node, collname, req, res, next) => {
    let insert = req.helpers.json.get(docs, 'insert', []);
    let update = req.helpers.json.get(docs, 'update', []);
    let model = utils.getModel(collname, req);

    if (!model) {
        return req.helpers.express.response.getRespByCode(400, req, res, next, { data: [] });
    }

    if ((!isvalidList(insert, req) && !isvalidList(update, req))) {
        return req.helpers.express.response.getRespByCode(400, req, res, next, { data: [] });
    };

    let rval = req.helpers.express.response.getRespByCode(200, req, res, next, {})

    if (isvalidList(insert, req)) {
        rval = await insertQ.bulkInsert(insert, collname, req, true, res, next);
    }

    if (rval.valid && isvalidList(update, req) && node) {
        return await updateBulk(rval, update, node, model, collname, req, res, next)
    } else {
        rval.data = rval.data || [];

        if(rval.valid){
            await treeAuditLogs([...rval.data], 'insert', model, collname, req, res, next)
        }

        for (let i of update) {
            rval.data.push(i);
        }
    }


    return rval;
}

exports.updateAndInsertBoth = updateAndInsertBoth;