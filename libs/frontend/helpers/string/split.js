const dT = require('./../data/type');

const byCapital = (str) => {
    if(str && dT.is(str, 'string')){
        return str.split(/(?=[A-Z])/).filter(Boolean);
    }else{
        return []
    }
};

exports.byCapital = byCapital;