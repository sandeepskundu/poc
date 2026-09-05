const crpt = require('./../crpt');

const encode = (map, key) => {
    if(map){
        let rval = [];
        let last = key;
        let list = map.split('.');

        if(list && list.length > 0){
            for(let a in list){
                last = crpt.md5(`${list[a]}${last}`);
                rval.push(last);
            }
        }

        //return rval.join('.');
        return crpt.md5(rval.join('.'));
    }

    return false;
}

exports.encode = encode;