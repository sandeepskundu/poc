const json = require('./index');
const dH = require('./../data');
const random = require('./../random');
const compare = require('node-modules/json-schema-compare');

const same = (a, b, conf) => {
    return compare(a, b, conf);
}

const defined = (arg, map) => {
    let rval = true;
    let dv = random.uuid();
    let isObj = dH.type.is(arg, 'object');
    let isMobj = dH.type.is(map, 'object');

    if(isMobj && isObj){
        for(const a in map){
            if(map[a]){
                if(json.val(arg, a, dv) === dv){
                    rval = false;
                    break;
                }
            }
        }
    }

    return rval;
}

exports.same = same;
exports.defined = defined;