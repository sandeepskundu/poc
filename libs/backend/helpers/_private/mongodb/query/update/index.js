const getModel = (collname, req) => {
    if (collname && typeof collname === 'string') {
        return (req.helpers.json.val(req, `mdb.models.${collname.toLowerCase()}`) || req.helpers.json.get(req, 'runtime.model.instance'));
    }
    return req.helpers.json.get(req, 'runtime.model.instance');
};

const getModelConfig = async (req, res, next) => {
    const m = req.helpers.json.get(req, 'runtime.model.config', req.helpers.json.val(req, 'dbUtils.model'));

    return m || (await req.helpers.express.docs.json.get('model', req, res, next));
};

const invalidList = (list, node, req, res, next) => {
    const data = list.map((u) => {
        return {...u, [node]:(u[node] === undefined || u[node] === null)?req.helpers.validation.helpers.mark.invalid({}, {}, '', 'This field is required'):req.helpers.validation.helpers.mark.valid({ value: u[node] }, {}, '', '')};
    });

    return req.helpers.express.response.getRespByCode(400, req, res, next, { data });
};

const missingDoc = (list, docs, node, req, res, next) => {
    const found = new Set(docs.map((doc) => String(doc[node])));

    const data = list.map((u) => ({...u,
        [node]:found.has(String(u[node]))?req.helpers.validation.helpers.mark.valid({value:u[node]}, {}, '', ''):req.helpers.validation.helpers.mark.invalid({value: u[node]}, {},'', "We couldn't find a record matching that identifier. Please check your entry and try again.")
    }));

    return req.helpers.express.response.getRespByCode(400, req, res, next, { data });
};

const deduplicate = (list, node) => {
    const seen = new Set();
    const ids = [];
    const docs = [];
    let hasMissing = false;

    if (Array.isArray(list) && list.length > 0 && node) {
        for (const u of list) {
            if (u[node] === undefined || u[node] === null) {
                hasMissing = true;
                continue;
            }
            const id = String(u[node]);
            if (!seen.has(id)) {
                seen.add(id);
                ids.push(id);
                docs.push(u);
            }
        }
    }

    return { ids, list: docs, hasMissing };
};

const errorMap = async (docs, req, config) => {
    const entries = await Promise.all(
        docs.map(async (item) => {
            const id = req.helpers.json.get(item, 'doc._id');
            const extracted = await req.helpers.mongoose.validate.error.extract(
                item.error,
                req,
                config
            );
            return { [id]: extracted };
        })
    );

    let rval = {};
    for (const entry of entries) {
        rval = req.helpers.json.merge(rval, entry);
    }

    return rval;
};

const invalidDbUpdate = async (list, invalidDoc, config, req, res, next) => {
    const errmap = await errorMap(invalidDoc, req, config);

    const data = list.map((item) => {
        const id = String(req.helpers.json.get(item, '_id'));
        let updatedItem = item;

        if (errmap[id]) {
            for (const field of Object.keys(errmap[id])) {
                updatedItem = req.helpers.json.set(updatedItem, field, errmap[id][field]);
            }
        }

        return req.helpers.mongoose.docHelpers.transform.removePrivate(updatedItem, req, res, next);
    });

    return req.helpers.express.response.getRespByCode(400, req, res, next, { data });
};

const updatedTs = (doc, req, res) => {
    const auth = req.helpers.session.auth.authDetails(req, res);
    doc._updated = new Date();
    doc._updatedBy = req.helpers.json.get(auth, 'userId', req.helpers.json.get(auth, 'anonId'));
    return doc;
};

const revertBackById = async (snapshots, model) => {
    const entries = Object.entries(snapshots);
    await Promise.all(
        entries.map(([id, snapshot]) => {
            const plain = typeof snapshot.toObject === 'function' ? snapshot.toObject() : snapshot;
            return model.replaceOne({ _id: id }, plain);
        })
    );
};

const bulkUpdate = async (docs, key, collname, req, res, next) => {
    const model = getModel(collname, req);
    const config = await getModelConfig(req, res, next);

    if (!req.helpers.data.type.is(docs, 'list') || docs.length === 0 || !key || !model) {
        return req.helpers.express.response.getRespByCode(400, req, res, next, {data:[]});
    }

    const rejected = [];
    const snapshots = {};
    const updatedIds = [];

    for (let doc of docs) {
        const id = doc._id.toString();
        doc = updatedTs(doc, req, res);

        // Convert Mongoose document to a plain object and strip immutable/version fields
        const updatePayload = typeof doc.toObject === 'function' ? doc.toObject({ depopulate: true }) : { ...doc };
        delete updatePayload._id;
        delete updatePayload.__v;

        try {
            const old = await model.findByIdAndUpdate(
                id,
                { $set: updatePayload },
                { new: false, runValidators: true }
            );

            if (old) {
                snapshots[id] = old.toObject();
                updatedIds.push(id);
            } else {
                rejected.push({
                    doc,
                    error: new Error(`Document with ID ${id} not found.`)
                });
            }
        } catch (error) {
            rejected.push({ doc, error });
        }
    }

    if (rejected.length > 0) {
        const error = await errorMap(rejected, req, config);
        await revertBackById(snapshots, model);

        const data = await Promise.all(
            docs.map(async (item) => {
                const id = String(item._id);
                const runtime = await req.helpers.mongoose.docHelpers.addRuntime([item], config, model, req, res, next);
                let result = runtime[0].toJSON ? runtime[0].toJSON() : { ...runtime[0] };
                    result = JSON.parse(JSON.stringify(result));

                if (error[id]) {
                    for (const field of Object.keys(error[id])) {
                        result = req.helpers.json.set(result, field, error[id][field]);
                    }
                }

                return result;
            })
        );

        return req.helpers.express.response.getRespByCode(400, req, res, next, { data });
    }

    debugger;

    console.log(updatedIds);

    // Batch-fetch all updated documents in a single query and preserve update order
    const updatedDocs = await model.find({ _id: { $in: updatedIds } });
    const docsById = new Map(updatedDocs.map((d) => [String(d._id), d]));

    const data = await Promise.all(
        updatedIds.map(async (id) => {
            const doc = docsById.get(id);

            if (!doc) {
                return null;
            }

            const runtime = await req.helpers.mongoose.docHelpers.addRuntime([doc], config, model, req, res, next);
            return runtime[0].toObject ? runtime[0].toObject() : { ...runtime[0] };
        })
    );

    return req.helpers.express.response.getRespByCode(200, req, res, next, {
        data,
        snapshots
    });
};

const byKeyName = async (docList, key, collname, req, res, next) => {
    const model = getModel(collname, req);
    const config = await getModelConfig(req, res, next);

    if (!Array.isArray(docList) || docList.length === 0 || !key || !model) {
        return req.helpers.express.response.getRespByCode(400, req, res, next, { data: [] });
    }

    const node = key;
    const { ids, list, hasMissing } = deduplicate(docList, node);

    // Step 1: Return invalid list if any item in docList is missing the key field
    if (hasMissing) {
        return invalidList(docList, node, req, res, next);
    }

    const docs = await model.find({ [node]: { $in: ids } });

    // Step 2: Return invalid list if any requested record was not found
    if (docs.length !== ids.length) {
        return missingDoc(list, docs, node, req, res, next);
    }

    // Step 3: Apply updates in-memory & validate all docs (O(1) lookup via Map)
    const inputByKey = new Map(list.map((u) => [String(u[node]), u]));
    const docmap = {};

    const results = await Promise.all(
        docs.map(async (doc) => {
            const rawItem = inputByKey.get(String(doc[node]));
            const clonedItem = structuredClone(rawItem);
            docmap[String(doc._id)] = clonedItem;

            const parsed = req.helpers.mongoose.docHelpers.runtime.parse(clonedItem, config, req, res, next);
            doc.set(parsed);

            try {
                await doc.validate();
                return { doc };
            } catch (error) {
                return { doc, error };
            }
        })
    );

    // Step 4: Separate valid and failed docs
    const valid = [];
    const alldoc = [];
    const invalid = [];

    for (const { doc, error } of results) {
        const id = String(doc._id);
        alldoc.push(docmap[id]);

        if (error) {
            invalid.push({ error, doc: docmap[id] });
        } else {
            valid.push(doc);
        }
    }

    // Step 5: If any document failed validation, reject and return all docs & errors
    if (invalid.length > 0) {
        return invalidDbUpdate(alldoc, invalid, config, req, res, next);
    }

    // Step 6: Persist all validated documents
    return bulkUpdate(valid, node, collname, req, res, next);
};

exports.byKeyName = byKeyName;
exports.revertBackById = revertBackById;
exports.byId = (list, collname, req, res, next) => byKeyName(list, '_id', collname, req, res, next);