const ENUMS = {
    NOT_DFINED_VALUE:'____VAL____NOT____DEFINED____'
};

const compile = (values, data, config, node, valmap, req) => {
    let rval = `${values.join('')}`;
        //rval = req.helpers.string.remove.space(rval);

        if(rval){
            rval = rval.toUpperCase();
        }

    return rval;
}

const getvalue = (data, config, node, valmap, req) => {
    let invalid = false;
    const values = [];
    const vmc = ENUMS.NOT_DFINED_VALUE;
    const vm = req.helpers.json.val(config, 'nodes');
    const mId = req.helpers.json.val(valmap, 'merchant.id', vmc);
    const vml = req.helpers.json.length(vm);

    if(vm){

        if(mId != vmc){
            values.push(mId);
        }

        for(const a in vm){
            val = req.helpers.json.valueFromMap(valmap, data, vm[a], vmc);

            if(val && val != vmc){
                values.push(val)
            }else{
                invalid = true;
                break;
            }
        }
    }

    if((values && values.length > 0) && (!invalid)){
        let val = compile(values, data, config, node, valmap, req);
        return req.helpers.crypto.md5(val)
    }else{
        return vmc;
    }
}

const mapvalues = (data, config, req, res, next) => {
    const dummy = {
        'name.middle':{
            "nodes":{
                "0":{
                    "map":"id",
                    "from":"body",
                    "fallback":{
                        "map":"",
                        "from":"env"
                    }
                },
                "1":{
                    "map":"id",
                    "from":"merchant",
                    "fallback":{
                        "map":"",
                        "from":"env"
                    }
                }
            }
        },
        'name.last':{
            "nodes":{
                "0":{
                    "map":"id",
                    "from":"body",
                    "fallback":{
                        "map":"",
                        "from":"env"
                    }
                },
                "1":{
                    "map":"id",
                    "from":"merchant",
                    "fallback":{
                        "map":"",
                        "from":"env"
                    }
                }
            }
        }
    };

    const maps = req.helpers.json.val(config, 'md5Hash');
    const valmap = req.helpers.express.validation.helpers.valuesmap(req, res, next);

    for(const a in maps){
        let val = getvalue(data, maps[a], a, valmap, req);

        if(val != ENUMS.NOT_DFINED_VALUE){
            data = req.helpers.json.set(data, a, val, false, true);
        }
    };

    return data;
}

const parse = (rval, schema, data, config, req, res, next) => {
    let d = mapvalues(data, config, req, res, next);
    return req.helpers.json.merge(rval, d);
}

exports.parse = parse;
exports.mapvalues = mapvalues;