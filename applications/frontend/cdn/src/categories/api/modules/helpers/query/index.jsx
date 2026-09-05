
import helpers from 'ui-helpers';
import logical from './logical';

const PROP_NAMES = {
    'or':true,
    'and':true,
    'query':true,
    'logical':true
}

const rebuild = (rval, map) => {
    if(map && map.length > 0){
        let vm = map.join('.');
        let val = helpers.json.val(rval, vm, {});
        let valen = helpers.json.length(val);
            helpers.json.remove(rval, vm);

            if(valen > 0){
                let i = 0;
                let v = {};

                for(const a in val){
                    if(val[a]){
                        v[i] = val[a];
                        i = i+1;
                    }
                }

                let vlen = helpers.json.length(v);

                if(vlen){
                    rval = helpers.json.set(rval, vm, v);
                }
            }
    };
    
    return rval;
}


const refine = (rval) => {
    let rvl = helpers.json.length(rval);

    if(rvl > 0){
        for(const a in rval){
            let ivl = helpers.json.length(rval[a] || {});

            if(ivl > 0 && PROP_NAMES[a]){
                let rv = refine(rval[a]);
                let rvll = helpers.json.length(rv);

                if(rvll > 0){
                    rval[a] = rv;
                }else{
                    delete rval[a];
                }
            }else{
                if(ivl === 0){
                    delete rval[a];
                    rval = refine(rval);
                }else{
                    if(PROP_NAMES[a]){
                        let rv = refine(rval[a]);
                        let rvll = helpers.json.length(rv);
                            if(rvll > 0){
                                rval[a] = rv;
                            }else{
                                delete rval[a];
                            }
                    }else{
                        if(ivl === 0){
                            delete rval[a];
                            rval = refine(rval);
                        }
                    }
                }
            }   
        }
    }

    return rval;
}

const getMissing = (type, qp, typeOnly) => {
    if(type === 'query'){
        if(typeOnly){
            return type;
        }else{
            return helpers.json.length(qp);
        }
    }else{
        switch (type) {
            case 'or':
            case 'and':
                if(qp.query){
                    return 'logical'
                }

                if(qp.logical){
                    return 'query'
                }
            break;
            case 'logical':
                if(qp.or){
                    return 'and'
                }

                if(qp.and){
                    return 'or'
                }
            break;
            default :
                return type;
        }
    }
}

export default {
    refine:refine,
    rebuild:rebuild,
    logical:logical,
    getMissing:getMissing
}