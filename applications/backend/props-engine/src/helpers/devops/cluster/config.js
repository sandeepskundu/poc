const constants = require('./../constants');

const config = {
    redisPub: null,
    redisSub: null,
    onControlSignal: null,
    redisSubscribed: false,
    enableChangeStreams: true,
    useRedis: constants.MAP.DEFAULT_REDIS_ENABLED, // Default false (OFF) -> uses MongoDB-Native Cluster Mode
    clusterMode: constants.MAP.CLUSTER_MODES.MONGO,
    redisChannel: constants.MAP.DEFAULT_REDIS_CHANNEL,
    clusterPollIntervalMs: constants.MAP.DEFAULT_CLUSTER_POLL_MS,
    redisControlChannel: `${constants.MAP.DEFAULT_REDIS_CHANNEL}:control`
};

const get = async (req, res) => {
    return {
        useRedis: config.useRedis,
        clusterMode: config.clusterMode,
        redisChannel: config.redisChannel,
        hasRedisPub: Boolean(config.redisPub),
        hasRedisSub: Boolean(config.redisSub),
        redisControlChannel: config.redisControlChannel,
        enableChangeStreams: config.enableChangeStreams,
        clusterPollIntervalMs: config.clusterPollIntervalMs,
        redisConnected: Boolean(config.useRedis && config.redisPub && config.redisSub)
    }
}

const setval = async (req, name, fb) => {
    let dval = req.helpers.random.id();
    let val = req.helpers.json.get(req.body || {}, name, dval);

    if(val != dval){
        config = helpers.json.set(config, name, val);
    }else{
        if(typeof fb != 'undefined'){
            config = helpers.json.set(config, name, fb);
        }
    }

    
}

const set = async (req, res) => {
    await setval(req, 'useRedis');
    await setval(req, 'clusterPollIntervalMs');
    await setval(req, 'clusterMode', (config.useRedis?constants.MAP.CLUSTER_MODES.REDIS : constants.MAP.CLUSTER_MODES.MONGO))

    if (options.enableChangeStreams !== undefined) {
        clusterConfig.enableChangeStreams = Boolean(options.enableChangeStreams);
    }
    if (options.redisChannel) {
        clusterConfig.redisChannel = String(options.redisChannel);
        clusterConfig.redisControlChannel = options.redisControlChannel
            ? String(options.redisControlChannel)
            : `${clusterConfig.redisChannel}:control`;
    }
    if (options.redisControlChannel) {
        clusterConfig.redisControlChannel = String(options.redisControlChannel);
    }
    if (options.redisPub !== undefined) {
        clusterConfig.redisPub = options.redisPub;
    }
    if (options.redisSub !== undefined) {
        clusterConfig.redisSub = options.redisSub;
        clusterConfig.redisSubscribed = false;
    }
    if (typeof options.onControlSignal === 'function') {
        clusterConfig.onControlSignal = options.onControlSignal;
    }

    if (clusterConfig.useRedis && clusterConfig.redisSub && !clusterConfig.redisSubscribed) {
        clusterConfig.redisSubscribed = true;
        const sub = clusterConfig.redisSub;
        const evtChan = clusterConfig.redisChannel;
        const ctrlChan = clusterConfig.redisControlChannel;

        if (typeof sub.on === 'function') {
            sub.on('message', (chan, msg) => {
                handleIncomingRedisMessage(chan, msg);
            });
        }

        if (typeof sub.subscribe === 'function') {
            try {
                sub.subscribe(evtChan, (msg, chan) => {
                    handleIncomingRedisMessage(chan || evtChan, msg);
                });
                sub.subscribe(ctrlChan, (msg, chan) => {
                    handleIncomingRedisMessage(chan || ctrlChan, msg);
                });
            } catch (_err) {
                // Ignore subscribe error
            }
        }
    } else if (!clusterConfig.useRedis) {
        clusterConfig.redisSubscribed = false;
    }

    return await get(req, res);
}

exports.set = set;
exports.get = get;