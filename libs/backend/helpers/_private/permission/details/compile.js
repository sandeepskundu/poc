const mongodb = process.aioBeLibs('helpers/_private/mongodb');
const hash = process.aioBeLibs('helpers/_private/permission/hash');

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

const rolemap = async (rval, req, item, map) => {
    let ml = [];
    
    let type = req.helpers.json.val(item, 'type', '');
    let lfor = req.helpers.json.val(item, 'linkFor', '');

    if(lfor && map.length > 0){
        ml.push(lfor.toUpperCase());
    }

    for(let a in map){
        let i = map[a];

        if(i && i.length === 24){
            let role = await mongodb.query.find.refined('ar', {_id:i}, qp, req, false, false, true);
            let code = req.helpers.json.val(role, 'code', '');

            if(code){
                ml.push(code);
            }else{
                ml = [];
                break; 
            }
        }else{
            ml = [];
            break;
        }
    }

    if(type && ml.length > 0){
        rval[ml.join('.')] = type;
    }

    return rval;
}

const parse = async (rval, res, req) => {
    if(res){
        for(let a in res){
            let map = req.helpers.json.val(res[a], 'mapping', '');
            if(map){
                rval = await rolemap(rval, req, res[a], map.split('.'));
            }
        }
    }

    return rval;
}

const init = async (rval, req, map, lf, lt) => {
    if(map && map.length >= 24){
        let ml = map.split('.');

        for(let a in ml){
            if(ml[a] && ml[a].length === 24){
                rval = await parse(rval, await mongodb.query.find.refined('rba', {mapId:ml[a], linkFor:lf, linkType:lt}, qp, req, false, false), req);
            }
        }
    }
    
    return rval;
}

const refine = async (arg, req) => {
    let rval = {};
    let md = req.helpers.merchant.details(req);

    for(let a in arg){
        let val = arg[a];

        if(val != 'blocked'){
            rval = await hash.map.set(rval, a, val, md.id, req);
        }
    }

    return rval;
}

exports.init = init;
exports.refine = refine;