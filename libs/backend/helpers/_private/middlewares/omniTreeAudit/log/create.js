const helpers = require('./../helpers');

const addRuntime = async (docs, model, req, res) => {
    let config = {};
    let rval = await req.helpers.mongoose.docHelpers.addRuntime(docs, config, model, req, res);
        rval = await req.helpers.mongoose.docHelpers.defaultValues.atInsert(rval, req, res);

    return rval;
}

const init = async (id, action, previous, current, req, res) => {
    let model = await helpers.getModel(req, res);

    if(typeof id === 'object'){
        id = id.toString();
    }

    if(model){
        let d = new model(await addRuntime({
            "nodeId":id,
            "action":action,
            "current":current,
            "previous":previous,
            "changedBy":'system',
        }, model, req, res), {});

        let v = d.validateSync();
        let errs = req.helpers.json.val(v, 'errors', {});
        let elen = req.helpers.json.length(errs);

        if(elen === 0){
            d.save()
        }
    };
}

exports.init = init;