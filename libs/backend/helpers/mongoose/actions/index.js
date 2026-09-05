const fin = require('./find');
const del = require('./delete');
const ins = require('./insert');
const upd = require('./update');

const map = {
    'fetch':'find',
    'update':'update',
    'create':'insert',
    'remove':'delete'
}

const actions = {
    find:fin,
    insert:ins,
    delete:del,
    update:upd
}

const r404 = async (req, res, next) => {
    return req.helpers.express.response.getRespByCode(404, req, res, next)
}

const action = async (req, res, next) => {
    const method = req.helpers.json.val(req, 'params.jobMethod');
    const name = req.helpers.json.val(map, method);

    if(name && actions[name] && actions[name].start){
        return actions[name].start
    }

    return false;
}

const start = async (model, req, res, next) => {
    const actn = await action(req, res, next);

    if(actn){
        return await actn(model, req, res, next);
    }else{
        return await r404(req, res, next)
    }
}

exports.types = actions;

exports.initialize = async (req, res, next) => {
    let controller = req.helpers.json.val(req, 'params.appController', 'abczxy');
        controller = controller.toLowerCase();

    let model = req.helpers.json.val(req, `mdb.models.${controller}`);

    if(model){
        return await start(model, req, res, next);
    }else{
        return await r404(req, res, next);
    }
}