const json = require('./../../json');
const random = require('./../../random')

const toList = (arg) => {
    return json.toList(arg || {})
}

const join = (arg, node, fb, jBy) => {
    let rv = [];
    let li = toList(arg);
    let dv = random.id(10);

    for(let a in li){
        let v = json.val(li[a], (node || 'name'), fb || dv);

        if(v != dv){
            rv.push(v);
        }
    }

    return rv.join(jBy || ', ')
}

exports.join = join;
exports.toList = toList;