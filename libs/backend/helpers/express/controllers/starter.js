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

const init = async (req, res, next) => {
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