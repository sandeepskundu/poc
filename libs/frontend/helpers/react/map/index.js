const json = require('./../../json');

const data = (arg, map) => {
    let rv = arg;

    if(map) {
        rv = json.val(arg, map);
    }

    return Object.values(rv || {});
}

exports.data = data;