const enums = ['S', 'M', 'H', 'D', 'Y'];

const validate = (val) => {
    return new RegExp(`(.*[${enums.join('|')}])$`).test(val);
}

const isvaild = (ts) => {
    return (new Date(ts)).getTime() > 0;
};

const parse = (arg) => {
    for(const a in enums){
        arg = arg.replace(new RegExp(`${enums[a].toLowerCase()}+`, 'g'), enums[a].toUpperCase());
        arg = arg.replace(new RegExp(`${enums[a].toUpperCase()}+`, 'g'), enums[a].toUpperCase());
    }

    return arg;
}

const toms = (arg) => {
    let rv = 0;
    let val = arg.value || 0;
    let type = arg.type;

    switch(type) {
        case 'S':
            rv = (val * 1000)
        break;
        case 'M':
            rv = (val * 60 * 1000)
        break;
        case 'H':
            rv = (val * 60 * 60 * 1000)
        break;
        case 'D':
            rv = (val * 60 * 60 * 1000 * 24)
        break;
        case 'Y':
            rv = (val * 60 * 60 * 1000 * 24 * 365)
        break;
        default:

    }

    return rv;
}

const toSec = () => {
    
}

const value = (val) => {
    let type = null;
    let rval = false;

    for(const a in enums){
        if(val.indexOf(enums[a]) === (val.length-1)){
            type = enums[a];
            rval = val.replace(new RegExp(enums[a], 'g'), '');
            break;
        }
    }

    if(rval){
        try{
            rval = parseInt(rval)
        }catch(err) {
            rval = 0;
        }
    }

    return toms({
        type:type,
        value:rval
    });
}

const ahead = (arg, tsv) => {
    const val = parse(arg);
    const valid = validate(val);
    const ts = tsv || Date.now();

    if(valid){
        return (ts+value(val))
    }else{
        return ts;
    }
}

const valueIn = (val, type) => {
    let rv = '';
        val = value(val);

    switch(type) {
        case 'MS':
            rv = val
        break;
        case 'MIN':
            rv = (val/(60 * 1000))
        break;
        case 'HUR':
            rv = (val/(60 * 60 * 1000))
        break;
        case 'DAY':
            rv = (val/(60 * 60 * 1000 * 24))
        break;
        case 'YER':
            rv = (val/(60 * 60 * 1000 * 24 * 365))
        break;
        default:
            rv = (val / 1000);
    }

    return rv;
}

exports.ahead = ahead;
exports.valueIn = valueIn;
exports.isvaild = isvaild;
exports.diff = require('./diff');