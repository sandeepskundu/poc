const mongodb = process.aioBeLibs('helpers/_private/mongodb');
const helpers = process.aioBeLibs('helpers/_private/helpers/omniTree');

const isIdValid = async (model, id, deleted, req, res, next) => {
    if(id){
        let qp = {_id:id};

        if(typeof deleted != undefined){
            qp._deleted = deleted;
        }

        return await model.findOne(qp);
    }

    return false;
}

const isMapIdValid = async (model, mapId, deleted, req, res, next) => {
    if(mapId){
        let qp = {_id:mapId}

        if(typeof deleted != undefined){
            qp._deleted = deleted;
        }

        return await model.findOne(qp);
    }else{
        return true;
    }
}

const init = async (req, res, next) => {
    let id = req.helpers.json.get(req, 'params.id', '');
    let mapId = req.helpers.json.get(req, 'body.data.mapId', '');
    let mconfig = req.helpers.json.get(req, 'runtime.model.config', {});
    let model = req.helpers.json.get(req, 'runtime.model.instance', false);

    if(id === mapId){
        return req.helpers.express.response.getRespByCode(400, req, res, next, {
            error: {
                description:"Id and mapId can have same value to move the selected item."
            }
        });
    }

    if(id){
        let doc = await isIdValid(model, id, 0, req, res, next);

        if(doc){
            let mapDoc = await isMapIdValid(model, mapId, 0, req, res, next);

            if(!mapDoc){
                return req.helpers.express.response.getRespByCode(400, req, res, next, {
                    error: {
                        description:"Invalid Map ID. Please check the ID and try again."
                    },
                });
            }

            try{
                let rv = await model.findByIdAndUpdate(id, {$set:req.helpers.json.merge({
                    mapId:(mapId?String(mapId):null)
                }, req.helpers.mongoose.docHelpers.runtime.parse(doc, mconfig, req, res, next))}, {
                    new:true,
                    runValidators:true
                });

                rv = await req.helpers.mongoose.docHelpers.addRuntime(rv, mconfig, model, req, res);

                return req.helpers.express.response.getRespByCode(200, req, res, next, {
                    data:JSON.parse(JSON.stringify(rv))
                });
            }catch (err){
                let emap = await mongodb.query.utils.errorMap([{doc:doc, error:err}], req, mconfig)

                return req.helpers.express.response.getRespByCode(400, req, res, next, {
                    data:req.helpers.json.merge(JSON.parse(JSON.stringify(doc)), req.helpers.json.get(emap, id, {}))
                });
            }
        }else{
            return req.helpers.express.response.getRespByCode(400, req, res, next, {
                error: {
                    description:"Invalid id. Please check the ID and try again."
                },
            });
        }
    }

    return req.helpers.express.response.getRespByCode(400, req, res, next, {});
}

exports.init = init;