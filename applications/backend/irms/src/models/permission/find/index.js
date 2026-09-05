const mongodb = process.aioBeLibs('helpers/_private/mongodb');

const qp = {
    response:{
        exclude:{
            enable:true,
            kies:{
                ts:true
            }
        },
    },
    query:{
        otherConfigs:{
            doNotCheckQueryLength:true
        }
    }
}

const parse = async (arg, req) => {
    let rval = req.helpers.json.copy(arg);
    let type = req.helpers.json.val(rval, 'type', '');

    switch(type) {
        case 'super':
            rval.access = {
                read:true,
                write:true,
                update:true,
                delete:true,
            }
        break;
        case 'writer':
            rval.access = {
                read:true,
                write:true,
                update:true
            }
        break;
        case 'updater':
            rval.access = {
                read:true,
                update:true
            }
        break;
        case 'reader':
            rval.access = {
                read:true,
                update:true
            }
        break;
        default:
            // code block
    }

    return false;
}

const transform = async (req, results) => {
    let rv = [];

    for(let a in results){
        let i = await parse(results[a], req);

        if(i){
            rv.push(i)
        }
        
    }
   
    return rv;
}

const findByUserAndCode = async (code, req, res, next) => {
        code = (code?code.toUpperCase():'');
    let rval = [];
    let ud = req.helpers.session.auth.authDetails(req);
    let results = await mongodb.query.find.refined('permission', {userId:ud.userId, code:code}, qp, req, res, next);
    let rl = req.helpers.json.length(results);

    if(rl > 0){
        rval = await transform(req, results);
    }

    if(rval.length > 0){
        let rv = await req.helpers.express.response.getRespByCode(200, req, res, next);
            rv.data = {
                result:rval
            };

        return rv;
    }

    return await req.helpers.express.response.noResult(req, res, next, {});
};



const getAuthUserAccessByTypeItemIdAndCode = async (itemId, type, code, req, res, next) => {
    let ud = req.helpers.session.auth.authDetails(req);

    return await parse(await mongodb.query.find.refined('permission', {
        type:type, 
        itemId:itemId,
        userId:ud.userId,
        code:(code?code.toUpperCase():'')
    }, qp, req, res, next, true), req);
}

const getAccessByTypeAndItemId = async (itemId, type, req, res, next) => {
    let results = await mongodb.query.find.refined('permission', {type:type, itemId:itemId}, qp, req, res, next);
    let rl = req.helpers.json.length(results);

    if(rl > 0){
        let rval = [];

        for(let a in results){
            let i = await parse(results[a], req);

            if(i){
                rval.push(i)
            }
        }

        if(rval.length > 0){
            let rv = await req.helpers.express.response.getRespByCode(200, req, res, next);
                rv.data = {
                    result:rval
                };
            return rv;
        }
    }

    return await req.helpers.express.response.noResult(req, res, next, {});
}

exports.findByUserAndCode = findByUserAndCode;
exports.getAccessByTypeAndItemId = getAccessByTypeAndItemId;
exports.getAuthUserAccessByTypeItemIdAndCode = getAuthUserAccessByTypeItemIdAndCode;