const errorMap = async (docs, req, config) => {
    const entries = await Promise.all(docs.map(async (item) => {
        const id = req.helpers.json.get(item, 'doc._id');
        const extracted = await req.helpers.mongoose.validate.error.extract(item.error, req, config);
        return { [id]: extracted };
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
            return model.replaceOne({_id:id}, plain);
        })
    );
};

const deleteById = async (list, model, req) => {
    if(list && list.length > 0){
        return await model.deleteMany({_id:{$in:list}});
    }
}

exports.getModel = getModel;
exports.errorMap = errorMap;
exports.deleteById = deleteById;
exports.getModelConfig = getModelConfig;
exports.revertBackById = revertBackById;