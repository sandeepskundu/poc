const list = async (docs, req, res, next) => {
    let rval = [];
    const config = req.helpers.json.get(req, 'runtime.model.config', {});
    const model = req.helpers.json.get(req, 'runtime.model.instance', false);
   
    if(docs && docs.length > 0){
        rval = (await Promise.all(docs.map(async (child) => {
            child = await req.helpers.mongoose.docHelpers.addRuntime(child, config, model, req, res);
            return model.hydrate(child).toJSON();
        })))
    }

    return rval;
}

exports.list = list;