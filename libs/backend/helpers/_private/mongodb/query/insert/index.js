const utils = require('./../utils');
const omniTreeAudit = process.aioBeLibs('helpers/_private/middlewares/omniTreeAudit');

const getModel = (collname, req) => {return utils.getModel(collname, req)};

const errorMap = async (docs, req, config) => {return await utils.errorMap(docs, req, config)};

const getModelConfig = async (req, res, next) => {return await utils.getModelConfig(req, res, next)};

const deleteSaved = async (saved, model, req, res, next) => {
    if(saved && saved.length > 0){
        return utils.deleteById(saved.map((arg) => {
            let id = req.helpers.json.get(arg, 'doc._id', '');
            if(id){
                return String(id)
            }
        }), model, false, req, res)
    }
}

const auditLogs = async (doc, req, res, next) => {
    if(doc && doc.length > 0){
        for(let a in doc){
            omniTreeAudit.log.create.init(doc[a]._id, false, null, doc[a], req, res)
        }
    }
}

const bulkInsert = async (docs, collname, req, skipAudit, res, next) => {
    const model = getModel(collname, req);
    const config = await getModelConfig(req, res, next);

    if (!req.helpers.data.type.is(docs, 'list') || docs.length === 0 || !model) {
        return req.helpers.express.response.getRespByCode(400, req, res, next, { data: [] });
    }

    let docl = [];
    let accepted = [];
    let invalids = [];

    for (let doc of docs) {
        let item = req.helpers.mongoose.docHelpers.runtime.parse(doc, config, req, res, next);
            item = await req.helpers.mongoose.docHelpers.defaultValues.atInsert(item, req, res);
            item = new model(item);

        let error = item.validateSync();
            item = await req.helpers.mongoose.docHelpers.addRuntime([item], config, model, req, res);
            item = item[0];
            docl.push(item);

        if (error) {
            invalids.push({
                doc:item,
                error:error
            });
        } else {
            accepted.push({
                doc:item
            })
        }
    };

    if (invalids.length > 0) {
        const error = await errorMap(invalids, req, config);
        const data = await Promise.all(docl.map(async (doc) => {
            let item = JSON.parse(JSON.stringify(doc))
            let id = req.helpers.json.get(item, '_id', '');

            if (error[id]) {
                for (const field of Object.keys(error[id])) {
                    item = req.helpers.json.set(item, field, error[id][field]);
                }
            };

            return item;
        }));

        //return req.helpers.express.response.getRespByCode(400, req, res, next, { data });
    }

    const saved = [];
    const rejected = [];

    for(const a in accepted){
        let item = req.helpers.json.get(accepted[a], 'doc', {});

        try {
            await item.save();
            saved.push({doc:item})
        }catch(err) {
            rejected.push({
                doc:item,
                error:err
            })
        }
    }

    if(rejected.length > 0){
        const error = await errorMap(rejected, req, config);
        const data = await Promise.all(accepted.map(async (arg) => {
            let item = JSON.parse(JSON.stringify(arg.doc))
            let id = req.helpers.json.get(item, 'vd.id', '');

            if (error[id]) {
                for (const field of Object.keys(error[id])) {
                    item = req.helpers.json.set(item, field, error[id][field]);
                }
            };

            return item;
        }));

        await deleteSaved(saved, model, req, res, next);
        return req.helpers.express.response.getRespByCode(400, req, res, next, { data });
    }

    if(saved.length > 0){
        const data = await Promise.all(saved.map(async (arg) => {return JSON.parse(JSON.stringify(arg.doc))}));

        if(!skipAudit){auditLogs(data, req, res, next)}

        return req.helpers.express.response.getRespByCode(200, req, res, next, {data:data});
    }

    return req.helpers.express.response.getRespByCode(200, req, res, next, {data:[]});
};

exports.bulkInsert = bulkInsert;