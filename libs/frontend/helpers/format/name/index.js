const json = require('./../../json');
const string = require('./../../string');
const dType = require('./../../data/type');

const title = (arg) => {
    let t = json.val(arg, 'title', '');
        t = string.remove.dot(t);
        t = string.transform.lowercase(t);
        t = string.transform.camelize(t);
        t = string.remove.space(t)

    if(t){
        return `${t}.`
    }else{
        return ''
    }
}

const n = (arg, a, b) => {
    let t = json.val(arg, a, json.val(arg, b, ''));
        t = string.transform.lowercase(t);
        t = string.transform.camelize(t);
        return string.remove.space(t)
}

const fn = (arg) => {
    return n(arg, 'first', 'fn');
}

const ln = (arg) => {
    return n(arg, 'last', 'ln');
}

const mn = (arg) => {
    return n(arg, 'middle', 'mn');
}

const fbv = (val) => {
    return val || 'NA'
}

const validate = (val) => {
    let v = string.remove.space(val);

    return v?val:''
}

const full = (arg, fb) => {
    let rval = [title(arg), fn(arg), mn(arg), ln(arg)];
        rval = validate(rval.join(' '));
    
    return rval || fbv(fb);
}

const initialFromString = (arg, fb) => {
    if(arg){
        let rv = [];
            arg = string.remove.multiSpace(arg);

        if(arg){
            let split = arg.split(' ');

            if(split.length === 1){
                split.push(split[0])
            }

            for(let a in split){
                if(split[a]){
                    rv.push(split[a].charAt(0));
                    if(rv.length > 1){
                        break;
                    }
                }
            }

            if(rv.length === 1){
                rv.push(rv[0]);
            }

            rv = validate(rv.join(' '));
            rv = string.remove.space(rv);
            
            return rv || fbv(fb);
        }
    }else{
        return fbv(fb);
    }
}

const initial = (arg, fb) => {
    let rval = '';
    let isobj = dType.isObject(arg);

    if(isobj){
        let rv = [];
        let map = [fn(arg), ln(arg), mn(arg)];

        for(const a in map){
            if(map[a]){
                rv.push(map[a].charAt(0))
            }

            if(rv.length === 2){
                break;
            }
        }

        rv = validate(rv.join(' '));
        rv = string.remove.space(rv);

        rval = rv || fbv(fb);
    }else{
        let isStr = dType.isString(arg);

        if(isStr){
            rval = initialFromString(arg, fb)
        }else{
            rval = fbv(fb);
        }
    }

    return string.transform.uppercase(rval);
}

exports.full = full;
exports.initial = initial;