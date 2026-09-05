const dvalue = '___AIO__DEFAULT__VALUE__';
const orders = ['default', 'required', 'minLength', 'maxLength', 'min', 'max', 'enum', 'match'];

const defaultv = (rval, config, name, item, req, res, next) => {
    let enabled = req.helpers.json.val(config, 'default.enable');
    let dv = req.helpers.json.val(config, 'default.value', dvalue);

    if(enabled && dv != dvalue){
        config.default = dv;
    }else{
        delete config.default;
    }

    return config;
}

const escape = (req, msg) => {
    if(msg){
        msg = msg.replace(/['"\\]/g, "\\$&")
    }

    return msg || '';
}

const required = (rval, config, name, item, req, res, next) => {
    let enabled = req.helpers.json.val(config, 'required.enable');
    let value = req.helpers.json.val(config, 'required.value', dvalue);
    let message = req.helpers.json.val(config, 'required.message', 'This field is required');

    if(enabled && value != dvalue){
        config.required = [value, escape(req, message)];
    }else{
        delete config.required;
    }

    return config;
}

const match = (rval, config, name, item, req, res, next) => {
    let enabled = req.helpers.json.val(config, 'match.enable');
    let value = req.helpers.json.val(config, 'match.value', dvalue);
    let message = req.helpers.json.val(config, 'match.message', 'This field is required');

    if(enabled && value != dvalue){
        config.match = [new RegExp(`${value}`), escape(req, message)];
    }else{
        delete config.match;
    }

    return config;
}

const minLength = (rval, config, name, item, req, res, next) => {
    let enabled = req.helpers.json.val(config, 'minLength.enable');
    let value = req.helpers.json.val(config, 'minLength.value', dvalue);
    let message = req.helpers.json.val(config, 'minLength.message', `Min length is ${value}`);

    if(enabled && value != dvalue){
        config.minLength = [parseInt(value), escape(req, message)];
    }else{
        delete config.minLength;
    }

    return config;
}

const maxLength = (rval, config, name, item, req, res, next) => {
    let enabled = req.helpers.json.val(config, 'maxLength.enable');
    let value = req.helpers.json.val(config, 'maxLength.value', dvalue);
    let message = req.helpers.json.val(config, 'maxLength.message', `Max length is ${value}`);

    if(enabled && value != dvalue){
        config.maxLength = [parseInt(value), escape(req, message)];
    }else{
        delete config.maxLength;
    }

    return config;
}

const min = (rval, config, name, item, req, res, next) => {
    let enabled = req.helpers.json.val(config, 'min.enable');
    let value = req.helpers.json.val(config, 'min.value', dvalue);
    let message = req.helpers.json.val(config, 'min.message', `Min value at least ${value}, got {VALUE}`);

    if(enabled && value != dvalue){
        config.min = [parseInt(value), escape(req, message)];
    }else{
        delete config.min;
    }

    return config;
}

const max = (rval, config, name, item, req, res, next) => {
    let enabled = req.helpers.json.val(config, 'max.enable');
    let value = req.helpers.json.val(config, 'max.value', dvalue);
    let message = req.helpers.json.val(config, 'max.message', `Max value ${value}, got {VALUE}`);

    if(enabled && value != dvalue){
        config.max = [parseInt(value), escape(req, message)];
    }else{
        delete config.max;
    }

    return config;
}

const enums = (rval, config, name, item, req, res, next) => {
    let enabled = req.helpers.json.val(config, 'enum.enable');
    let value = req.helpers.json.val(config, 'enum.value', dvalue);
    let message = req.helpers.json.val(config, 'enum.message', `Please provide correct valid`);
    
    if(enabled && value != dvalue){
        config.enum = {
            values:`${value}`,
            message:`'${escape(req, message)}'`
        };
        //config.enum = `${value}`;
    }else{
        delete config.enum;
    }

    return config;
}

const start = (rval, config, name, item, req, res, next) => {
    let conf = {...config};

    for(const a in orders){
        switch(orders[a]) {
            case 'default':
                conf = defaultv(rval, conf, name, item, req, res, next)
            break;
            case 'required':
                conf = required(rval, conf, name, item, req, res, next)
            break;
            case 'minLength':
                conf = minLength(rval, conf, name, item, req, res, next)
            break;
            case 'maxLength':
                conf = maxLength(rval, conf, name, item, req, res, next)
            break;
            case 'match':
                conf = match(rval, conf, name, item, req, res, next)
            break;
            case 'enum':
                conf = enums(rval, conf, name, item, req, res, next);
            break;
            case 'min':
                conf = min(rval, conf, name, item, req, res, next)
            break;
            case 'max':
                conf = max(rval, conf, name, item, req, res, next)
            break;
            default:
              // code block
        }
    }

    return conf;
}

exports.start = start;