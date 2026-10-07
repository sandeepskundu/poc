const json = require('./../json');
const dT = require('./../data/type');

const removeDuplicate = (arg) => {
    if(arg && dT.is(arg, 'list') && arg.length > 0){
        return [...new Set(arg)]
    }else{
        return arg;
    }
}

const toIndexJson = (arr = [], config = {}) => {
    if(arr && dT.is(arr, 'list') && arr.length > 0){  

        const {
            indexKey = 'index',
            valueKey = 'value',
            valueToIndex = true
        } = config;

        return arr.reduce((acc, item, index) => {
            if(valueToIndex){
                acc[index] = item;
            }else{
                acc[index] = {
                    [valueKey]:item,
                    [indexKey]:index
                };
            };
    
            return acc;
        }, {});
    }else{
        return {};
    }
};

const sortByOrder = (arr, orders, options) => {
    if(options?.path){
    
        let pmap = new Map();
        let path = options?.path || 'type';

        orders.forEach((type, index) => {
            pmap.set(type, index);
        });

        const getType = typeof path === 'function'?path:(item) => {
            return json.get(item, path, '');
        };

        return [...arr].sort((a, b) => {
            const typeA = getType(a);
            const typeB = getType(b);

            const indexA = typeA && pmap.has(typeA) ? pmap.get(typeA) : Infinity;
            const indexB = typeB && pmap.has(typeB) ? pmap.get(typeB) : Infinity;

            if (indexA !== indexB) {
                return indexA - indexB;
            }

            const valA = typeA != null ? String(typeA) : '';
            const valB = typeB != null ? String(typeB) : '';

            if (!valA && valB){
                return 1;
            }

            if (valA && !valB) {
                return -1;
            }

            return valA.localeCompare(valB);
        });
    }

    return arr;
}

exports.has = require('./has');
exports.sortByOrder = sortByOrder;
exports.toIndexJson = toIndexJson;
exports.removeDuplicate = removeDuplicate;