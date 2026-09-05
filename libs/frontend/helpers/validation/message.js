const json = require('./../json');

const message = (arg, type, check) => {
    let message = json.val(arg, (`validation.message.${type}.checks.${check}`));

    if(message){
        return message;
    }else{
        let dm = json.val(arg, (`validation.message.${type}.default`));
        return dm || ''
    }
};

const invalid = (r, arg, type) => {
    let rval = r || {};
        rval.error = true;
        rval.valid = false;
        rval.message = message(arg, 'error', type);
    return rval;
};

const valid = (r, arg, type) => {
    let rval = r || {};
        rval.error = false;
        rval.valid = true;
        rval.message = message(arg, 'success', type);
    return rval;
}

exports.valid = valid;
exports.invalid = invalid;
exports.message = message;