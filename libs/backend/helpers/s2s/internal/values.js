
const ENUMS = {
    NOT_DFINED_VALUE:'____VAL____NOT____DEFINED____'
};

const value = (data, vm, node, valmap, req) => {
    const vmc = ENUMS.NOT_DFINED_VALUE;

    if(vm){
        let mv = req.helpers.json.valueFromMap(valmap, data, vm, vmc);

        if(mv != vmc){
            return mv;
        }

    /*---
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
        }--*/
    }

    return req.helpers.json.val(data, node, vmc);
}

const map = (rval, maps, req, res, next) => {
    let valmap = req.helpers.express.validation.helpers.valuesmap(req, res, next);

    for(const a in maps){
        let val = value(rval, maps[a], a, valmap, req);

            if(val != ENUMS.NOT_DFINED_VALUE){
                rval = req.helpers.json.set(rval, a, val, false, true);
            }
    };

    return rval;
}

exports.map = map;