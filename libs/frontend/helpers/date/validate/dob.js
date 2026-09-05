const dob = require('./../range/dob');
const dhelpers = require('./../index');
const validator = require('./validator');

const map = {
    age:true,
    minor:true,
    child:true,
    adult:true,
    major:true,
    senior:true,
    infant:true,
}

const byType = (dt, type, from) => {
    let date = dhelpers.format(dt, '_yyyy-_m-_d');
    let today = dhelpers.format(from || new Date(), '_yyyy-_m-_d'); 
    let range = dob.getByType(today, type);

    return validator.init(date, {
        between:{
            end:range.to,
            start:range.from
        }
    })
};

const age = (dt, from) => { return byType(dt, 'age', from) }

const child = (dt, from) => { return byType(dt, 'child', from) }

const minor = (dt, from) => { return byType(dt, 'minor', from) }

const adult = (dt, from) => { return byType(dt, 'adult', from) }

const major = (dt, from) => { return byType(dt, 'major', from) }

const infant = (dt, from) => { return byType(dt, 'infant', from) }

const seniors = (dt, from) => { return byType(dt, 'senior', from) }

const group = (arg, from) => {
    let rval = {};

    for(const a in arg){
        if(map[a]){
            rval[a] = byType(arg[a], a, from);
        }else{
            rval[a] = false;
        }
    }

    return rval;
}

exports.age = age;
exports.minor = minor;
exports.group = group;
exports.adult = adult;
exports.child = child;
exports.major = major;
exports.infant = infant;
exports.seniors = seniors;