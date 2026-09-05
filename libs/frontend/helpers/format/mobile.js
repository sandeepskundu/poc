const json = require('./../json');
const string = require('./../string');

const isd = (arg) => {
    let t = json.val(arg, 'isd', '');
        t = string.remove.plus(`${t}`);
        t = string.remove.space(t)
    
    return t?`+${t}`:'';
}

const num = (arg) => {
    let t = json.val(arg, 'number', '');
        t = string.remove.space(t)
    
    return t || '';
}

const validate = (val) => {
    let v = string.remove.space(val);

    return v?val:''
}

const fbv = (val) => {
    return val || 'NA'
}

const number = (arg, fb) => {
    let rval = [isd(arg), num(arg)];
        rval = validate(rval.join('-'));
    
    return rval || fbv(fb);
}

const mask = (arg, fb) => {
    const phone = number(arg, fb);

    if(phone === fbv(fb) || !phone){
        return phone;
    }else{
        return phone;
    }
}

exports.mask = mask;
exports.number = number;