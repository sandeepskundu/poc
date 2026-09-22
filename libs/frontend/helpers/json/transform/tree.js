const arr = require('./../../array');
const dT = require('./../../data/type');

const islist = (value) => {return dT.is(value, 'list')};

const isobj = (value) => {return dT.is(value, 'object')};

const isvalid = (value) => {return (islist(value) || isobj(value))};

const isindex = (value) => {return (dT.is(value, 'int') && value >= 0)};

const extract = (value) => {
    if(islist(value)){
        return [...value]
    }else{
        return Object.values(value)
    }
}

const format = (list, original, output = 'object') => {
    if(output === 'array' || islist(original)) {
        return list;
    }

    return arr.toIndexJson(list)
};

const add = (obj, item, options = {output:'object'}) => {
    if (!isvalid(obj) || item === undefined) {
        return obj;
    }

    let list = extract(obj);
        list.push(item);

    return format(list, obj, options.output);
};

const insert = (obj, index, item, options = {output:'object'}) => {
    if (!isvalid(obj) || !isindex(index) || item === undefined) {
        return obj;
    }

    const list = extract(obj);

    if (index > list.length) {
        return obj;
    }

    return format([...list.slice(0, index), item, ...list.slice(index)], obj, options.output);
};

const remove = (obj, index, options = {output: 'object'}) => {
    if (!isvalid(obj) || !isindex(index)){
        return obj;
    }

    const list = extract(obj);

    if (index >= list.length) {
        return obj;
    }

    return format([...list.slice(0, index), ...list.slice(index+1)], obj, options.output);
};


const update = (obj, index, item, options = {output: 'object'}) => {
    if (!isvalid(obj) || !isindex(index) || item === undefined) {
        return obj;
    };

    const list = extract(obj);

    if (index >= list.length) {
        return obj;
    }

    let ul = [...list];
        ul[index] = item;

    return format(ul, obj, options.output);
};

exports.add = add;
exports.update = update;
exports.remove = remove;
exports.insert = insert;