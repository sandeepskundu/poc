const url = require('./index');
const dt = require('./../data');
const json = require('./../json');
const random = require('./../random');

exports.set = (arg) => {
    let isobj = dt.type.is(arg, 'object');

    if(isobj){
        _siteProps_.endpoints = json.merge(json.copy(_siteProps_.endpoints), arg)
    };
}

exports.get = (map, vurl) => {

    if(map){
        let dv = random.id(24);
        let eps = json.copy(_siteProps_.endpoints || {})
        let rv = json.val(eps, map, dv);

        if(rv != dv){
            if(vurl){
                rv = rv.replace(/:_.*?_:/g, "")
                return url.sanitize(vurl?`${rv}/uiv`:rv);
            }else{
                return rv;
            }
        }else{
            return null
        }
    }
    
    return null;
}