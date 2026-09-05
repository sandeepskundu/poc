const roles = require('./roles');
const query = require('./query');
const utils = require('./consts');
const response = require('./../validator/response');
const mongodb = process.aioBeLibs('helpers/_private/mongodb');

const qp = utils.qp;
const pmatrix = utils.pmatrix;

const detailsByUser = async (id, req, res, next) => {
    let td = null;
    let ad = req.helpers.session.auth.authDetails(req, res);
    let uId = req.helpers.json.val(ad, 'userId');

    if(uId){
        if(id.length === 24){
            td = await mongodb.query.find.refined('tbu', {itemId:id, userId:uId}, qp, req, res, next, true);
        }

        if(id.length === 32){
            td = await mongodb.query.find.refined('tbu', {itemHash:id, userId:uId}, qp, req, res, next, true);
        }
    }

    if(td && td.teamId){
        return await query.teamDetailsByTypeAndId(td.teamId, 'user', req, res, next)
    }else{
        return null
    }
}

const validate = async (type, req, res, next) => {
    let method = req.helpers.json.val(req, 'params.jobMethod', '');
    let ma = pmatrix[method] || [];
        type = 'blockeds';

    if(ma.indexOf(type) != -1){
        return req.helpers.json.merge(await response.valid(req, 'default'), {
            data:{
                access:type
            }
        })
    }else{
        if(type === 'blocked'){
            return req.helpers.json.merge(await response.invalid(req, 'PERMISSON_ACCESS_BLOCKED'), {
                data:{
                    access:type
                }
            })
        }else{
            return await response.invalid(req, 'default');
        }
    }
}

const byId = async (id, req, res, next, get) => {
    let type = await detailsByUser(id, req, res, next);

    if(get){
        return type;
    }else{
        return await validate(type, req, res, next)
    }
}

const byHashId = async (id, req, res, next) => {
    return await byId(id, req, res, next, get);
}

const byItemId = async (id, req, res, next, get) => {
    if(id){
        if(id.length === 24){
            return await byId(id, req, res, next, get);
        }

        if(id.length === 32){
            return await byHashId(id, req, res, next, get)
        }
    }

    return await response.invalid(req, 'default')
}

const validOrReturn = async (arg, req, res, next) => {
    let a = req.helpers.json.val(arg, 'data.access', '');

    if(a === 'blocked'){
        return false;
    }else{
        return true;
    }
}

const start = async (id, req, res, next, get) => {
    let rv = await byItemId(id, req, res, next, get);

    if(rv.valid){
        return rv;
    }else{
        let vor = await validOrReturn(rv, req, res, next);

        if(vor){
            return await roles.init(id, req, res, next, get, 'asc');
        }else{
            return rv;
        }
    }
}

exports.start = start;