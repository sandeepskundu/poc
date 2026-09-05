const  get = (start, end) => {
    let et = end || Date.now();
    let st = start || Date.now();
    let msd = et - st; //difference in milliseconds

    if(msd < 0){
        msd = 0;
    }

    return {
        MS:msd,
        SEC:Math.floor(msd / 1000),
        MIN:Math.floor(msd / (1000 * 60)),
        HUR:Math.floor(msd / (1000 * 60 * 60)),
        DAY:Math.floor(msd / (1000 * 60 * 60 * 24)),
        YER:Math.floor(msd / (1000 * 60 * 60 * 24 * 365)),
    }
}

const byType = (start, end, type) => {
    const obj = get(start, end);

    if(obj[type] > -1){
        return obj[type];
    }else{
        return obj;
    }
}

exports.get = get;
exports.byType = byType;