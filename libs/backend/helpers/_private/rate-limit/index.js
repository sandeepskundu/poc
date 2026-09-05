const response = require('./response');
const utils = process.aioBeLibs('helpers/_private/utils');
const colname = utils.constants.rateLimit.RATE_LIMIT_COLLECTION_NAME;
const collectionName = colname.toLowerCase();

const getIpHashId = async (configs, req, res) => {
    let ad = await req.helpers.session.auth.authDetails(req);
    let ip = await req.helpers.json.val(req, 'aioHd.ip', req.ip);
    let id = await req.helpers.json.val(ad, 'anonId', '');
    return req.helpers.crypto.md5(`${id}${ip}`);
}


const includeInHash = (rval, configs, req, res) => {
    const dv = req.helpers.random.id(20);
    const includes = req.helpers.json.val(configs, 'includeInHash', {});
    const valmap = req.helpers.express.validation.helpers.valuesmap(req, res, null);

    for(const a in includes){
        const val = req.helpers.json.valueFromMap(valmap, {}, includes[a], dv);

        if(val != dv){
            rval.push(val);
        }
    };

    return rval;
}

const getApiHashId = async (configs, req, res) => {
    const dv = req.helpers.random.uuid();
    const ipHash = await getIpHashId(configs, req, res);
    const hash = req.helpers.json.val(configs, 'hash', dv);
    const isStr = req.helpers.data.type.is(hash, 'string');

    if(hash && isStr && hash != dv){
        const list = await includeInHash([ipHash, hash], configs, req, res);

        return req.helpers.crypto.md5(`${list.join('')}`);
    }else{
        const params = req.helpers.json.val(req, 'params', {});
        const list = await includeInHash([
            req.helpers.json.val(params, 'balancer', ''),
            req.helpers.json.val(req, 'appConfig.appConfig.pathPrefix', ''),
            req.helpers.json.val(params, 'appController', ''),
            req.helpers.json.val(params, 'controllerAction', ''),
            req.helpers.json.val(params, 'actionVersion', ''),
            req.helpers.json.val(params, 'versionJob', ''),
            req.helpers.json.val(params, 'jobMethod', '')
        ], configs, req, res);


        return req.helpers.crypto.md5(`${ipHash}${list.join('')}`);
    }
}

const getApiHashWithIp = async (configs, req, res) => {
    const ipHash = await getIpHashId(configs, req, res);
    const apiHash = await getApiHashId(configs, req, res);
    return req.helpers.crypto.md5(`${ipHash}${apiHash}`);
}

const getHashId = async (type, configs, req, res) => {
    switch(type) {
        case 'ip':
            return getIpHashId(configs, req, res);
        break;
        case 'api':
            return getApiHashId(configs, req, res);
        break;
        case 'api-and-ip':
            return getApiHashWithIp(configs, req, res);
        break;
        default:
            return getApiHashWithIp(configs, req, res);
    }
}

const validate = async (configs, req, res, type) => {
    const conf = {
        BLOCK_WINDOWS:req.helpers.json.val(configs, 'blockWindows', [15, 60, 240, 720]), // Defines blocking windows means what will be blocking duration if user reaches to limtis.
        POST_BLOCK_THRESHOLD:req.helpers.json.val(configs, 'postBlockThreshold', 10), // Defines threshold for moving to next window if limit exceeds.
        LIMIT:{
            WINDOW:req.helpers.json.val(configs, 'limit.window', 15), // Defines the rate duration meane in what time max request can be served.
            MAX_REQUESTS:req.helpers.json.val(configs, 'limit.maxRequests', 5), // Max request of defined limit window.
        },
        QUOTA:{
            LIMIT:req.helpers.json.val(configs, 'quota.limit', 100), // Quota limit of maximum requests.
            TIME_DURATION:req.helpers.json.val(configs, 'quota.timeDurations', 1440) // Quota duration window.
        }
    }

    const BLOCK_WINDOWS = req.helpers.json.val(conf, 'BLOCK_WINDOWS', []);
    const QUOTA_TIME = req.helpers.json.val(conf, 'QUOTA.TIME_DURATION', 1440);

    if(QUOTA_TIME){
        BLOCK_WINDOWS.push(QUOTA_TIME)
    }

    if(collectionName && req.mdb && req.mdb.models && req.mdb.models[collectionName]){
        const model = req.mdb.models[collectionName];

        const now = new Date();
        const ip = req.helpers.json.val(req, 'aioHd.ip', req.ip);

        const doc = {
            ip:ip,
            hashId:await getHashId(type, configs, req, res),
        }

        let record = await model.findOne(doc);

        if (!record) {
            record = await model.create(doc);
        }

        record.timestamps = record.timestamps.filter((ts) => {return ((now - ts) < 24 * 60 * 60 * 1000)});

        if(record.timestamps.length >= conf.QUOTA.LIMIT) {
            return response.error(conf, req, 'QUOTA_LIMTI_REACHED', record);
        }else{
            record.timestamps.push(now);

            // If still blocked, increment post-block requests
            if (record.blockedUntil && record.blockedUntil > now) {
                record.postBlockRequestCount += 1;

                if(record.postBlockRequestCount >= conf.POST_BLOCK_THRESHOLD) {
                        record.violationCount += 1;
                    let blockMinutes = BLOCK_WINDOWS[Math.min(record.violationCount, BLOCK_WINDOWS.length - 1)];
                        record.postBlockRequestCount = 0;
                        record.blockedUntil = new Date(now.getTime() + blockMinutes * 60 * 1000);
                }

                await record.save();

                return response.error(conf, req, 'LIMTI_REACHED', record);
            }else{
                if(now - record.startWIndow < (conf.LIMIT.WINDOW * 60 * 1000)){
                    if(record.requestCount >= conf.LIMIT.MAX_REQUESTS) {
                            record.violationCount += 1;
                        let blockMinutes = BLOCK_WINDOWS[Math.min(record.violationCount - 1, BLOCK_WINDOWS.length - 1)];
                            record.blockedUntil = new Date(now.getTime() + blockMinutes * 60 * 1000);
                            record.postBlockRequestCount = 0;
                            record.requestCount = 0;
                            record.startWIndow = now;
                    }else{
                        record.requestCount += 1;
                    }
                }else{
                    record.requestCount = 1;
                    record.startWIndow = now;
                }

                await record.save();
                
                return response.sucess(conf, req);
            }
        }
    }

    return response.error(conf, req, 'CONFIGURATION_NOT_MAPPED');;
}

exports.validate = validate;