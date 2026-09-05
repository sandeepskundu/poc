const json = require('./../json');
const dataType = require('./../data');


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

const required = (rval, value) => {
    if((value != '' && value > -1) || value.length > 0){
        rval = valid(rval, rval, 'required');
        rval = others(rval, value);
    }else{
        rval = invalid(rval, rval, 'required');
    }
    return rval;
};


const optional = (rval, value) => {
    if((value === '')){
        rval = valid(rval, rval, 'optional');
    }else{
        rval = others(rval, value);
    }

    return rval;
}

const minlength = (rval, v) => {
    let ml = json.val(rval, 'validation.checks.minlength.value');

    if((ml > 0) && (v.length < ml)){
        rval = invalid(rval, rval, 'minlength');
    }

    return rval;
}

const maxlength = (rval, v) => {
    let ml = json.val(rval, 'validation.checks.maxlength.value');

    if((ml > 0) && (v.length > ml)){
        rval = invalid(rval, rval, 'maxlength');
    }

    return rval;
}

const enums = (rval, v) => {
    let enums = json.val(rval, 'validation.checks.enums.value');
    if(enums && !enums[v]){
        rval = invalid(rval, rval, 'enums');
    }

    return rval;
}

const regex = (rval, v) => {
    let regex = json.val(rval, 'validation.checks.regex.value');
    if(regex && regex instanceof RegExp){
        if(!regex.test(v)){
            rval = invalid(rval, rval, 'regex');
        }
    }else{
        if(regex){
            const egxp = new RegExp(regex);
            if(!egxp.test(v)){
                rval = invalid(rval, rval, 'regex');
            }
        }
    }

    return rval;
}

const lengths = (rval, v) => {
    let len = json.val(rval, 'validation.checks.lengths');

    if(len && len.length > 0){
        let vlen = v.length;

        if(vlen && len.indexOf(vlen) > -1){
            rval = valid(rval, rval, 'lengths');
        }else{
            rval = invalid(rval, rval, 'lengths');
        }
    }
    return rval;
}

const mobile = (rval, val) => {
    let min = 10;
    let max = 10;
    let isd = json.val(val, 'isd');
    if(isd){
        if(isd != '91' && isd != 91){
            min = 7;
            max = 13;
        }
        rval = json.set(rval, 'validation.checks.minlength', min);
        rval = json.set(rval, 'validation.checks.maxlength', max);
        rval = others(rval, json.val(val, 'number'));
    }else{
        rval = invalid(rval, rval, 'required');
    }
    
    return rval;
}

const others = (rval, value) => {
    let checks = json.val(rval, 'validation.checks');
    let orders = ['minlength', 'maxlength', 'lengths', 'regex', 'enums'];

    for(let a in orders){
        let check = orders[a];
        if(checks[check]){
            switch(check) {
                case 'minlength':
                    rval = minlength(rval, value);
                break;
                case 'maxlength':
                    rval = maxlength(rval, value);
                break;
                case 'lengths':
                    rval = lengths(rval, value);
                break;
                case 'regex':
                    rval = regex(rval, value);
                break;
                case 'enums':
                    rval = enums(rval, value);
                break;
                default:
            }

            if(rval.error){
                break;
            }
        }
    }

    return rval;
}

const validate = (arg) => {
    let value = json.val(arg, 'value');
    let checks = json.val(arg, 'validation.checks');

    if(checks){
        let check = json.val(checks, 'required.value');

        switch(check) {
            case 'required':
                arg = required(arg, value);
            break;
            case 'optional':
                arg = optional(arg, value);
            break;
            case 'mobile':
                arg = mobile(arg, value);
            break;
            default:
                arg = others(arg, value);
        }   
    }

    return arg;
}

const check = (arg, value) => {
    /*--let a = {
        value:'v',
        valid:true,
        message:'',
        error:false,
        validation:{
            checks:{
                regex:'',
                enums:'',
                minlength:3,
                maxlength:1,
                required:'required',
            },
            message:{
                error:{
                    default:'IN',
                    checks:{
                        required:'This field is required.'
                    }
                }
            }
        }
    }--*/
    
    return validate({
        valid:true,
        message:'',
        error:false,
        validation:arg,
        value:value || '',
    });
}

const start = (data, config) => {
    let rval = {
        valid:true,
        validation:{}
    };

    for(const a in config){
        let value = json.val(data, a);
        let valid = check(config[a], value);
            delete valid.validation;

        if(rval.valid && valid.valid === false){
            rval.valid = false;
        }

        rval.validation = json.set(rval.validation, a, valid, false, true)
    }

    return rval;
}

const body = (data, config) => {
    const isArr = dataType.type.isArray(data);
    let rval = {
        valid:true,
        validation:isArr?[]:{}
    };

    if(isArr){
        for(const a in data){
            const valid = start(data[a], config);

            if(rval.valid && valid.valid === false){
                rval.valid = false;
            }

            rval.validation.push(json.val(valid, 'validation'));
        }
        return rval;
    }else{
        return start(data, config);
    }
}

exports.query = (data, config) => {
    return start(data, config);
}

exports.params = (data, config) => {
    return start(data, config);
}

exports.body = (data, config) => {
    return body(data, config);
}