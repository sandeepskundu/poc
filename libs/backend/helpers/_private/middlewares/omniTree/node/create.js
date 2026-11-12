const helpers = process.aioBeLibs('helpers/_private/helpers/omniTree');

const init = async (req, res, next) => {
    let mapId = req.helpers.json.get(req, 'body.data.mapId', '');
    let model = req.helpers.json.get(req, 'runtime.model.instance', false)
    let rval = {
        valid:true
    }

    if(mapId){
        rval = await helpers.chain.getParents(req, res, mapId, 'write', {checkPermission:true});
    }

    if(rval.valid){
        return await req.helpers.mongoose.actions.types.insert.start(model, req, res, next);
    }else{
        return rval;
    }
}

exports.init = init;