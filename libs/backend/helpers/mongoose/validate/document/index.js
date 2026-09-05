const dconfig = {
    "query": {
        "hidden": {
            "enable": true,
            "configs": {
                "columns": {
                    "merchantId": {
                        "enable": true
                    }
                }
            }
        },
        "otherConfigs":{
            "doNotCheckQueryLength":true
        }
    }
}

const runtime = async (_this) => {
    let rval = {
        req:null,
        res:null,
        next:null
    }

    if(_this.runtime){
        rval.req = _this.runtime.req;
        rval.res = _this.runtime.res;
        rval.next = _this.runtime.next;
    }else{
        if(_this.model && _this.model.runtime){
            rval.req = _this.model.runtime.req;
            rval.res = _this.model.runtime.res;
            rval.next = _this.model.runtime.next;
        }
    }

    return rval;
}

const getModel = async (req, name) => {
    let col = name || 'abcy';
        col =  col.toLowerCase();

    return req.helpers.json.val(req, `mdb.models.${col}`);
}

const lean = (req, obj) => {
    if(obj.buffer && typeof obj.buffer === 'object' && Object.keys(obj.buffer).every(k => !isNaN(k))) {
        return Buffer.from(Object.values(obj.buffer)).toString('hex');
    }

    if(obj){
        let isList = req.helpers.data.type.is(obj, 'list');
        let isObj = req.helpers.data.type.is(obj, 'object');

        if(isList){
            return obj.map(item => lean(req, item));
        }else{
            if(isObj){
                let rv = {};
                for(const a in obj){
                    rv[a] = lean(req, obj[a]);
                }

                return rv;
            }
        }
    }

    return obj;
}

const isexist = async (_this, coll, query, conf) => {
    let {req, res, next} = await runtime(_this);
    let model = await getModel(req, coll);
    let config = req.helpers.json.merge(dconfig, conf || {});

    if(model){
        let qpObj = await req.helpers.mongoose.query.build(config, model, {}, {}, req, res, next);

        if(qpObj.valid){
            let qps = req.helpers.json.merge((qpObj.data || {}), (query || {}));
            let exists = await model.exists(await lean(req, qps));
            return exists?true:false
        }
    }

    return false;
}

const parentId = async (_this, value, query, conf) => {
    let {req, res, next} = await runtime(_this);
    let mHash = req.helpers.json.val(req, 'appConfig.runtimeUtils.merchantRootHash', req.helpers.crypto.md5(''));

    if(value === mHash){
        return true;
    }else{
        let config = req.helpers.json.merge(dconfig, conf || {});
        let qpObj = await req.helpers.mongoose.query.build(config, _this.model, {}, {}, req, res, next);

        if(qpObj.valid){
            let exists = false;
            let qps = req.helpers.json.merge((qpObj.data || {}), (query || {}));

            if(_this?.constructor?.exists){
                exists = await _this.constructor.exists(await lean(req, qps))
            }else{
                exists = await model.exists(await lean(req, qps));
            }
            return exists?true:false
        }else{
            return false;
        }
    }
}

const optionalOrRequired = async (_this, value, dv, optional) => {
    if(optional){
        return true;
    }else{
        if(dv && value === dv){
            return true;
        }else{
            return value?true:false
        }
    }
}

const optionalOrUnique = async (_this, value, query, conf, dv) => {
    let {req, res, next} = await runtime(_this);

    if(dv && value === dv){
        return true;
    }else{
        if(!value){
            return true;
        }else{
            let config = req.helpers.json.merge(dconfig, conf || {});
            let qpObj = await req.helpers.mongoose.query.build(config, _this.model, {}, {}, req, res, next);

            if(qpObj.valid){
                let exists = false;
                let qps = req.helpers.json.merge((qpObj.data || {}), (query || {}));

                if(_this?.constructor?.exists){
                    exists = await _this.constructor.exists(await lean(req, qps))
                }else{
                    exists = await model.exists(await lean(req, qps));
                }
                return exists?false:true
            }else{
                return false;
            }
        }
    }
}

const hashmap = {
    required:async (_this, coll, value, column, conf) => {
        if(column){
            let {req, res, next} = await runtime(_this);
            let required = await optionalOrRequired(_this, value);

            if(required){
                    value = req.helpers.string.replace.word(value, '.fb72d5e5b3d14ac9e454ffe3fe6a879b', '')
                let map = value.split('.');

                if(map && map.length > 0){
                    let dup = req.helpers.array.has.duplicate(map);

                    if(dup){
                        return false;
                    }else{
                        let rval = true;

                        for(const a in map){
                            let qp = {};
                                qp[column] = map[a];
                                rval = await isexist(_this, coll, qp, conf);

                                if(!rval){
                                    break;
                                }
                        }

                        return rval;
                    }
                }else{
                    return false;
                }
            }else{
                return req;
            }
        }else{
            return false;
        }
    }
}

const idmap = {
    required:async (_this, coll, value, column, conf) => {
        if(column){
            let {req, res, next} = await runtime(_this);
            let required = await optionalOrRequired(_this, value);

            if(required){
                    value = req.helpers.string.replace.word(value, '.fb72d5e5b3d14ac9e454ffe3fe6a879b', '')
                let map = value.split('.');

                if(map && map.length > 0){
                    let dup = req.helpers.array.has.duplicate(map);

                    if(dup){
                        return false;
                    }else{
                        let rval = true;

                        for(const a in map){
                            let qp = {};
                                qp[column] = map[a];
                                rval = await isexist(_this, coll, qp, conf);

                                if(!rval){
                                    break;
                                }
                        }

                        return rval;
                    }
                }else{
                    return false;
                }
            }else{
                return req;
            }
        }else{
            return false;
        }
    }
}

exports.idmap = idmap;
exports.hashmap = hashmap;
exports.isexist = isexist;
exports.parentId = parentId;
exports.optionalOrUnique = optionalOrUnique;