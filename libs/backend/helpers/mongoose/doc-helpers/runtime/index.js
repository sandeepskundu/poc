const md5Hash = require('./md5-hash');

const ENUMS = {
    NOT_DFINED_VALUE:'____VAL____NOT____DEFINED____'
};

const getvalue = (data, config, node, valmap, req) => {
    const vmc = ENUMS.NOT_DFINED_VALUE;
    const vm = req.helpers.json.val(config, 'valuemap');

    if(vm){
        if(vm.hashMap){
            let val = '';
            for(const a in vm.hashMap){
                const v  = getvalue(data, {
                    valuemap:vm.hashMap[a] || {}
                }, node, valmap, req);

                if(v != vmc){
                    val = val+v;
                }
            }

            if(val){
                return req.helpers.crpt.sha256(`${val}`);
            }else{
                return vmc;
            }
        }else{
            let mv = req.helpers.json.valueFromMap(valmap, data, vm, vmc);

            if(mv != vmc){
                return mv;
            }

            /*--


            let map = req.helpers.json.val(vm, 'map');
            let from = req.helpers.json.val(vm, 'from');
            let fbvm = req.helpers.json.val(vm, 'fallback', vmc);
            let fbmap = req.helpers.json.val(fbvm, 'map');
            let fbfrom = req.helpers.json.val(fbvm, 'from');

            if(map){
                if(from != 'body-item'){
                    let v = req.helpers.json.val(valmap, `${from}.${map}`, vmc);
                    
                    if(v != vmc){
                        return v;
                    }else{
                        if(fbfrom && fbmap){
                            if(fbfrom != 'body-item'){
                                let fbv = req.helpers.json.val(valmap, `${fbfrom}.${fbmap}`, vmc);
                        
                                if(fbv != vmc){  
                                    return fbv;
                                } 
                            }else{
                                let ifbv = req.helpers.json.val(data, fbmap, vmc);
                        
                                if(ifbv != vmc){  
                                    return ifbv;
                                } 
                            }
                        }
                    }
                }else{
                    return req.helpers.json.val(data, map, vmc);
                }
            }---*/
        }
    }

    return req.helpers.json.val(data, node, vmc);
}

const mapvalues = (data, config, req, res, next) => {
    let maps = req.helpers.json.val(config, 'valuemap', {});
    let valmap = req.helpers.express.validation.helpers.valuesmap(req, res, next);

    for(const a in maps){
        let val = getvalue(data, maps[a], a, valmap, req);

            if(val != ENUMS.NOT_DFINED_VALUE){
                data = req.helpers.json.set(data, a, val, false, true);
            }
    };

    return data;
}

const modelValuesDefinedInModelConfig = (rval, data, config, schema, req, res, next) => {
    let dv = ENUMS.NOT_DFINED_VALUE;
    let values = req.helpers.json.val(config, 'values', {});
    let isobj = req.helpers.data.type.is(values, 'object');
    let islist = req.helpers.data.type.is(values, 'array');

    if(values && isobj && !islist){
        for(const a in schema){
            if(schema[a]){
                let v = req.helpers.json.val(data, a, dv);

                if(v === dv){
                    let hardcode = req.helpers.json.val(values, 'hardcoded', {});
                    let isHobj = req.helpers.data.type.is(hardcode, 'object');
                    let isHlist = req.helpers.data.type.is(hardcode, 'array');

                    if(hardcode && isHobj && !isHlist && hardcode[a] !== undefined){
                        rval = req.helpers.json.merge(rval, req.helpers.json.set({}, a, hardcode[a], false, true));
                    }else{
                        let dvalues = req.helpers.json.val(values, 'default', {});
                        let isDobj = req.helpers.data.type.is(dvalues, 'object');
                        let isDlist = req.helpers.data.type.is(dvalues, 'array');

                        if(dvalues && isDobj && !isDlist && dvalues[a] !== undefined){
                            rval = req.helpers.json.merge(rval, req.helpers.json.set({}, a, dvalues[a], false, true));
                        }
                    }
                }else{
                    let hardcode = req.helpers.json.val(values, 'hardcoded', {});
                    let isHobj = req.helpers.data.type.is(hardcode, 'object');
                    let isHlist = req.helpers.data.type.is(hardcode, 'array');

                    if(hardcode && isHobj && !isHlist && hardcode[a] !== undefined){
                        rval = req.helpers.json.merge(rval, req.helpers.json.set({}, a, hardcode[a], false, true));
                    }
                }
            }
        }
    }

    return rval;
}

const parse = (data, config, req, res, next) => {
    let rval = {};
    let _default = {
        _mapId:true,
        _userId:true,
        _prevId:true,
        _deleted:true,
        _version:true,
        _deletedAt:true,
        _createdBy:true,
        _updatedBy:true,
        _merchantId:true,
        _createdType:true,
    };

    let dv = ENUMS.NOT_DFINED_VALUE;
    let d = mapvalues(data, config, req, res, next);
    let schema = req.helpers.json.val(config, 'schema', {});
        schema = {..._default, ...schema};
        d = md5Hash.parse(d, schema, data, config, req, res, next);

    for(const a in schema){
        if(schema[a]){
            let v = req.helpers.json.val(d, a, dv);
            if(v != dv){
                rval = req.helpers.json.merge(rval, req.helpers.json.set({}, a, v, false, true));
            }
        }
    } 

    return modelValuesDefinedInModelConfig(rval, d, config, schema, req, res, next);;
}

exports.parse = parse;
exports.mapvalues = mapvalues;