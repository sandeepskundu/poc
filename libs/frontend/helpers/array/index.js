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

exports.has = require('./has');
exports.toIndexJson = toIndexJson;
exports.removeDuplicate = removeDuplicate;