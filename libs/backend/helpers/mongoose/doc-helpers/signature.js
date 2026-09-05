const getId = (req, res, next) => {
    let id = new req.mdb.db.Types.ObjectId();
    return id.toString()
}

const salt = (id, req, res, next) => {
    let rval = [];
    let aId = req.helpers.json.val(req, 'appConfig.appInfo.appId');

        if(id){
            rval.push(id);
        }

        if(aId){
            rval.push(aId);
        }

    return rval.join('');
}

const isValid = (item, req, res, next) => {
    let sign = req.helpers.json.val(item, 'signature', {});
    let sId = req.helpers.json.val(sign, 'id');
    let sToken = req.helpers.json.val(sign, 'token');
    let saltval = salt(sId, req, res, next);
        sToken = req.helpers.crypto.de(sToken, saltval);

    if(sId && sToken){
        let rv = req.helpers.jwt.verify(sToken, salt(sId, req, res, next));

        return rv || false;
    }

    return false;
}

/*-- Cleans signature object unwanted key created during the token creation. --*/

const clean = (item, req, res, next) => {
    let map = {
        'iat':true
    }

    for(const a in map){
        if(map[a]){
            req.helpers.json.remove(item, a);
        }
    }

    return item;
}

/*-- Valid signature of given item, and return JSON object of signature. If not valid signature then returns blank Object --*/

const decode = (item, req, res, next) => {
    let s = isValid(item, req, res, next);

    return clean(s || {}, req, res, next);
}

const hash = (token, saltval, req, res, next) => {
    return req.helpers.crypto.en(token, saltval);
}

/*-- Creates Signature basis on _id, _mapId, _userId, _merchantId from db doc and return jwt token to caller. --*/

const create = (item, name, arg, appConfig, helpers, mdb) => {
    let req =  helpers.json.val(item, 'runtime.req');
    let res =  helpers.json.val(item, 'runtime.res');
    let next =  helpers.json.val(item, 'runtime.next');
    let enable = helpers.json.val(item, 'runtime.config.signature.creation.enable');

    if(enable && req){
        let vm = '__NAV__';
        let nodes = helpers.json.val(item, 'runtime.config.signature.creation.nodes');
        let isObj = helpers.data.type.isObject(nodes);

        if(isObj){
            let nodel = helpers.json.length(nodes || {});

            if(nodel > 0){
                let rv = {};
                for(const a in nodes){
                    let i = nodes[a];
                    let v = helpers.json.val(item, a, vm);
                    let e = helpers.json.val(i, 'enable');
                    let t = helpers.json.val(i, 'valueType');
                    if(e && v != vm){
                        if(t === 'objectId'){
                            rv[a] = v.toString()
                        }
                    }
                }  
                
                let id = rv._id || getId(req, res, next);
                let rvl = helpers.json.length(rv || {});

                if(rvl > 0){
                    let sl = salt(id, req, res, next);

                    return {
                        id:id,
                        //token:helpers.jwt.sign(rv, sl)
                        token:hash(helpers.jwt.sign(rv, sl), sl, req, res, next)
                    };
                }
            }
        }
    }else{
        return false;
    }
}

exports.decode = decode;
exports.create = create;