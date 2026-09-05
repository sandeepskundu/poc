const suffix =  (num) => {
    if(num == undefined || num == ''){
        return '';
    }

    let dmn = '';
    let count = 0;
    let r = Number(num);

    if (r >= 1000000000) {
        dmn = 'B';
        count = r / 1000000000;
    } else if (r >= 1000000) {
        dmn = 'M';
        count = r / 1000000;
    } else if (r >= 1000) {
        dmn = 'K';
        count = r / 1000;
    } else {
        count = r;
    }

    if (Math.floor(count) == count) {
        return Math.trunc(count) + dmn;
    }

    return count.toFixed(2) + dmn;
}

exports.suffix = suffix;