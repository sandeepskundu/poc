const dT = require('./../data/type');
const tabFormat = (n) => {
    let rv = ``;

    if(n > 0){
        for(let a = 0; a<n; a++){
            rv += `\t`;
        }
    }

    return rv;
}
const defineJsonValueByType = (value, fb) => {
    let kv = '""';
    const type = dT.get(value);
    if(type){
        switch(type) {
            case 'boolean':
                kv = value;
            break;
            case 'number':
                kv = value;
            break;
            case 'array':
                kv = getArray(value);
            break;
            case 'string':
                kv = `"${value || ""}"`
            break;
            default:  
                kv = `"${value || ""}"`
        }
    }

    return kv;
}

const getArray = (arr) => {
    let rv = [];

    for(const a in arr){
        let value = arr[a];
        const type = dT.get(value);
        if(type){
            switch(type) {
                case 'boolean':
                    rv.push(value)
                break;
                case 'number':
                    rv.push(value)
                break;
                case 'array':
                    rv.push(getArray(value))
                break;
                case 'string':
                    rv.push(`'${value || ''}'`)
                break;
                default:  
                    rv.push(value)
            }
        }
    }
    return `(${rv.join(', ')})`
}

const prepair = (rval, conf, tn) => {
    let rv = [];
    for(const a in conf){
        let v = ``;
        let item = conf[a];
        let type = dT.get(conf[a]);
        if(conf.type != 'number-list' && type === 'object'){
            v = `${a}:(\n${prepair(``, item, tn+1)}\n${tabFormat(tn+1)})`;
        }else{
            if(conf.type != 'number-list' && type === 'array'){
                for(const b in item){
                    v = prepair(`${[a]}:(\n${prepair(``, item[b], tn+1)}\n${tabFormat(tn+1)})`);
                }
            }else{
                if(conf.type === 'number-list'){
                    if(a === 'list'){
                        let lv = [];
                        if(item.length > 0){
                            for(const c in item){
                                lv.push(item[c]);
                            }
                        }

                        v = `${a}:(${lv.join(', ')})`;
                    }else{
                        v = `${a}:${defineJsonValueByType(item)}`;
                    }
                }else{
                    v = `${a}:${defineJsonValueByType(item)}`;
                }
            }
        }

        rv.push(`${tabFormat(tn+1)}${v}`); 
    }

    rval = `${rval}${rv.join(',\n')}`

    return rval;
}

exports.prepair = prepair;