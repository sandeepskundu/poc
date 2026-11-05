const devops = require('./../../../../helpers/devops');
const messages = process.aioBeLibs('helpers/_private/utils/messages');
const validation = process.aioBeLibs('helpers/_private/utils/validations');

const enums = devops.constants.ENUMS;

const clusterPollIntervalMs = async (req, extend) => {
    return req.helpers.json.merge(await validation.build(req, 'universal.number.only', {
        "checks":{
            "required":{
                "value":"optional"
            }
        }
    }), extend || {})
}

const useRedis = async (req, extend) => {
    return req.helpers.json.merge(await validation.build(req, 'universal.boolean', {
        "checks":{
            "required":{
                "value":"optional"
            }
        }
    }), extend || {})
}

const clusterMode = async (req, extend) => {
    return req.helpers.json.merge(await validation.build(req, 'universal.enums', {
        "checks":{
            "required":{
                "value":"optional"
            },
            "regex":{
                "value":await req.helpers.enums.builder.async.init(req, [`CLUSTER_MODES`], {node:'id', regex:true}, enums)
            }
        }
    }), extend || {})
}

const mapId = async (req, extend) => {
    return req.helpers.json.merge(await validation.build(req, 'universal.mongoId', {
        "checks":{
            "required":{
                "value":"required"
            },
        }
    }), extend || {})
}

const name = async (req, extend) => {
    return req.helpers.json.merge(await validation.build(req, 'universal.text.title', {
        "checks":{
            "required":{
                "value":"required"
            },
        }
    }), extend || {})
}

const version = async (req, extend) => {
    return req.helpers.json.merge(await validation.build(req, 'universal.number.only', {
        "checks":{
            "required":{
                "value":"optional"
            },
        }
    }), extend || {})
}

const redisChannel = async (req, extend) => {
    return req.helpers.json.merge(await validation.build(req, 'universal.text.key', {
        "checks":{
            "required":{
                "value":"optional"
            },
        }
    }), extend || {})
}

const configCacheTtlMs = async (req, extend) => {
    return req.helpers.json.merge(await validation.build(req, 'universal.number.only', {
        "checks":{
            "required":{
                "value":"optional"
            },
        }
    }), extend || {})
}


const redisControlChannel = async (req, extend) => {
    return req.helpers.json.merge(await validation.build(req, 'universal.text.key', {
        "checks":{
            "required":{
                "value":"optional"
            },
        }
    }), extend || {})
}

const enableChangeStreams = async (req, extend) => {
    return req.helpers.json.merge(await validation.build(req, 'universal.boolean', {
        "checks":{
            "required":{
                "value":"optional"
            }
        }
    }), extend || {})
}




// configCacheTtlMs

module.exports = {
    "name":name,
    "mapId":mapId,
    "version":version,
    "useRedis":useRedis,
    "clusterMode":clusterMode,
    "redisChannel":redisChannel,
    "configCacheTtlMs":configCacheTtlMs,
    "redisControlChannel":redisControlChannel,
    "enableChangeStreams":enableChangeStreams,
    "clusterPollIntervalMs":clusterPollIntervalMs,
}