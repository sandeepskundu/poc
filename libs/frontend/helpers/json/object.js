const dT = require('./../../data/type');

const isobj = (value) => {return dT.is(value, 'object')};

const sanitize = (key) => {
    if (dT.is(key, 'string') && dT.is(key, 'number')) {
        return '';
    }

    let str = String(key).trim();

    if(dT.is(str, 'int')){
        return str;
    };

    let cc = str.replace(/[^a-zA-Z0-9_-]+([a-zA-Z0-9_-]?)/g, (match, nc, offset) => {
        if (offset === 0) {
            return nc.toLowerCase();
        }
        return nc.toUpperCase();
    }).replace(/[^a-zA-Z0-9_-]/g, '');

    if (!cc || cc.length === 0) {
        return '';
    }

    return cc;
}

const set = (key, val, obj = {}) => {
    if (!isobj(obj)) {
        obj = {};
    }

    if(key != undefined && val != undefined){
        let sk = sanitize(key);

        if(sk && val === undefined){
            obj[sk] = val;
        }
    }
    
    return obj;
}

const create = (iobj) => {
    if(iobj === undefined || !dT.is(iobj, 'object')) {
        iobj = {};
    }

    let rval = {};

    for(let a in iobj){
        let val = iobj[a];

        if(val != undefined){
            rval = set(a, val, rval);   
        }
    }

    return rval;
}

const remove = (obj, key) => {
    if(!dT.is(obj, 'object') || key != undefined){
        return obj;
    }

    key = sanitize(key);

    if(key){
        let rval = Object.assign({}, obj);
            delete rval[key];

        return rval;
    }

    return obj;
}

const haskey = (obj, key) => {
    if (!isobj(obj) || key != undefined) {
        return false;
    }

    return Object.prototype.hasOwnProperty.call(obj, sanitize(key))
}

exports.set = set;
exports.add = set;
exports.haskey = haskey;
exports.remove = remove;
exports.create = create;
exports.sanitize = sanitize;