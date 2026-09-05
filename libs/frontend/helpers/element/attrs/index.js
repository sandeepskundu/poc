const get = require('./../get');
const json = require('./../../json');
const crpt = require('./../../crpt');
const dtype = require('./../../data/type');

const getAttr = (el, atr) => {
    if(typeof el === 'string'){
        el = get.byId(el);
    }

    if(el && (el.getAttribute(atr) || el.getAttribute(atr) === '')){
        return el.getAttribute(atr);
    }
    return false;
}

const setAtr = () => {
    return ['s', 'e', 't', 'A', 't', 't', 'r', 'i', 'b', 'u', 't', 'e'].join('');
}

const remove = (elm, attr) => {
    if(typeof elm === 'string'){
        elm = get.byId(elm);
    }

    if(elm && elm.removeAttribute){
        elm.removeAttribute(attr);
    };
}

const set = (elm, attr, val) => {
    if(typeof elm === 'string'){
        elm = get.byId(elm);
    }

    let sa = setAtr();

    if(elm && elm[sa]){
        elm[sa](attr, val);
    };
}

const binded = (elm, name) => {
    set(elm, `data-binded-${name}`, 'yes');
}



const getObjHash = (elm, attr) => {
    let rval = {};

    const parse = (arg) => {
        try {
            return JSON.parse(arg)
        } catch (error) {
            return {}
        }
    }

    if(elm && attr){
        if(elm){
            let hash = getAttr(elm, attr);
            if(hash){
                let d = crpt.decrypt(hash);

                if(d){
                    rval = parse(d)
                }else{
                    rval = parse(hash)
                }
            }
        }   
    }

    return rval;
}

const toObjHash = (arg) => {
    if(dtype.is(arg, 'object') && json.length(arg) > 0){
        return crpt.encrypt(JSON.stringify(arg))
    }

    return ''
}

const objToString = (arg) => {
    if(dtype.is(arg, 'object') && json.length(arg) > 0){
        return JSON.stringify(arg);
    }else{
        return ''
    }
}

const stringToObj = (elm, attr) => {
    let rval = getObjHash(elm, attr);

    if(dtype.is(rval, 'object') && json.length(rval) > 0){
        return rval;
    }

    return false;
}

const setObjHash = (elm, attr, arg) => {
    if(elm && attr && dtype.is(arg, 'object')){
        let d = getObjHash(elm, attr);
            d = toObjHash(json.merge((d || {}), (arg || {})));
            if(d){
                set(elm, attr, d)
            }
    }
}

exports.set = set;
exports.get = getAttr;
exports.binded = binded;
exports.remove = remove;
exports.toObjHash = toObjHash;
exports.setObjHash = setObjHash;
exports.getObjHash = getObjHash;
exports.objToString = objToString;
exports.stringToObj = stringToObj;