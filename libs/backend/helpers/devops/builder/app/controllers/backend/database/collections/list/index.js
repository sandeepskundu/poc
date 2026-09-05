const otp = require('./otps');
const merchant = require('./merchant');
const rateLimit = require('./rate-limit');
const iCounter = require('./index-counters');

const list = {
    merchant:merchant
}

const start = async (config, req, res, next) => {
    const rval = [iCounter, rateLimit, otp];
    const cols = req.helpers.json.val(config, 'appConfig.dbConfigs.defaultCollections', {});

    for(const a in cols){
        if(cols[a] && list[a]){
            rval.push(list[a]);
        }
    }

    return rval;
}

exports.list = list;
exports.start = start;