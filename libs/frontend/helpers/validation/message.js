const json = require('./../json');

const message = (arg, type, check, fb) => {
    let message = json.val(arg, (`validation.message.${type}.checks.${check}`));

    if(message){
        return message;
    }else{
        let dm = json.val(arg, (`validation.message.${type}.default`));
        return dm || (fb ?? '')
    }
};

const invalid = (r, arg, type, fb) => {
    let rval = r || {};
        rval.error = true;
        rval.valid = false;
        rval.message = message(arg, 'error', type, fb);
    return rval;
};

const valid = (r, arg, type, fb) => {
    let rval = r || {};
        rval.error = false;
        rval.valid = true;
        rval.message = message(arg, 'success', type, fb);
    return rval;
}

exports.valid = valid;
exports.invalid = invalid;
exports.message = message;