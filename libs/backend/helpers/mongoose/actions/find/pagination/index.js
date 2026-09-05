const meta = require('./meta');
const optHeplers = require('./options');
const validation = require('./validation');
const controllers = process.aioAppControllers();

const controllerMap = async (config, model, req, res) => {
    const rval = [];
    const appController = req.helpers.json.val(req, 'params.appController');
    const controllerAction = req.helpers.json.val(req, 'params.controllerAction');
    const actionVersion = req.helpers.json.val(req, 'params.actionVersion');
    const versionJob = req.helpers.json.val(req, 'params.versionJob');
    const jobMethod = req.helpers.json.val(req, 'params.jobMethod');

    if(appController){
        rval.push(appController)
    }

    if(controllerAction){
        rval.push(controllerAction)
    }

    if(actionVersion){
        rval.push(actionVersion)
    }

    if(versionJob){
        rval.push(versionJob)
    }

    if(jobMethod){
        rval.push(jobMethod)
    }

    return rval;
}


const getCallback = async (config, model, req, res, next, type) => {
    let ohelpers = {...optHeplers};
    let cmap = await controllerMap(config, model, req, res);
    let pagi = await req.helpers.json.val(config, 'pagination');
    let method = req.helpers.json.val(req, 'params.jobMethod');
    let controls = {...controllers};

    for(const a in cmap){
        let item = cmap[a];
        let oph = req.helpers.json.val(controls, `${item}.${method}.pagination.${type}`, {});
            controls = req.helpers.json.val(controls, `${item}.childs`, {});
            ohelpers = {...ohelpers, ...oph};
    }

    return ohelpers.get;
}


const options = async (config, model, req, res, next) => {
    let option = await getCallback(config, model, req, res, next, 'options');
    return option(config, model, req, res, next);
}

const getMeta = async (data, config, model, req, res, next) => {
    let callback = await getCallback(config, model, req, res, next, 'meta');
    return await callback(config, model, req, res, next);
}

const addRuntime = async (docs, config, model, req, res, next) => {
    let rval = [];
    for(const a in docs){
        let item = await req.helpers.mongoose.docHelpers.addRuntime(docs[a], config, model, req, res, next);
            rval.push(item);
    }
    
    return rval;
}

const start = async (config, model, req, res, next) => {
    let option = await options(config, model, req, res, next);
    let valid = await validation.start(config, model, option, req, res, next);
    
    if(valid.valid){
        let qpObj = await req.helpers.mongoose.query.build(config, model, {}, {}, req, res, next);
        if(qpObj.valid){
            let data = await model.paginate(qpObj.data, option);
            // let meta = await getMeta(data, config, model, req, res, next);
            let docs = req.helpers.json.val(data, 'docs', []);
                docs = await req.helpers.mongoose.docHelpers.addRuntime(docs, config, model, req, res, next);

            if(docs && docs.length > 0){
                return {
                    valid:true,
                    data:{
                        pagination:await meta.get(data, config, model, req, res, next),
                        result:await addRuntime(docs, config, model, req, res, next),
                    }
                };
            }else{
                return await req.helpers.express.response.getRespByCode(404, req, res, next, {
                    error:{
                        code:'RESULT_NOT_FOUND',
                        description:'Results not found'
                    } 
                });
            }
        }
    }else{
        return valid;
    }
}

exports.meta = meta;
exports.start = start;
exports.options = optHeplers;
exports.validation = validation;