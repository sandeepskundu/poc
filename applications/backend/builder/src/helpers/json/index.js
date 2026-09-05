const dT = require('./../data/type');
const dmerge = require('deepmerge');

const merge = (o, o2) => {
    const cm = (t, s, o) => {
        /*--const destination = target.slice()
           
              source.forEach((item, index) => {
                  if (typeof destination[index] === 'undefined') {
                      destination[index] = options.cloneUnlessOtherwiseSpecified(item, options)
                  } else if (options.isMergeableObject(item)) {
                      destination[index] = merge(target[index], item, options)
                  } else if (target.indexOf(item) === -1) {
                      destination.push(item)
                  }
              })
              return destination--*/
  
        return s;
    };
  
    return dmerge(o, o2, { arrayMerge: cm });
}

const length = (arg) => {
	return Object.keys(arg).length;
}

const copy = (arg) => {
	return extend({}, {}, arg);
}

const empty = (arg) => {
	let len = length(arg);

	return (len > 0) ? false : true;
}

const extend = function (arg) {
	let src = [].slice.call(arguments, 1);
		src.forEach((src) => {
			for (let p in src) {
				arg[p] = src[p];
			}
		});
    return arg;
}

const defined = (arg, map, fb) => {
	let rval = '_x_aio_x_undefined_x_aio_x_';
	if(arg && (map || map === '')){
		let smap = map.split('.');
			rval = arg;

		for(let a in smap){
			const key = smap[a];
            if(typeof rval[key] != 'undefined'){
                rval = rval[key];
            }else{
                rval = '_x_aio_x_undefined_x_aio_x_';
                break; 
            }
		}
	};

	if(typeof fb != 'undefined' && rval === '_x_aio_x_undefined_x_aio_x_'){
        return fb;
    }

    if(rval === '_x_aio_x_undefined_x_aio_x_'){
        return null
    }

	return rval;
}

const value = (arg, map, fb, def) => {
    if(!def && (fb || !fb)){
        return defined(arg, map, fb)
    }else{
        let rval = false;
        if(arg && (map || map === '')){
            let smap = map.split('.');
                rval = arg;

            for(let a in smap){
                const key = smap[a];
                if(rval[key] || rval[key] === 0){
                    rval = rval[key];
                }else{
                    rval = false;
                    break;
                }
            }
        };

        if(typeof fb != 'undefined'){
            if(!rval){
                return fb;
            }
        };

        return rval;
    }
}

const temp = (sMap, temp, rValue, value) => {
    let len = sMap.length;

    for (let i = 0; i < len; i++) {
      	let elem = sMap[i];
		if (i === len - 1) {
			temp[i] = value;
		} else {
			temp[i] = rValue[elem] ? rValue[elem] : {};
		}
    }

    return temp;
}

const getRval = (sMap, temp, rVal) => {
    let len = sMap.length;
    for (let i = len; i > 0; i--) {
		let c = i - 1;
		if (i === len) {
			rVal[sMap[c]] = temp[c];
		} else {
			rVal[sMap[c]] = {};
			rVal[sMap[c]][sMap[c + 1]] = rVal[sMap[c + 1]];
			delete rVal[sMap[c + 1]];
		}
    }
    return rVal;
}

const set = (arg, map, value, valMap, skipValCheck) => {
    let t = {}, rv = {};
    let rval = arg ? arg : {};

    if(valMap) {
    	value = value(value, valMap, false);
    }

    if (map && (skipValCheck || value || value === '' || value === 0)) {
      	let sMap = map.split('.');
			t = temp(sMap, t, rval, value);
			rv = getRval(sMap, t, rv);
    }
    return merge(rval, rv);
};

const tabFormat = (n) => {
    let rv = ``;

    if(n > 0){
        for(let a = 0; a<n; a++){
            rv += `\t`;
        }
    }

    return rv;
}

const getArray = (arr, tn) => {
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
                case 'object':
                    rv.push(`{\n${prepair(``, value, tn+1)}\n${tabFormat(tn+1)}}`)
                break;
                default:  
                    rv.push(value)
            }
        }
    }
    return `[${rv.join(', ')}]`
}

const defineJsonValueByType = (value, tn) => {
    let kv = '';
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
                kv = getArray(value, tn);
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

const prepair = (rval, conf, tn) => {
    let rv = [];
    for(const a in conf){
        let v = ``;
        let type = dT.get(conf[a]);


        if(a.indexOf('___') === 0 && a.indexOf('____') != 0){
            let n = a.replaceAll('___', '')
                v = `${n}:${conf[a]}`
        }else{
            if(type === 'object'){
                v = `${a}:{\n${prepair(``, conf[a], tn+1)}\n${tabFormat(tn+1)}}`;
            }else{
                let kv = defineJsonValueByType(conf[a], tn);
                    v = `${a}:${kv}`;
            }
        }
        

        rv.push(`${tabFormat(tn+1)}${v}`); 
    }

    rval = `${rval}${rv.join(',\n')}`

    return rval;
}



const map = (data, dmap, fallback) => {
    const maps = dmap /*--|| {
        0:{
            from:"appName",
            setDefinedOnly:false,
            to:"appConfig.pathPrefix",
            fallback:"kududu"
        },
        1:{
            from:"appConfig.compress",
            setDefinedOnly:false,
            to:"test",
            fallback:{
                from:"appConfig.languages.pub",
                setDefinedOnly:false,
                fallback:{
                    from:"appConfig.alias.sksksks",
                    setDefinedOnly:false,
                    fallback:{
                        from:"appConfig.alias.sksksks",
                        setDefinedOnly:false,
                        fallback:{
                            from:"appConfig.chunksDomainPlaceholder_",
                            setDefinedOnly:false,
                            fallback:'AIO'
                        }
                    }
                }
            }
        }
    }--*/

    const mapValue = (rv, arg) => {
        if(arg?.from && arg?.to){
            const fv = value(rv, arg.from);
            const isFbString = dT.is(arg.fallback, 'string');
            const isFbObject = dT.is(arg.fallback, 'object');

            if(fv === null){
                if(isFbString){
                    rv = set(rv, arg.to, arg.fallback, false, true);
                }else{
                    if(isFbObject){
                        arg.fallback.to = arg.to;
                        rv = map(rv, arg.fallback, true);
                    }
                }
            }else{
                if(arg.setDefinedOnly){
                    rv = set(rv, arg.to, fv, false, true);
                }else{
                    if(fv){
                        rv = set(rv, arg.to, fv, false, true);
                    }else{
                        if(isFbString){
                            rv = set(rv, arg.to, arg.fallback, false, true);
                        }else{
                            if(isFbObject){
                                arg.fallback.to = arg.to;
                                rv = map(rv, arg.fallback, true);
                            }
                        }
                    }
                    
                } 
            }
        }
        return rv;
    }

    if(fallback){
        data = mapValue(data, maps);
    }else{
        for(const a in maps){
            data = mapValue(data, maps[a]);
        }
    }

    return data;
}

const remove = (arg, map) => {;
    if (!arg || !map) {
        return;
    }
  
    if (typeof map === 'string') {
        map = map.split('.');
    }
  
    for (var i = 0; i < map.length - 1; i++) {
        arg = arg[map[i]];
        if (typeof arg === 'undefined') {
            return;
        }
    }

    delete arg[map.pop()];
};

exports.map = map;
exports.set = set;
exports.get = value;
exports.val = value;
exports.copy = copy;
exports.empty = empty;
exports.merge = merge;
exports.remove = remove;
exports.tab = tabFormat;
exports.extend = extend;
exports.length = length;
exports.defined = defined;
exports.prepair = prepair;