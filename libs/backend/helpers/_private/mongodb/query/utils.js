const treeAudit = process.aioBeLibs('helpers/_private/middlewares/omniTreeAudit');

const errorMap = async (docs, req, config) => {
    const entries = await Promise.all(docs.map(async (item) => {
        const id = req.helpers.json.get(item, 'doc._id');
        return { [id]: await req.helpers.mongoose.validate.error.extract(item.error, req, config) };
    }));

    let rval = {};

    for (const entry of entries) {
        rval = req.helpers.json.merge(rval, entry);
    }

    return rval;
};

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

const revertBackById = async (snapshots, model, req) => {
    const entries = Object.entries(snapshots);
    await Promise.all(
        entries.map(([id, snapshot]) => {
            const plain = typeof snapshot.toObject === 'function' ? snapshot.toObject() : snapshot;
            return model.replaceOne({ _id: id }, plain);
        })
    );
};

const updateby = async (req, res, next) => {
    let auth = req.helpers.session.auth.authDetails(req, res);

    return await req.helpers.json.val(auth, 'userId', req.helpers.json.val(auth, 'anonId'));
}

const getIds = async (list, req, res) => {
    let ids = [];

    for (let a of list) {
        if (a && typeof a === 'string') {
            ids.push(a);
        } else {
            if (req.helpers.data.type.is(a, 'object')) {
                let id = req.helpers.json.get(a, 'vd.id', req.helpers.json.get(a, '_id', ''));

                if (id) {
                    ids.push(String(id));
                }
            }
        }
    };

    return ids;
}

const deleteById = async (list, model, soft, req, res) => {
    if (list && list.length > 0) {
        let ids = await getIds(list, req, res);
        let li = await model.find({ _id: { $in: ids } });
        let set = {
            _deleted: 1,
            _deletedAt: new Date(),
            _updatedBy: await updateby(req, res)
        };

        if (soft) {
            await model.updateMany({ _id: { $in: ids } }, { $set: set });
        } else {
            return await model.deleteMany({ _id: { $in: ids } });
        }

        for (let a of li) {
            if (soft) {
                treeAudit.log.create.init(a._id, 'SOFT_DELETE', a, { ...a, ...set }, req, res);
            } else {
                treeAudit.log.create.init(a._id, 'DELETE', null, a, req, res);
            }
        }
    }
}

exports.getModel = getModel;
exports.errorMap = errorMap;
exports.deleteById = deleteById;
exports.getModelConfig = getModelConfig;
exports.revertBackById = revertBackById;