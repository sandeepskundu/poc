
let data = {};
const json = require('./../json');

const set = (map, arg) => { 
    if(map && arg){
        data = json.set(data, map, arg)
    }
}

const get = (map) => {
   return json.get(data, map, '')
}

exports.set = set;
exports.get = get;
exports.route = require('./route')