
const json = require('./../../json');
const datamaker = require('./data-maker');

const base = {
    "request":{
        cache:{},
        options:{},
        request:{
            url:'http://localhost:1300/cdn/gUtilsApi/health'
        }
    }
}

const getConfig = (bconf, config) => {
    return json.merge(base, bconf);
}


const dmaker = (res, config, arg) => {
    return datamaker.start(res, config, arg);
}


exports.dmaker = dmaker;
exports.getConfig = getConfig;