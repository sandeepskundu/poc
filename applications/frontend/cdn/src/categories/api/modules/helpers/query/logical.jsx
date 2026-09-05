
import helpers from 'ui-helpers';

const rebuild = (rval, map) => {

    if(map && map.length > 0){
        let vm = map.join('.');
        let val = helpers.json.val(rval, vm, {});
        let valen = helpers.json.length(val);
            helpers.json.remove(rval, vm);

            if(valen > 0){
                rval = helpers.json.set(rval, vm, val);
            }
    };
    
    return rval;
}

export default {
    rebuild:rebuild
}