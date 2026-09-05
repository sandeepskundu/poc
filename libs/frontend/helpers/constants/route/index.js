const json = require('./../../json');
const constants = require('./../index');

const set = (arg) => {
    let copy = json.copy(arg);
    let map = (`routes.${arg.prop.category}.${arg.prop.page}`);
        delete copy.path;
        delete copy.view;
        constants.set(map, copy);
}

const get = (map) => {
    if(map){
        return constants.get(`routes.${map}`);
    }else{
        return ''
    }
}

exports.get = get;
exports.set = set;