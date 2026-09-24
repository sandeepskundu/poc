const is = require('./is');
const schema = require('./schema');
const dT = require('./../data/type');
const random = require('./../random');
const dmerge = require('node-modules/deepmerge');

const rId = random.key();

const deepMerge = (target, source, seen = new WeakMap()) => {
    if(!source || typeof source !== "object"){
        return source;
    }

    if(seen.has(source)){
        return seen.get(source);
    }

    const result = Array.isArray(source)?[...(target || [])]:{...(target || {})};

    seen.set(source, result);

    for (const key of Object.keys(source)) {
        const value = source[key];

        if (value && typeof value === "object") {
            result[key] = deepMerge(result[key], value, seen);
        } else {
            // Functions, strings, numbers, booleans, etc.
            result[key] = value;
        }
    }

    return result;
}

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
	return Object.keys(arg || {}).length;
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
            if(rval && typeof rval[key] != 'undefined'){
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

const setByNodeList = (rval, map, val) => {
    if(dT.is(map, 'list') && typeof val != 'undefined'){
        let cur = rval || {};

        for (let i = 0; i < map.length - 1; i++) {
            const key = map[i];

            if (cur[key] === undefined || cur[key] === null) {
                cur[key] = {};
            }

            cur = cur[key];
        }

        cur[map[map.length - 1]] = val;
    };

    return rval;
}

const getval = (arg, vmap, fbval) => {
    return value(arg, vmap, fbval);
}

/*--
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

const getRval = (sMap, tval, rVal, value) => {
    let len = sMap.length;
    for (let i = len; i > 0; i--) {
		let c = i - 1;
		if (i === len) {
			rVal[sMap[c]] = tval[c];
		} else {
            if(sMap[c] === sMap[c+1]){
                if(i === (len-1)){
                    rVal[sMap[c]] = tval[c];
                    rVal[sMap[c]][sMap[c+1]] = tval[c+1];
                    break;
                }else{
                    let d = [...sMap];
                        d = d.slice(i);
                    let dv = tval[c] || {};
                    let t = temp(d, {}, dv, value);
                        rVal[sMap[c]] = getRval(d, t, dv, value)
                }
            }else{
                rVal[sMap[c]] = {};
			    rVal[sMap[c]][sMap[c+1]] = rVal[sMap[c + 1]];
                delete rVal[sMap[c + 1]];
            }
		}
    }
    return rVal;
}

const set = (arg, map, value, valMap, skipValCheck, nomerge) => {
    let t = {};
    let rv = {};
    let rval = arg ? arg : {};

    if(valMap) {
    	value = value(value, valMap, false);
    }

    if (map && (skipValCheck || value || value === '' || value === 0)) {
      	let sMap = map.split('.');
			t = temp(sMap, t, rval, value);
			rv = getRval(sMap, t, rv, value);
    }

    if(nomerge){
        return rv;
    }else{
        return merge(rval, rv);
    }
};--*/

const set = (arg, map, value, valMap, skipValCheck, nomerge) => {
    let rval = arg || {};

    if(typeof map != 'undefined' && typeof value != 'undefined'){
        let rv = {};

        if(dT.is(value, 'object') && (valMap && (dT.is(valMap, 'string')))){
            value = getval(value, valMap, rId)
        }


        if(dT.is(map, 'list') && map.length > 0){
            rv = setByNodeList(rv, map, value)
        }

        if(dT.is(map, 'string') && map.length > 0){
            rv = setByNodeList(rv, map.split('.'), value)   
        }

        if(nomerge){
            return rv;
        }else{
            return merge(rval, rv);
        }
    }

    return rval;
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

const getArray = (arr, tn, isApiSchema) => {
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
                    rv.push(getArray(value, tn))
                break;
                case 'string':
                    rv.push(`'${value || ''}'`)
                break;
                case 'object':
                    rv.push(`{\n${prepair(``, value, tn+1, isApiSchema)}\n${tabFormat(tn+1)}}`)
                break;
                default:  
                    rv.push(value)
            }
        }
    }
    return `[${rv.join(', ')}]`
}

const stringValues = (val, isApiSchema) => {
    if(val){
        if(val === ''){
            return `Date.now()`
        }else{
            if(isApiSchema){
                return `${val || ""}`
            }else{
                return `"${val || ""}"` //val; 
            }
        }
    }else{
        return `''`;
    }
}

const defineJsonValueByType = (value, tn, isApiSchema) => {
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
                kv = getArray(value, tn, isApiSchema);
            break;
            case 'string':
                kv = stringValues(value, isApiSchema);
            break;
            case 'null':
                kv = `null`;
            break;
            default:  
                kv = `"${value || ""}"`
        }
    }

    return kv;
}

const prepair = (rval, conf, tn, isApiSchema) => {
    let rv = [];
    for(const a in conf){
        let v = ``;
        let type = dT.get(conf[a]);

        if(isApiSchema && a.indexOf('___') === 0 && a.indexOf('____') != 0){
            let n = a.replaceAll('___', '')
                v = `${n}:${conf[a]}`
        }else{
            if(type === 'object'){
                v = `${a}:{\n${prepair(``, conf[a], tn+1, isApiSchema)}\n${tabFormat(tn+1)}}`;
            }else{
                let kv = defineJsonValueByType(conf[a], tn, isApiSchema);
                    v = `${a}:${kv}`;
            }
        }

        rv.push(`${tabFormat(tn+1)}${v}`); 
    }

    rval = `${rval}${rv.join(',\n')}`

    return rval;
}

const prepairApiSchema = (rval, conf, tn) => {
    return prepair(rval, conf, tn, true);
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

const keys = (arg) => (arg && typeof arg === 'object' ? Object.keys(arg) : []);
/*--
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
};--*/

const remove = (obj, path) => {
    if(!obj || typeof obj !== 'object' || !path) {
        return obj
    }

    let keys = Array.isArray(path)?[...path]:(typeof path === 'string')?path.split('.').filter(Boolean):[];

    if (keys.length === 0){
        return obj
    }

    let tk = keys.pop();
    let current = obj;

    for (let i = 0; i < keys.length; i++) {
        if (current === null || typeof current !== 'object' || !Object.prototype.hasOwnProperty.call(current, keys[i])){
            return obj
        }
        current = current[keys[i]];
    }

    if(current && typeof current === 'object'){
        if(Array.isArray(current) && !isNaN(tk)) {
            current.splice(Number(tk), 1);
        } else {
            delete current[tk];
        }
    }

    return obj;
};

const toList = (arg) => {
    const rval = [];
    const len = length(arg);

    if(len > 0){
        for(const a in arg){
            rval.push(arg[a]);
        }
    }

    return rval;
}

const allkeysList = (arg, p) => {
    let rval = [];
    let prefix = p || '';
    let isobj = dT.is(arg, 'object');
    let isarray = dT.is(arg, 'array');

    if (isarray) {
        arg.forEach((item, index) => {
            let path = `${prefix}.${index}`;
            let iscobj = dT.is(item, 'object');
            let iscarray = dT.is(item, 'array');

            if(!iscobj && !iscarray){
                rval.push(path);
            }

            if (iscobj || iscarray) {
                rval = rval.concat(allkeysList(item, path));
            }
        });
    } else if (isobj && !isarray) {
        for (let key in arg) {
            let item = arg[key];
            let iscobj = dT.is(item, 'object');
            let iscarray = dT.is(item, 'array');
            let path = prefix ? `${prefix}.${key}` : key;

            if (iscobj || iscarray) {
                if(iscobj){
                    let len = length(item);

                    if(len > 0){
                        rval = rval.concat(allkeysList(item, path));
                    }else{
                        rval.push(path);
                    }
                }else{
                     if(iscarray){
                        if(item.length > 0){
                            rval = rval.concat(allkeysList(item, path));
                        }else{
                            rval.push(path);
                        }
                    }
                }
            }else{
                rval.push(path);
            }
        }
    }

    return rval;
}

const allkeys = (arg, p) => {
    let rv = {};
    let prefix = p || ''
    let kl = allkeysList(arg, prefix);

    if(kl && kl.length > 0){
        for(let a in kl){
            rv[kl[a]] = true;
        }
    }

    return rv;
}

const valueFromMap = (data, item, conf, cbv) => {
    let rval = '';
    let current = conf;
    let dv = cbv || random.id(20);

    while (current) {
        let from = value(current, 'from');
        let map = value(current, 'map', dv);
        let fallback = value(current, 'fallback');

        if(from){
            if(from === 'random'){
                if(random[map] && dT.is(random[map], 'function')){
                    //rval = random[map]();
                    rval = random.number();
                }else{
                    rval = random.number();
                }
            }else{
                if(from === 'body-item'){
                    rval = value(item || {}, `${map}`, dv);
                }else{
                    rval = value(data || {}, `${from}.${map}`, dv);
                }
            }
        }else{
            rval = dv;
        }

        if(rval === dv){
            current = fallback;
        }else{
            current = null;
        }
    }

    if(cbv){
        return rval;
    }else{
        if(rval != dv){
            return rval
        }
    }

    return null;
}

const enums = (arg, paths = [], config = {}) => {
    const map = new Map();
    const dv = random.id(20);
    const conf = merge({
        node:'id',
        sort:false,
        mapnode:'id',
        regex:false,
        asstring:false,
        returnmap:false,
        onlyvalues:true,
    }, config);

    paths.forEach((path) => {
        const list = value(arg, path);
        if (Array.isArray(list)) {
            list.forEach((item) => {
                const key = value(item , conf.node, dv);
            
                if (key !== dv) {
                    map.set(key, conf.onlyvalues ? key : item);
                }
            });
        }
    });

    let result = Array.from(map.values());

    if(conf.asstring){
        return JSON.stringify(result)
    }

    if(conf.returnmap){
        return result.reduce((acc, val) => {
            let isobj = dT.is(val, 'object');
            let isstr = dT.is(val, 'string');

            if(isobj){
                let node = value(conf, 'mapnode', value(conf, 'node', 'id'));
                let ival = value(item, node, dv);

                if(ival != dv){
                    acc[ival] = val;
                }
            }else{
                if(isstr){
                    acc[val] = true
                }
            }
            
            return acc;
        }, {});
    }

    if(conf.regex){
        return `^(?:${result.join('|')})?$`
    }

    if (conf.sort) {
        result = result.sort((a, b) => {
            const aVal = conf.onlyvalues ? a : a[conf.node]?.toString().toLowerCase();
            const bVal = conf.onlyvalues ? b : b[conf.node]?.toString().toLowerCase();
            return aVal.localeCompare(bVal);
        });
    }

    return result;
}

const getByLength = (a1, a2, type) => {
    const a = a1 || {};
    const b = a2 || {};
    const [small, large] = Object.keys(a).length <= Object.keys(b).length?[a, b]:[b, a];

    if(type === 'l' || type === 'large'){
        return large;
    }else{
        return small;
    }
}

const hasAnyCommonKey = (a1, a2, skipValCheck) => {
    const a = a1 || {};
    const b = a2 || {};
    const [small, large] = Object.keys(a).length <= Object.keys(b).length?[a, b]:[b, a];

    for (const key in small) {
        if(skipValCheck){
            if (Object.prototype.hasOwnProperty.call(large, key)) {
                return true; // Found at least one common key
            }
        }else{
            if (Object.prototype.hasOwnProperty.call(large, key) && small[key] === large[key]) {
                return true; // Found at least one common key with same value
            }
        }
    }

    return false;
}

const indent = (arg, tb) => {
    if (!arg || typeof arg !== 'string') {
        return '';
    }

    try {
        return JSON.stringify(JSON.parse(arg), null, tb || 2);
    } catch (error) {
        return arg;
    }
}

const asProps = (arg, tb = 4) => {
    let len = length(arg);

    if(len > 0){
        let rv = ``;
        for(let a in arg){
            let i = arg[a];
            let typ = dT.get(i);

            switch (typ) {
                case 'jsx':
                
                break;
                case 'list':
                    
                break;
                case 'array':
                    
                break;
                case 'boolean':
                    rv = `${rv}\n${a}={${i}}`;
                break;
                case 'number':
                    rv = `${rv}\n${a}={${i}}`;
                break;
                case 'string':
                    rv = `${rv}\n${a}="${i}"`;
                break;
                case 'object':
                    rv = `${rv}\n${a}={${indent(JSON.stringify(i), tb)}}`;
                break;
                case 'function':
                    
                break;
                case 'null':
                    rv = `${rv}\n${a}={null}`;
                break;
                case 'regex':
                    
                break;
                case 'int':
                    rv = `${rv}\n${a}={${i}}`;
                break;
                default:
            }
        }

        return `${rv}`;
    }else{
        return ''
    }
}

const isEqual = (a, b) => {
    if(a === b){
        return true;
    }

    if(typeof a !== typeof b){
        return false;
    }
  
    if(a === null || b === null || typeof a !== 'object'){
        return false;
    }

    if(Array.isArray(a) && Array.isArray(b)){
        if (a.length !== b.length){
            return false;
        };

        return a.every((item, index) => isEqual(item, b[index]));
    }

    if (dT.is(a, 'object') && dT.is(b, 'object')) {
        const keysA = Object.keys(a);
        const keysB = Object.keys(b);

        if(keysA.length !== keysB.length){
            return false;
        };

        return keysA.every((key) => isEqual(a[key], b[key]));
    }

    return false;
};

const removeDuplicate = (targetObj, baseObj) => {
    if (!dT.is(targetObj, 'object') || !dT.is(baseObj, 'object')) {
        return targetObj;
    }

    const result = {};

    for (const key of Object.keys(targetObj)) {
        if (!(key in baseObj)) {
            result[key] = targetObj[key];
            continue;
        }

        const baseVal = baseObj[key];
        const targetVal = targetObj[key];

        if (dT.is(targetVal, 'object') && dT.is(baseVal, 'object')) {
            const nestedDiff = removeDuplicate(targetVal, baseVal);
            if (Object.keys(nestedDiff).length > 0) {
                result[key] = nestedDiff;
            }
        }else if (!isEqual(targetVal, baseVal)) {
            result[key] = targetVal;
        }
    }

    return result;
};


const sortByKeyName = (obj, config = {}) => {
    if(!obj || !dT.is(obj, 'object')){
        return {};
    }

    const {
        deep = false,
        order = 'asc'
    } = config;

    const orders = Object.keys(obj).sort((a, b) => {
        const comparison = a.localeCompare(b, undefined, {
            numeric:true,
            sensitivity:'base',
        });

        return order.toLowerCase() === 'desc' ? -comparison : comparison;
    });

    const rval = {};

    for (const key of orders) {
        const val = obj[key];
        if (deep && val !== null && dT.is(val, 'object')) {
            rval[key] = sortByKeyName(val, order, deep);
        } else {
            rval[key] = val;
        }
    }

    return rval;
};


const toIndexTree = (arg, config = {}) => {
    if(!arg || !dT.is(arg, 'object')){
        return {};
    }

    const root = {};
    const {
        nameKey = 'label',
        mapKey = 'nodemap',
        treeKey = 'treemap',
        valueKey = 'value',
        childsKey = 'childs',
        cloneKey = 'clone',
        sortDeep = true,
        sortOrder = 'asc',
        sortEnable = true
    } = config;

    if(sortEnable){
        arg = sortByKeyName(arg, {
            deep:sortDeep,
            order:sortOrder
        })
    }

    const getOrCreateChild = (container, segment, currentMapPath, parentTreeKey) => {
        for (const key of Object.keys(container)) {
            if (container[key][nameKey] === segment) {
                return container[key];
            }
        }

        const nextIndex = Object.keys(container).length;
        const currentTreeKey = parentTreeKey !== undefined && parentTreeKey !== ''?`${parentTreeKey}.${nextIndex}`:`${nextIndex}`;
        const newNode = {
            [nameKey]: segment,
            [mapKey]: currentMapPath,
            [treeKey]: currentTreeKey,
        };

        container[nextIndex] = newNode;
        return newNode;
    };

    for (const rawKey of Object.keys(arg)) {
        const cleanedKey = rawKey.replace(/[*"]/g, '').trim();
        if (!cleanedKey) continue;

        const segments = cleanedKey.split('.');
        let currentLevel = root;
        let accumulatedMapPath = '';
        let accumulatedTreeKey = '';

        segments.forEach((segment, index) => {
        accumulatedMapPath = accumulatedMapPath ? `${accumulatedMapPath}.${segment}` : segment;

        const node = getOrCreateChild(currentLevel, segment, accumulatedMapPath, accumulatedTreeKey);
        accumulatedTreeKey = node[treeKey];

        if (index === segments.length - 1) {
            node[valueKey] = arg[rawKey];
        } else {
            if (!node[childsKey]) {
                node[childsKey] = {};
            }
            currentLevel = node[childsKey];
        }
        });
    }

    return root;
};

const swapKeysAndValues = (obj, config = {}) => {
    if(!obj || !dT.is(obj, 'object')){
        return {};
    }

    const result = {};
    const {
        sortDeep = false,
        sortOrder = 'asc',
        sortEnable = true
    } = config;
    
    const isConvertible = (val) => {
        return ((typeof val === 'string' || typeof val === 'number' || typeof val === 'boolean') && val !== '' && val !== null && val !== undefined);
    };

    for (const [key, value] of Object.entries(obj)) {
        if (isConvertible(value)) {
            const newKey = String(value);
            if (!(newKey in result)) {
                result[newKey] = key;
            } else {
                result[key] = value;
            }
        } else {
            result[key] = value;
        }
    }

    if(sortEnable){
        return sortByKeyName(result, {
            deep:sortDeep,
            order:sortOrder
        })
    }

    return result;
};


const findNodeByValue = (tree, targetValue, config = {}) => {
    const { valueKey = 'value', childsKey = 'childs' } = config;

    if (!tree || typeof tree !== 'object') {
        return null;
    }

    const entries = Array.isArray(tree) ? tree : Object.values(tree);

    for (const node of entries) {
        if (!node || typeof node !== 'object') continue;

        if (valueKey in node && node[valueKey] === targetValue) {
            return node;
        }

        if (node[childsKey] && typeof node[childsKey] === 'object') {
            const found = findNodeByValue(node[childsKey], targetValue, config);
            if (found) {
                return found;
            }
        }
    }

    return null;
};


const add = (path, value, obj = {}) => {
    if (value === undefined) {
        return {
            data:obj,
            valid:false,
            code:'VALUE_UNDEFINED'
        }
    }

    if (typeof path !== 'string' || path.trim() === '') {
        return {
            data:obj,
            valid:false,
            code:'INVALID_PATH'
        }
    }

    let current = obj;
    let defined = true;
    let keys = path.split('.').filter(Boolean);
    
    if(keys.length === 0){ 
        return {
            data:obj,
            valid:true,
        };
    }

    for (let i = 0; i < keys.length; i++) {
        if(current !== null && typeof current === 'object' && Object.prototype.hasOwnProperty.call(current, keys[i])){
            current = current[keys[i]];
        } else {
            defined = false;
            break;
        }
    }
  
    if(defined && current !== undefined) {
        return {
            data:obj,
            valid:true,
        };
    }

    const immutalbe = (obj, i) => {
        const key = keys[i];

        if (i === keys.length - 1) {
            return {
                ...obj,
                [key]:value
            };
        };

        return {...obj, [key]:immutalbe((obj && typeof obj[key] === 'object' && obj[key] !== null ? obj[key]:{}), (i +1))};
    }

    return {
        valid:true,
        data:immutalbe(obj, 0)
    }; 
}

exports.is = is;
exports.map = map;
exports.set = set;
exports.add = add;
exports.keys = keys;
exports.get = value;
exports.val = value;
exports.copy = copy;
exports.enums = enums;
exports.empty = empty;
exports.merge = merge;
exports.toList = toList;
exports.remove = remove;
exports.tab = tabFormat;
exports.extend = extend;
exports.length = length;
exports.schema = schema;
exports.defined = defined;
exports.prepair = prepair;
exports.allkeys = allkeys;
exports.asProps = asProps;
exports.isEqual = isEqual;
exports.getByLength = getByLength;
exports.allkeysList = allkeysList;
exports.toIndexTree = toIndexTree;
exports.valueFromMap = valueFromMap;
exports.sortByKeyName = sortByKeyName;
exports.setByNodeList = setByNodeList;
exports.findNodeByValue = findNodeByValue;
exports.removeDuplicate = removeDuplicate;
exports.hasAnyCommonKey = hasAnyCommonKey;
exports.transform = require('./transform');
exports.prepairApiSchema = prepairApiSchema;
exports.swapKeysAndValues = swapKeysAndValues;