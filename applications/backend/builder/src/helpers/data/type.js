const types = ['array', 'boolean', 'number', 'string', 'object', 'function', 'regex'];

const isBoolean = (val) => {
    return typeof val === 'boolean';
}

const isNumber = (val) => {
    return typeof val === 'number';
}

const isString = (val) => {
    return typeof val === 'string';
}

const isObject = (val) => {
    return val && typeof val === 'object';
}

const isFunction = (val) => {
  return val && typeof val === 'function';
}

const isArray = (val) => {
    return val && val instanceof Array;
}

const isRegex = (val) => {
    return val && val instanceof RegExp;
}

const is = (val, type) => {
    let rval = false;
    switch (type) {
        case 'list':
            rval = isArray(val);
        break;
        case 'array':
            rval = isArray(val);
        break;
        case 'boolean':
            rval = isBoolean(val);
        break;
        case 'number':
            rval = isNumber(val);
        break;
        case 'string':
            rval = isString(val);
        break;
        case 'object':
            rval = isObject(val);
        break;
        case 'function':
            rval = isFunction(val);
        break;
        case 'regex':
            rval = isRegex(val);
        break;
        default:
    }
    return rval;
}

const get = (arg) => {
    let rv = false;

    for(const a in types){
        const t = types[a];
        const i = is(arg, t);

        if(i){
            rv = t;
            break;
        }
    }

    return rv;
}

exports.is = is;
exports.get = get;
exports.isArray = isArray;
exports.isRegex = isRegex;
exports.isString = isString;
exports.isNumber = isNumber;
exports.isObject = isObject;
exports.isBoolean = isBoolean;
exports.isFunction = isFunction;