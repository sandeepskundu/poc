const cache = require('./cache');
const auth = process.aioBeLibs('helpers/_private/auth');
const query = process.aioBeLibs('helpers/_private/permission/match/query');
const roles = process.aioBeLibs('helpers/_private/permission/match/roles');

const CACHE_ENABLED = false;

const getRoles = async (rval, map, req, res, next) => {
    let rv = rval || {};
    let rmap = map || '';
        rmap = rmap.split('.');
    
    if(rmap && rmap.length > 0){
        for(let a in rmap){
            let r = await roles.init(rmap[a], req, res, next, false, false, true);
                rv = req.helpers.json.merge(rv, (r || {}))
        }
    }

    return (rv || {});
}

const rolemap = async (rval, id, req, res, next) => {
    return await query.accessMapByIdAndLinkWith(rval, id, req, res, next);   
}

const parse = async (id, req, res, next) => {
    const md = req.helpers.merchant.details(req);
    const ed = await auth.module.fetch.getEmployement(req, id);
    const hash = await auth.module.fetch.rolebaseAccessHash(req, ed);

    const bu = req.helpers.json.val(ed, 'bu', '');
    const bv = req.helpers.json.val(ed, 'bv', '');
    const emp = req.helpers.json.val(ed, 'employer', '');
    const dep = req.helpers.json.val(ed, 'department', '');
    const des = req.helpers.json.val(ed, 'designation', '');

    let rol = await rolemap({}, md.id, req, res, next);
        rol = await getRoles(rol, md.id, req, res, next);

        debugger;

    if(md.id != emp){
        rol = await rolemap(rol, emp, req, res, next);
        rol = await getRoles(rol, emp, req, res, next);
    }

    rol = await rolemap(rol, bu, req, res, next);
    rol = await getRoles(rol, bu, req, res, next);

    rol = await rolemap(rol, bv, req, res, next);
    rol = await getRoles(rol, bv, req, res, next);

    rol = await rolemap(rol, dep, req, res, next);
    rol = await getRoles(rol, dep, req, res, next);

    rol = await rolemap(rol, des, req, res, next);
    rol = await getRoles(rol, des, req, res, next);
          await cache.set(req, hash, rol);

    return rol;
}

const getById = async (id, req, res, next) => {
    let sd = req.helpers.session.auth.authDetails(req, res);
    let hash = req.helpers.json.val(sd, 'uIds.rolebaseAccessHash', '');

    if(hash && CACHE_ENABLED){
        let rv = await cache.get(req, hash);

        if(rv){
            return rv;
        }else{
            return await parse(id, req, res, next);
        }
    }else{
        return await parse(id, req, res, next);
    };
}

const getSessionAccess = async (req, res, next) => {
    let ud = await req.helpers.session.auth.authDetails(req, res);

    return getById(ud.userId || '', req, res, next);
}

const getBySession = async (req, res, next) => {
    req.runtime = req.runtime || {};
    req.runtime.auth = req.runtime.auth || {};

    if(!req.runtime.auth.access){
        req.runtime.auth.access = await getSessionAccess(req, res, next);
    };

    return req.runtime.auth.access;
}

exports.getById = getById;
exports.getBySession = getBySession;