const helpers = require('./../helpers');

const addRuntime = async (docs, model, req, res) => {
    let config = {};
    let rval = await req.helpers.mongoose.docHelpers.addRuntime(docs, config, model, req, res);
        rval = await req.helpers.mongoose.docHelpers.defaultValues.atInsert(rval, req, res);

    return rval;
}

const init = async (id, actionName, previous, current, req, res) => {
    let action = await helpers.getAction(req, actionName, res);
    let enable = req.helpers.json.get(req, 'runtime.model.config.audit.enable', false);
    let apiDisabled = req.helpers.json.get(req, 'runtime.validationConfig.audit.disable', false);

    if(enable && !apiDisabled){
        let model = await helpers.getModel(req, res);

        if(typeof id === 'object'){
            id = id.toString();
        }

        if(model){
            let d = new model(await addRuntime({
                "nodeId":id,
                "current":current,
                "previous":previous,
                "changedBy":'system',
                "action":action || 'ANONYMOUS',
            }, model, req, res), {});

            let v = d.validateSync();
            let errs = req.helpers.json.val(v, 'errors', {});
            let elen = req.helpers.json.length(errs);

            if(elen === 0){
                d.save()
            }
        };
    }
}

exports.init = init;