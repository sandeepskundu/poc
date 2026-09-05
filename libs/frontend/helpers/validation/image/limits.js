const mime = require('./mime');
const json = require('./../../json');
const message = require('./../message');
const convert = require('./../../convert');

const min = (rval, value, conf, fieldname) => {
    let minv = json.val(conf, 'min');
    if(value.length >= minv){
        return message.valid(rval, rval, 'image.limits.min');
    }else{
        return message.invalid(rval, rval, 'image.limits.min');
    }
}

const max = (rval, value, conf, fieldname) => {
    let maxv = json.val(conf, 'max');
    if(value.length <= maxv){
        return message.valid(rval, rval, 'image.limits.max');
    }else{
        return message.invalid(rval, rval, 'image.limits.max');
    }
}

const size = (rval, value, conf, fieldname, validation, valuemap) => {
    let sizev = json.val(conf, 'size', '75KB');
    let fsize = json.val(value, 'size', (1024 ** 4));
    let size = convert.to.bytes.init(sizev);

    if(fsize <= size){
        return mime.start(rval, value, validation, fieldname, valuemap);
        //return message.valid(rval, rval, 'image.limits.size');
    }else{
        return message.invalid(rval, rval, 'image.limits.size');
    }
}

const single = (rval, value, conf, fieldname, validation, valuemap) => {
    rval = min(rval, value, conf, fieldname);

    if(rval.valid){
        rval = max(rval, value, conf, fieldname)
    }

    if(rval.valid){
        rval = size(rval, value[0], conf, fieldname, validation, valuemap);
    }

    return rval;
}

const multiple = (rval, value, conf, fieldname, validation, valuemap) => {
    rval = min(rval, value, conf, fieldname);

    if(rval.valid){
        rval = max(rval, value, conf, fieldname);
    }

    if(rval.valid){
        for(const a in value){
            let index = parseInt(a);
            let ivalid = size(json.copy(rval), value[a], conf, fieldname, validation, valuemap);

            if(!ivalid.valid){
                let message = json.val(ivalid, 'message', '');

                if(message){
                    rval = json.set(rval, `docs.${fieldname}.${index}`, message, false, true);
                }

                if(rval.valid){
                    rval.error = true;
                    rval.valid = false;
                }
            }
        }
    };

    return rval;
}

const start = (rval, value, conf, fieldname, validation, valuemap) => {
    let maxv = json.val(conf, 'max', 1);
    let minv = json.val(conf, 'min', 0);

    if(minv > maxv){
        minv = maxv;
    }

    if(minv && maxv > 1){
        rval = multiple(rval, value, conf, fieldname, validation, valuemap);
    }else{
        if(minv && maxv){
            rval = single(rval, value, conf, fieldname, validation, valuemap);
        }
    }

    return rval;
}

exports.start = start;