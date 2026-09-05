const keyName = "aioConst";

const set = (map, arg) => { 
    window[keyName] = window[keyName] || {};
    
    let cons = window[_CN].json.copy(window[keyName]);

    if(map && arg){
        cons = window[_CN].json.set(cons, map, arg)
    }

    window[keyName] = cons;
}

exports.set = set;
exports.route = require('./route')