const { map } = require('../../../../../frontend/helpers/json');
const utils = require('./consts');
const mongodb = process.aioBeLibs('helpers/_private/mongodb');

const teamDetailsByTypeAndId = async (id, type, req, res, next) => {
    return req.helpers.json.val(await mongodb.query.find.refined('tbi', {_id:id, active:true, type:(type || 'user')}, utils.qp, req, res, next), '0.access', '');
}

const teamsByItemId = async (id, req, res, next) => {
    return await mongodb.query.find.refined('tbi', {itemId:id, active:true}, utils.qp, req, res, next);
}

const teamsByItemHash = async (id, req, res, next) => {
    return await mongodb.query.find.refined('tbi', {itemHash:id, active:true}, utils.qp, req, res, next);
}

const roleCodeById = async (id, req, res, next) => {
    return req.helpers.json.val(await mongodb.query.find.refined('ar', {_id:id}, utils.qp, req, res, next, true), 'code', '')
}

const getRoleMapByMap = async (map, req, res, next) => {
    let rv = [];

    if(map && map.length >= 24){
        let ml = map.split('.');

        if(ml.length > 0){
            for(let a in ml){
                let d = await roleCodeById(ml[a], req, res, next);
    
                if(d){
                    rv.push(d);
                }else{
                    rv = [];
                    break;
                }
            }
        }
    }

    if(rv.length > 0){
        return rv.join('.')
    }

    return '';
}

const rolesMapByTeamId = async (id, req, res, next) => {
    let rv = {};
    let md = req.helpers.merchant.details(req);
    let mdId = req.helpers.json.val(md, 'id', '');
    let rmap = await mongodb.query.find.refined('tbmbr', {teamId:id}, utils.qp, req, res, next);

    for(let a in rmap){
        let mval = [];
        let item = rmap[a];
        let lw = item.linkwith || '';
        let map = req.helpers.json.val(item, 'rolemap', '');
        let rd = await getRoleMapByMap(map, req, res, next);

        if(rd){
            if(lw){
                mval.push(lw);
            }

            mval.push(rd);
        }

        if(mval.length > 0){
            mval = mval.join('.');
            mval = req.helpers.access.map.encode(mval.toUpperCase(), mdId);
        }

        rv[mval] = 1;
    }

    return rv;
}


const accessMapByIdAndLinkWith = async (rval, id, req, res, next) => {
    let rv = {};
    const md = req.helpers.merchant.details(req);
    const mdId = req.helpers.json.val(md, 'id', '');
    const rmap = await mongodb.query.find.refined('rba', {mapId:id}, utils.qp, req, res, next);

    for(let a in rmap){
        let r = {};
        let mval = [];
        let item = rmap[a];
        let type = item.type || '';
        let lw = item.linkFor || '';
        let rd = await getRoleMapByMap(req.helpers.json.val(item, 'mapping', ''), req, res, next);

        if(rd){
            if(lw){
                mval.push(lw);
            }

            mval.push(rd);
        }

        if(mval.length > 0){
            mval = mval.join('.');
            mval = req.helpers.access.map.encode(mval.toUpperCase(), mdId);

            if(type){
                r[type] = r[type] || {};
                r[type][mval] = 1;
            }

            rv = req.helpers.json.merge(rv, r);
        }
    }

    return req.helpers.json.merge(rval, rv);
};

exports.teamsByItemId = teamsByItemId;
exports.teamsByItemHash = teamsByItemHash;
exports.rolesMapByTeamId = rolesMapByTeamId;
exports.teamDetailsByTypeAndId = teamDetailsByTypeAndId;
exports.accessMapByIdAndLinkWith = accessMapByIdAndLinkWith;