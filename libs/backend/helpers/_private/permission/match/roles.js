const utils = require('./consts');
const query = require('./query');
const response = require('./../validator/response');
const user = process.aioBeLibs('helpers/_private/permission/user');

const isBlocked = async (iaccess, uaccess, req, res, next) => {
    let ublock = req.helpers.json.val(uaccess, 'blocked', {});
    let iblock = req.helpers.json.val(iaccess, 'blocked', {});
    let block = req.helpers.json.hasAnyCommonKey(iblock, ublock);
    let dt = {
        data:{
            access:'blocked'
        }
    }

    if(block){
        return req.helpers.json.merge(await response.invalid(req, 'PERMISSON_ACCESS_BLOCKED'), dt)
    }else{
        return req.helpers.json.merge(await response.valid(req, 'default'), dt);
    }
}

const check = async (iaccess, uaccess, type, req, res, next, get, sort) => {
    let order = req.helpers.json.val(utils, `checkOrders.${sort}.${type}`, []);

    if(order && order.length > 0){
        for(let a in order){
            let t = order[a];
            let uacs = req.helpers.json.val(uaccess, t, {});
            let iacs = req.helpers.json.val(iaccess, t, {});
            let enable = req.helpers.json.hasAnyCommonKey(iacs, uacs);

            if(enable){
                if(get){
                    return t;
                }else{
                    return req.helpers.json.merge(await response.valid(req, 'default'), {
                        data:{
                            access:t
                        }
                    });
                }
            }
        }
    };

    if(get){
        return null;
    }else{
        return req.helpers.json.merge(await response.invalid(req, 'PERMISSION_NOT_GRANTED'), {
            data:{
                access:null
            }
        });
    }
}

const validate = async (config, req, res, next, get, sort) => {
    let uaccess = await user.access.getBySession(req, res, next);
    let method = req.helpers.json.val(req, 'params.jobMethod', '');
    let blocked = await isBlocked(config, uaccess, req, res, next);

    if(blocked.valid){
        switch (method) {
            case 'fetch':
                return await check(config, uaccess, 'fetch', req, res, next, get, sort);
            break;
            case 'update':
                return await check(config, uaccess, 'update', req, res, next, get, sort);
            break;
            case 'create':
                return await check(config, uaccess, 'create', req, res, next, get, sort)
            break;
            case 'remove':
                return await check(config, uaccess, 'remove', req, res, next, get, sort)
            break;
        }
    }else{
        if(get){
            return req.helpers.json.val(blocked, 'data.access', 'blocked')
        }else{
            return blocked;
        }
    }
}

const access = async (id, req, res, next) => {
    let rv = {};
    let td = null;

    if(id.length === 24){
        td = await query.teamsByItemId(id, req, res, next);
    }

    if(id.length === 32){
        td = await query.teamsByItemHash(id, req, res, next);
    }

    let len = req.helpers.json.length(td || {});

    if(len > 0){
        for(let a in td){
            let item = td[a];
            let id = req.helpers.json.val(item, 'vd.id', '');
            let b = req.helpers.json.val(item, 'access', '');

            if(b){
                rv[b] = await query.rolesMapByTeamId(id, req, res, next);
            }
        }
    }

    return rv;
} 

const byId = async (id, req, res, next, get, sort, getUserAccess) => {
    let acces = await access(id, req, res, next);

    if(getUserAccess){
        return acces;
    }

    return await validate(acces, req, res, next, get, sort)
}

const byHashId = async (id, req, res, next, sort, getUserAccess) => {
    return await byId(id, req, res, next, get, sort, getUserAccess);
}

const start = async (id, req, res, next, get, sort, getUserAccess) => {
    if(id){
        if(id.length === 24){
            return await byId(id, req, res, next, get, sort, getUserAccess);
        }
 
        if(id.length === 32){
            return await byHashId(id, req, res, next, get, sort, getUserAccess)
        }
    }

    if(getUserAccess){
        return {};
    }

    return await response.valid(req, 'default');
}

const asc = async (id, req, res, next, get, getUserAccess) => {
    return await start(id, req, res, next, get, 'asc', getUserAccess)
}

const desc = async (id, req, res, next, get, getUserAccess) => {
    return await start(id, req, res, next, get, 'desc', getUserAccess)
}
 
const init = async (id, req, res, next, get, sort, getUserAccess) => {
    if(sort === 'desc'){
        return await desc(id, req, res, next, get, getUserAccess);
    }else{
        return await asc(id, req, res, next, get, getUserAccess);
    }
}

exports.asc = asc;
exports.desc = desc;
exports.init = init;