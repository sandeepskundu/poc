const timestamp = require('./timestamp');
const noOfDaysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const configs = {
    days:{
        short:['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'],
        long:['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    },
    months:{
        short:['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        long:['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    },
    agoLabels:{
        "day":"Day ago",
        "days":"Days ago",
        "hour":"Hour ago",
        "hours":"Hours ago",
        "minute":'Minute ago',
        "minutes":'Minutes ago',
        "second":"Second ago",
        "seconds":"Seconds ago",
    }
}

const addZero = (num) => {
    return (num >= 0 && num < 10) ? '0' + num : num;
}

const amOrPm = (dt) => {
    return (dt.getHours() > 11 ? 'pm' : 'am')
}

const format = (d, ft, lang) => {
    let rval = '';
    let dt = parse(d);
    let valid = isDate(dt);
    let ftype = ft || '_yyyy-_m-_d';

    if(valid) {
        let amPm = amOrPm(dt);
        let hour = dt.getHours();
        let list = [
            {'_yyyy':dt.getFullYear()}, //Year like 2024
            {'_YYYY':dt.getFullYear()}, //Year like 2024
            {'_dddd':configs.days.long[dt.getDay()]}, // Ex. Sunday
            {'_DDDD':configs.days.long[dt.getDay()].toUpperCase()}, // Ex. SUNDAY
            {'_mmm':configs.months.long[dt.getMonth()]}, // Ex. January
            {'_MMM':configs.months.long[dt.getMonth()].toUpperCase()}, // Ex. JANUARY
            {'_ms':dt.getMilliseconds()},
            {'_MS':dt.getMilliseconds()},
            {'_yy':dt.getFullYear().toString().substr(-2)}, // Year like 24
            {'_YY':dt.getFullYear().toString().substr(-2)}, // Year like 24
            {'_mm':configs.months.short[dt.getMonth()]}, // Ex. Jan
            {'_MM':configs.months.short[dt.getMonth()].toUpperCase()}, // Ex. JAN
            {'_HR':hour}, // Ex. 23
            {'_hr':(hour <= 12 ? hour : (hour - 12))}, // Ex. 11
            {'_MIN':dt.getMinutes()}, //Ex. 20
            {'_min':dt.getMinutes()}, //Ex. 20
            {'_SEC':dt.getSeconds()}, //Ex. 20
            {'_sec':dt.getSeconds()}, //Ex. 20
            {'_dd':configs.days.short[dt.getDay()]}, //Ex. Sun
            {'_DD':configs.days.short[dt.getDay()].toUpperCase()}, // Ex. SUN
            {'_p':amPm}, // Ex. am/pm
            {'_P':amPm.toUpperCase()}, // Ex. AM/PM
            {'_m': dt.getMonth() + 1}, // Ex. 11
            {'_M': dt.getMonth() + 1}, // Ex. 11
            {'_d': dt.getDate()}, // Ex. 15
            {'_D': dt.getDate()} // Ex. 15
        ]

        for(const a in list) {
            for(const b in list[a]){
                ftype = ftype.replace(new RegExp(b, 'g'), addZero(list[a][b]));
            }
        }

        rval = ftype 
    }

    return rval;
}

const isDate = (dt) => {
    return (((dt instanceof Date) ? dt : new Date(dt)) != 'Invalid Date');
}

const today = () => {
    return new Date();
}

const parse = (dt) => {
    if(dt instanceof Date){
        return dt;
    }else{
        if(typeof dt != 'number'){
            dt = dt.replace(new RegExp('-', 'g'), "");

            if(dt && dt.length === 8){
                dt = dt.replace(new RegExp('(.{4})(.{2})(.{2})'), '$1-$2-$3');   
            }
        }
        return new Date(dt)
    }
}

const toDate = (dt) => {
    const date = parse(dt);
    const valid = isDate(date);
    return (valid ? date : new Date())
}

const expireAt = (dt) => {
    const date = parse(dt);
    const valid = isDate(date);

    if(valid){
        return new Date(`${format(date)}:23:59:59`).getTime();
    }else{
        return 
    }
}

const ahead = (nd, dt) => {
    let date = toDate(dt);
        date.setDate(date.getDate() + (nd || 0));
    return date;
}

const bheind = (nd, dt) => {
    let date = toDate(dt);
        date.setDate(date.getDate() - (nd || 0));
    return date;
}

const breakup = (d) => {
    let dt = toDate(d);
    return {
        day:dt.getDay(),
        date:dt.getDate(),
        month:dt.getMonth(),
        year:dt.getFullYear()
    }
}

const isLeap = (d) => {
    let dt = toDate(d);
    let year = dt.getFullYear();

    return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
}

const daysInMonth = (d) => {
    let dt = toDate(d);
    let m = dt.getMonth();
    if(m != 1){
        return noOfDaysInMonth[m]
    }else{
        let leap = isLeap(d);
        return (leap?29:28);
    }
}

const resetTime  = (dt) => {
    let d = toDate(dt);
        d.setHours(0)
        d.setMinutes(0)
        d.setSeconds(0)
        d.setMilliseconds(0)

    return d;
};

const daysDiff = (d1, d2) => {
    let dt1 = toDate(d1);
    let dt2 = toDate(d2);
        dt1 = resetTime(dt1);
        dt2 = resetTime(dt2);
    return Math.floor(((dt2 - dt1)/86400000));
}

const msToMin = (ms) => {
    return Math.floor((ms/(1000*60)));
}

const minToMh = (min) => {
    let rval = [];
    let m = (min%60)
    let h = Math.floor(min/60);

    if(h < 10){
        h = ('0'+h)
    }

    if(m < 10){
        m = ('0'+m);
    }

    if(h){
        rval.push((h+'h'))
    }

    if(m){
        rval.push((m+'m'))
    }

    return (rval.join(' '))
}

const minDiffInDates = (d1, d2) => {
    return msToMin((toDate(d2) - toDate(d1)));
}

const getAgoLabel = (count, type) => {
    const t = (count > 1 ? `${type}s`:type);
    return `${count} ${configs.agoLabels[t]}`
}

const agoLabel = (dt, lang) => {
    let rval = ' ';
    let date = parse(dt);
    let valid = isDate(date);

    if(valid){
        let td = today();
        if (td.getTime() < date.getTime()) {
            return ''
        }else{
            let diff = Math.abs(td.getTime() - date.getTime()); // in milliseconds
                diff = (diff / 1000); //in seconds;

            if(diff < 60) {
                rval = getAgoLabel(parseInt(diff), 'second');
            }else{
                diff = (diff/60) // in minutes;

                if (diff <= 28800) {
                    if (diff < 60) {
                        rval = getAgoLabel(parseInt(diff), 'minute');
                    } else if (diff < 1440) {
                        rval = getAgoLabel(Math.floor(diff / 60), 'hour');
                    } else if (diff <= 28800) {
                        rval = getAgoLabel(Math.floor(diff / (60 * 24)), 'day');
                    }
                } else {
                    rval = `${configs.months.short[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
                }
            }
        }
    }
    
    return rval;
}


exports.today = today;
exports.parse = parse;
exports.ahead = ahead;
exports.bheind = bheind;
exports.format = format;
exports.toDate = toDate;
exports.isDate = isDate;
exports.isLeap = isLeap;
exports.msToMin = msToMin;
exports.breakup = breakup;
exports.minToMh = minToMh;
exports.daysDiff = daysDiff;
exports.expireAt = expireAt;
exports.agoLabel = agoLabel;
exports.resetTime = resetTime;
exports.daysInMonth = daysInMonth;
exports.valueIn = timestamp.valueIn;
exports.minDiffInDates = minDiffInDates;
exports.timestamp = timestamp;