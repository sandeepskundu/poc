const json = require('./../../json');

const parseDate = (str, format) => {
    if (format === 'dd-mm-yyyy') {
        const [d, m, y] = str.split('-').map(Number);
        return new Date(y, m - 1, d);
    } else {
        const [y, m, d] = str.split('-').map(Number);
        return new Date(y, m - 1, d);
    }
}

const init = (date, configs) => {
    let conf = json.merge({
        after:null, // {years: n, months: n, days: n}
        before:null, // {years: n, months: n, days: n}
        format:'yyyy-mm-dd',
        between:{
            end:'1920-01-01',
            start:'1920-01-01'
        }
    }, configs);

    let today = new Date();
    let idate = parseDate(date, conf.format);
        today.setHours(0, 0, 0, 0);


    if (conf.between) {
        let sdate = parseDate(conf.between.start, conf.format);
        let edate = parseDate(conf.between.end, conf.format);

        if (idate < sdate || idate > edate) {
            return false;
        }
    }

    if (conf.before) {
        let pdate = new Date(today);

        if(conf.before.years){
            pdate.setFullYear(pdate.getFullYear() - conf.before.years);
        }

        if(conf.before.months){
            pdate.setMonth(pdate.getMonth() - conf.before.months);
        }

        if(conf.before.days){
            pdate.setDate(pdate.getDate() - conf.before.days);
        }

        if(idate > pdate) {
            return false;
        }
    }

    if (conf.after) {
        let fdate = new Date(today);

        if(conf.after.years){
            fdate.setFullYear(fdate.getFullYear() + conf.after.years);
        }

        if(conf.after.months){
            fdate.setMonth(fdate.getMonth() + conf.after.months);
        }

        if(conf.after.days){
            fdate.setDate(fdate.getDate() + conf.after.days);
        }

        if (idate < fdate){
            return false;
        }
    }

    return true;
}

exports.init = init;