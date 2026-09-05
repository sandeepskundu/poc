const dhelpers = require('./../index');
const validator = require('./validator');

const format = (dt) => {
    return  dhelpers.format(dt, '_yyyy-_m-_d');
}

const range = (dt, range) => {
    return validator.init(format(dt), {
        between:{
            end:format(range.to),
            start:format(range.from)
        }
    })
}

exports.range = range;
exports.dob = require('./dob');