const appControllers = process.aioAppControllers();

const getMap = async (req, res, next) => {
    const rval = [];
    const map = {
        0:req.helpers.json.val(req, 'params.appController'),
        1:req.helpers.json.val(req, 'params.controllerAction'),
        2:req.helpers.json.val(req, 'params.actionVersion'),
        3:req.helpers.json.val(req, 'params.versionJob'),
        4:req.helpers.json.val(req, 'params.jobMethod')
    }

    for(const a in map){
        if(map[a]){
            rval.push(map[a]);
        }
    }

    return rval.join('.')
}

const getModel = async (req, res, next, controller) => {

    const get = (name) => {
        return req.helpers.json.val(req, `mdb.models.${name.toLowerCase()}`)
    }

    let model = get(controller);

    if(!model){
        model = get(req.helpers.json.get(req, 'runtime.validationConfig.collection', req.helpers.random.key()))
    }

    return model;
}

const init = async (req, res, next) => {
        req.runtime = req.runtime || {};
        
    let rval = {
        data:{},
        valid:true,
        error:null,
        status:{
            code:200,
            message:"",
        }
    }

    let map = await getMap(req, res, next);
    let controllers = req.helpers.express.controllers;
    let action = req.helpers.json.val(appControllers, map);
        req.runtime.model = {
            config:await req.helpers.express.docs.json.get('model', req, res, next),
            instance:await getModel(req, res, next, req.helpers.json.get(req, 'params.appController')),
        }

    if(action && typeof action === 'function'){
        rval = await action(req, res, next);
    }else{
        const gAction = req.helpers.json.val(controllers.actions, map);
        if(gAction && typeof gAction === 'function'){
            rval = await gAction(req, res, next);
        }else{
            rval = await controllers.actions.global.start(req, res, next);
        }
    };

    return rval;
}

exports.init = init;