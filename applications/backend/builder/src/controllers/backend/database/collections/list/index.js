const merchant = require('./merchant');
const apiSchema = require('./api-schema');
const collection = require('./collections');
const appDetails = require('./app-details');
const internalMasterData = require('./internal-master-data');

const list = {
    merchant:merchant,
    apiSchema:apiSchema,
    appDetails:appDetails,
    collections:collection,
    internalMasterData:internalMasterData
}

const start = async (config, req, res, next) => {
    const rval = [];
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