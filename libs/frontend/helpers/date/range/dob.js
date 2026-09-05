const AGE_GROUPS = {
    age:{min:0, max:150, minday:0, maxday:-1},
    minor:{min:0, max:12, minday:0, maxday:-1}, // 0 to 12 years
    infant:{min:0, max:2, minday:0, maxday:-1}, // 0 to 2 years
    child:{min:2, max:12, minday:0, maxday:-1}, // 2 to 12 years
    adult:{min:12, max:60, minday:0, maxday:-1}, // 12 to 60 years
    major:{min:18, max:150, minday:0, maxday:-1}, // 18 to 150 years
    senior:{min:60, max:150, minday:0, maxday:-1} // 60 years and above    
};

const get = (dt, min, max, minday, maxday) => {
    let t = dt || new Date()
    let to = new Date(t);
    let from = new Date(t);
        to.setFullYear(to.getFullYear() - (min || 0));
        from.setFullYear(from.getFullYear() - (max || 150));

    if(minday){
        to.setDate(to.getDate() - minday);
    }

    if(maxday){
        from.setDate(from.getDate() - maxday);
    }

    return {
        to:to.toISOString().split('T')[0],
        from:from.toISOString().split('T')[0]
    };
}

const getByType = (dt, type) => {
    if(AGE_GROUPS[type]){
        return get(dt, AGE_GROUPS[type].min, AGE_GROUPS[type].max, AGE_GROUPS[type].minday, AGE_GROUPS[type].maxday)
    }else{
        return get(dt, AGE_GROUPS.age.min, AGE_GROUPS.age.max, AGE_GROUPS.age.minday, AGE_GROUPS.age.maxday)
    }
}

const group = (dt) => {
    let result = {};

    for (const a in AGE_GROUPS) {
        result[a] = get(dt, AGE_GROUPS[a].min, AGE_GROUPS[a].max, AGE_GROUPS[a].minday, AGE_GROUPS[a].maxday)
    }

    return result;
}

const rangeByConfig = (dt, conf) => {
    const input = {
        year: {
            min: { type: "plus", count: 20 },
            max: { type: "plus", count: 20 },
        },
        days: {
            min: { type: "minus", count: 20 },
            max: { type: "minus", count: 20 },
        },
    };

    const value = ({ type, count }) => (type === "plus"?-count:+count);
    const obj = {
        min:value(conf.year.min),
        max:value(conf.year.max),
        minday:value(conf.days.min),
        maxday:value(conf.days.max),
    };

    return get(dt, obj.min, obj.max, obj.minday, obj.maxday)
}

const age = (dt) => { return getByType(dt, 'age') }
const minor = (dt) => { return getByType(dt, 'minor') }
const major = (dt) => { return getByType(dt, 'major') }
const child = (dt) => { return getByType(dt, 'child') }
const adult = (dt) => { return getByType(dt, 'adult') }
const infant = (dt) => { return getByType(dt, 'infant') }
const seniors = (dt) => { return getByType(dt, 'senior') }

exports.age = age;
exports.get = get;
exports.minor = minor;
exports.group = group;
exports.adult = adult;
exports.child = child;
exports.major = major;
exports.infant = infant;
exports.seniors = seniors;
exports.getByType = getByType;
exports.rangeByConfig = rangeByConfig;