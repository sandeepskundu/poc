
const tolist = (arg) => {
    let rv = [];

    for(let a in arg){
        rv.push({
            id:arg[a],
            label:arg[a]
        })
    }

    return rv;
}

const get = (arg, list) => {
    let rval = {};

    for(let a in list){
        let key = list[a];
        let val = arg[key];

        if(val && typeof val === 'object' && !Array.isArray(val)){
            rval[key] = tolist(val);
        }
    }

    console.log(rval);

    return rval;
}

exports.get = get;