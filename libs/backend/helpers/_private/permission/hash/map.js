const set = async (rval, map, val, key, req) => {
    let vm = req.helpers.access.map.encode(map, key);

    if(vm){
        rval = req.helpers.json.set(rval, vm, val, false, false, false)
    }

    return rval;
}

exports.set = set;