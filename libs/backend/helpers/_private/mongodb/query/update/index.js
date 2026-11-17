const getModel = async (collname, req, res) => {
    if (collname && typeof collname === 'string') {
        return req.helpers.json.val(req, `mdb.models.${collname.toLowerCase()}`) || req.helpers.json.get(req, 'runtime.model.instance')
    } else {
        return req.helpers.json.get(req, 'runtime.model.instance');
    }
}

const getModelConfig = async (req, res, next) => {
    const m = req.helpers.json.get(req, 'runtime.model.config', req.helpers.json.val(req, 'dbUtils.model'));

    return m || await req.helpers.express.docs.json.get('model', req, res, next);
}

const invalidList = async (list, node, collname, req, res, next) => {
    let data = list.map(u => {

        if (typeof u[node] === 'undefined') {
            u[node] = req.helpers.validation.helpers.mark.invalid({}, {}, '', 'This field is required')
        } else {
            u[node] = req.helpers.validation.helpers.mark.valid({ value: u[node] }, {}, '', '')
        }

        return u;
    });

    return req.helpers.express.response.getRespByCode(400, req, res, next, { data: data })
}

const missingDoc = async (list, docs, node, collname, req, res, next) => {
    let found = docs.map(doc => String(doc[node]));

    let data = list.map(u => {
        if (found.indexOf(String(u[node])) > -1) {
            u[node] = req.helpers.validation.helpers.mark.valid({ value: u[node] }, {}, '', '')
        } else {
            u[node] = req.helpers.validation.helpers.mark.invalid({value: u[node]}, {}, '', "We couldn't find a record matching that identifier. Please check your entry and try again.")
        }

        return u;
    });

    return req.helpers.express.response.getRespByCode(400, req, res, next, { data: data })
}

const deduplicate = async (list, node, collname, req, res, next) => {
    let ids = [];
    let docs = [];

    if (list && list.length > 0 && node) {
        list.map(u => {
            if (typeof u[node] != 'undefined') {
                let id = String(u[node]);
                if (ids.indexOf(id) === -1) {
                    ids.push(id);
                    docs.push(u);
                }
            };
        });
    }

    return {
        ids: ids,
        list: docs
    }
}

const errorMap = async (docs, req, res, config) => {
    let list = await Promise.allSettled(docs.map(async (item) => {
        let id = req.helpers.json.get(item, 'doc._id');
        return {
            [id]: await req.helpers.mongoose.validate.error.extract(item.error, req, config)
        }
    }));

    let rval = {};

    list.map((a) => {
        rval = req.helpers.json.merge(rval, a.value || {});
    })

    return rval;
}

const invalidDbUpdate = async (list, validDoc, invalidDoc, node, collname, config, req, res, next) => {
    let data = [];
    let errmap = await errorMap(invalidDoc, req, res, config);

    list.map((item) => {
        let id = req.helpers.json.get(item, '_id');
        id = String(id);

        if (errmap[id]) {
            for (let a in errmap[id]) {
                item = req.helpers.json.set(item, a, errmap[id][a])
            }
        }

        data.push(req.helpers.mongoose.docHelpers.transform.removePrivate(item, req, res, next));
    });

    return req.helpers.express.response.getRespByCode(400, req, res, next, { data: data })
}

const updatedTs = async (doc, model, collname, config, req, res, next) => {
    let auth = req.helpers.session.auth.authDetails(req, res);
        doc._updated = new Date();
        doc._updatedBy = await req.helpers.json.get(auth, 'userId', req.helpers.json.get(auth, 'anonId'));

    return doc;
}

const revertBackById = async (list, model, req, res, next) => {
    for(const a in list){
        await model.replaceOne({_id:a}, list[a]);
    };
}

const builkUpdate = async (docs, key, collname, req, res, next) => {
    debugger;
    let model = await getModel(collname, req);
    let config = await getModelConfig(req, res, next);

    if (docs && docs.length > 0 && key && model) {
        const rejected = [];
        const snapshots = {};
        const updatedIds = []; // Track which documents were successfully updated

        for (let doc of docs) {
            let id = doc._id.toString();
                doc = await updatedTs(doc, model, collname, config, req, res, next)

            try {
                // 1. Atomically update the document and capture its snapshot BEFORE the update
                const old = await model.findByIdAndUpdate(id, {
                        $set: doc
                    }, {
                        new:false,
                        runValidators:true 
                });

                // 2. ONLY push to success arrays if the document actually existed and was updated
                if (oldDoc) {
                    snapshots[id] = old;
                    updatedIds.push(id);
                } else {
                    // Handle the case where the ID was valid but no document was found in the DB
                    rejected.push({
                        doc:doc,
                        error:new Error(`Document with ID ${id} not found.`)
                    });
                }

            } catch (error) {
                rejected.push({
                    doc: doc,
                    error: error
                });
            }
        }

        if (rejected.length > 0) {
            let data = [];
            let error = await errorMap(rejected, req, res, config);

            await revertBackById(snapshots, model, req, res, next);

            for(const a in docs){
                let item = docs[a];
                let id = String(item._id);
                let runtime = await req.helpers.mongoose.docHelpers.addRuntime([item], config, model, req, res, next);
                    item = JSON.parse(JSON.stringify(runtime[0]));

                if(error[id]){
                    for(const b in error[id]){
                        item = req.helpers.json.set(item, b, error[id][b]);
                    }
                };

                data.push(item);
            }

            return req.helpers.express.response.getRespByCode(400, req, res, next, {data:data})
        }else{
            let data = [];

            for(let a in updatedIds){
                let id = updatedIds[a];
                let doc = await model.findById(id);

                if(doc){
                    let runtime = await req.helpers.mongoose.docHelpers.addRuntime([doc], config, model, req, res, next);
                        doc = JSON.parse(JSON.stringify(runtime[0]));
                }

                data.push(doc);
            }

            return req.helpers.express.response.getRespByCode(200, req, res, next, {
                data:data,
                snapshots:snapshots
            })
        }
    }
}

const byKeyName = async (docList, key, collname, req, res, next) => {
    let model = await getModel(collname, req);
    let config = await getModelConfig(req, res, next);

    if (docList && docList.length > 0 && key && model) {
        let node = key || '_id';
        let { ids, list } = await deduplicate(docList, node, collname, req, res, next);

        // Step- 1 : Return invalid list if any of doc in list has key no defined.
        if (list.length != ids.length) {
            return await invalidList(list, node, collname, req, res, next)
        }

        let docs = await model.find({ [node]: { $in: ids } })

        // Step- 2 : Return invalid list if doc not found for any of id from ids list.
        if (docs.length !== ids.length) {
            return await missingDoc(list, docs, node, collname, req, res, next);
        }

        // Step-3. Apply updates in-memory & validate ALL docs (doesn't stop on first error)
        let docmap = {};
        let results = await Promise.allSettled(docs.map(async (doc) => {
            let item = list.find(u => String(u[node]) === String(doc[node]));
            item = JSON.parse(JSON.stringify(item))
            docmap[String(doc._id)] = item;
            item = req.helpers.mongoose.docHelpers.runtime.parse(item, config, req, res, next);
            doc.set(item);

            try {
                await doc.validate();
                return {
                    doc: doc
                }
            } catch (error) {
                return {
                    doc: doc,
                    error: error
                }
            }
        }));

        // Step-4. Separate valid docs and failed docs
        const valid = [];
        const alldoc = [];
        const invalid = [];

        results.forEach((result, index) => {
            let doc = req.helpers.json.get(result, 'value.doc', false);
            let error = req.helpers.json.get(result, 'value.error', false);

            if (doc) {
                let id = String(doc._id);
                alldoc.push(docmap[id]);

                if (error) {
                    invalid.push({
                        error: error, // The Mongoose ValidationError
                        doc: docmap[id] // The in-memory updated doc that failed
                    });
                } else {
                    valid.push(doc);
                }
            }
        });

        // Step-5. If ANY document failed validation, reject and include ALL docs & errors
        if (invalid.length > 0) {
            return await invalidDbUpdate(alldoc, valid, invalid, node, collname, config, req, res, next)
        }

        // 5. All passed! Save all of them to DB
        return await builkUpdate(valid, node, collname, req, res, next);
    }
}

exports.byKeyName = byKeyName;
exports.revertBackById = revertBackById;

exports.byId = async (list, collname, req, res) => {
    return await byKeyName(list, '_id', collname, req, res);
}