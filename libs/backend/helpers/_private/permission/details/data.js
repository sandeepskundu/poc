const compile = require('./compile');
const auth = process.aioBeLibs('helpers/_private/auth');
const mongodb = process.aioBeLibs('helpers/_private/mongodb');
const cache = process.aioBeLibs('helpers/_private/permission/cache');

const CACHE_ENABLED = false;

const qp = {
    response:{
        exclude:{
            enable:true,
            kies:{
                ts:true,
            }
        },
    },
    query:{
        otherConfigs:{
            doNotCheckQueryLength:true
        }
    }
}

const employement = async (mapId, req) => {
    let infos = await mongodb.query.find.refined('employmentInfo', {mapId:mapId}, qp, req, false, false);
    let details = req.helpers.json.val(infos, '0', {});
    let detailsLen = req.helpers.json.length(details);

    if(detailsLen > 0){
        return {
            bu:req.helpers.json.val(details, 'bu', ''),
            bv:req.helpers.json.val(details, 'bv', ''),
            employer:req.helpers.json.val(details, 'employer', ''),
            employedBy:req.helpers.json.val(details, 'employedBy', ''),
            department:req.helpers.json.val(details, 'department', ''),
            designation:req.helpers.json.val(details, 'designation', '')
        }
    }

    return {}
}

const store = async (req, arg, id) => {
    let rval = {access:await compile.refine(arg, req)};
        await cache.set(req, id, rval);

    return rval;
}

/*-- This function prepairs map of access kies based on merchant id, departments map and designation id and stores in hasmap prepired by all three --*/
const rolebase = async (req, ed, userId) => {
    let hash = await auth.module.fetch.rolebaseAccessHash(req, ed);

    let rv = await cache.get(req, hash);

    if(rv && CACHE_ENABLED){
        return rv;
    }else{
        let md = req.helpers.merchant.details(req);
        let bus = req.helpers.json.val(ed, 'bu', '');
        let bvs = req.helpers.json.val(ed, 'bv', '');
        let etype = (ed.employedBy != 'GROUP')?'emp':'grp';
        let dep = req.helpers.json.val(ed, 'department', '');
        let emplr = req.helpers.json.val(ed, 'employer', '');
        let des = req.helpers.json.val(ed, 'designation', '');

        let rv = await compile.init({}, req, md.id, 'grp', 'grp');

        if(ed.employedBy != 'GROUP' && emplr){
            rv = await compile.init(rv, req, emplr, 'emp', 'emp');
        }

        rv = await compile.init(rv, req, bus, etype, 'bsu');
        rv = await compile.init(rv, req, bvs, etype, 'bsv');
        rv = await compile.init(rv, req, dep, etype, 'dep');
        rv = await compile.init(rv, req, des, etype, 'des');

        return await store(req, rv, hash);
    }
}

const init = async (req, userId) => {
    let ed = await employement(userId, req);
    let rval = await rolebase(req, ed, userId);

    return rval;
}

exports.init = init;