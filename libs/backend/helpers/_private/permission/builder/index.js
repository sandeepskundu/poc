const hash = process.aioBeLibs('helpers/_private/permission/hash');
const cache = process.aioBeLibs('helpers/_private/permission/cache');
const details = process.aioBeLibs('helpers/_private/permission/details');
const aregex = /\bACTIONS\.(fetch|update|create|delete)$/;

const isvalid = async = (key) => {
    return (aregex.test(key));
}

/*-- This function remove all data other then true value. --*/
const refine = async (arg, req, userId) => {
    let dval = req.helpers.random.id(40);
    let data = req.helpers.json.copy(arg);
    let kies = req.helpers.json.allkeys(data);

    for(let a in kies){
        let val = req.helpers.json.val(data, a, dval);

        if(val !== true){
            let isobj = req.helpers.data.type.is(val);

            if(isobj){
                let len = req.helpers.json.length(val);
                if(len === 0){
                    req.helpers.json.remove(data, a)
                }
            }else{
                req.helpers.json.remove(data, a)
            }
        }else{
            let valid = isvalid(a)

            if(!valid){
                req.helpers.json.remove(data, a);
            }
        }
    };

    return data;
}

const gacess = async (arg, req, userId) => {
    return {
        GLOBAL:await refine(req.helpers.json.val(arg, 'GLOBAL', {}), req, userId)
    }
}

const daccess = async (rval, arg, req, userId) => {
    return await refine(req.helpers.json.merge(rval, req.helpers.json.val(arg, 'DEPARTMENT_BASE_ACCESS', {})), req, userId)
}

const raccess = async (rval, arg, req, userId) => {
    return await refine(req.helpers.json.merge(rval, req.helpers.json.val(arg, 'ROLE_BASE_ACCESS', {})), req, userId)
}

const aaccess = async (rval, arg, req, userId) => {
    return await refine(req.helpers.json.merge(rval, req.helpers.json.val(arg, 'ASSIGNED_ACCESS', {})), req, userId)
}

const taccess = async (rval, arg, req, userId) => {
    return await refine(req.helpers.json.merge(rval, req.helpers.json.val(arg, 'TEAM_BASE_ACCESS', {})), req, userId)
}

const build = async (arg, req, userId) => {
    let rval = {};
    let kies = req.helpers.json.allkeys(arg || {});
    let hashKey = await hash.key.getByUserId(req, userId);

    for(let a in kies){
        let valid = isvalid(a);
        if(valid && kies[a] === true){
            let m = a.replace(aregex, '');
            let b = req.helpers.string.replace.word(a, (`${m}ACTIONS.`), '');
                rval = await hash.map.set(rval, `${m}${b}`, hashKey, req);
        }
    }

    return {
        access:rval
    };
}

exports.init = async (req, userId) => {
    let access = await details.getFromDb(req, userId);
        access = await refine(access, req, userId);
    let rval = await gacess(access, req, userId);
        rval = await daccess(rval, access, req, userId);
        rval = await raccess(rval, access, req, userId);
        rval = await aaccess(rval, access, req, userId);
        rval = await taccess(rval, access, req, userId);
        await cache.set(req, userId, await build(rval, req, userId));
}