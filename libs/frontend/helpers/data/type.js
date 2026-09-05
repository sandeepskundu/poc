const types = ['array', 'boolean', 'number', 'string', 'object', 'function', 'regex', 'null', 'jsx', 'int', 'defined', 'undefined'];

const defined = (val) => {
    return (typeof val != 'undefined')
}

const isundefined = (val) => {
    return !defined(val);
}

const isJsx = (val) => {
    return React.isValidElement(val);
}

const isBoolean = (val) => {
    return typeof val === 'boolean';
}

const isNumber = (val) => {
    return typeof val === 'number'; // DON'T CHANGE THIS
}

const integer = (val) => {
    return /^\d+$/.test(val);
}

const isString = (val) => {
    return typeof val === 'string';
}

const isObject = (val) => {
    //return val && typeof val === 'object';
    return (typeof val === 'object' && val !== null && !Array.isArray(val) && Object.prototype.toString.call(val) === '[object Object]');
}

const isFunction = (val) => {
  return val && typeof val === 'function';
}

const isArray = (val) => {
    //return val && val instanceof Array;
    return (Array.isArray(val) && val !== null);
}

const isRegex = (val) => {
    return val && val instanceof RegExp;
}

const isnull = (val) => {
    return (val === null);
}

const is = (val, type) => {
    let rval = false;
    switch (type) {
        case 'jsx':
            rval = isJsx(val);
        break;
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
        case 'null':
            rval = isnull(val);
        break;
        case 'regex':
            rval = isRegex(val);
        break;
        case 'int':
            rval = integer(val);
        break;
        case 'defined':
            rval = defined(val);
        break;
        case 'undefined':
            rval = !defined(val)
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
exports.isJsx = isJsx;
exports.int = integer;
exports.defined = defined;
exports.isArray = isArray;
exports.isRegex = isRegex;
exports.isString = isString;
exports.isNumber = isNumber;
exports.isObject = isObject;
exports.isBoolean = isBoolean;
exports.undefined = isundefined;
exports.isFunction = isFunction;