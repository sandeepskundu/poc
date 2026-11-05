
const validation = require('./../validation');
const validate = process.aioBeLibs('helpers/_private/utils/validations');

const optional = () => {
    return {
        "checks":{
            "required":{
                "value":"optional"
            }
        }
    }
}

module.exports = async (req) => {
    return {
        "request":{
            "methods":{
                "put":await validate.build(req, 'request.methods.put')
            }
        },
        "validation":{
            "params":{
                id:await validate.build(req, 'universal.mongoId')
            },
            "body":{
                "mapId":await validation.mapId(req, {
                    "checks":{
                        "required":{
                            "value":"required"
                        }
                    }
                }),
                "name":await validation.name(req, optional(req)),
                "version":await validation.version(req, optional(req)),
                "useRedis":await validation.useRedis(req, optional(req)),
                "clusterMode":await validation.clusterMode(req, optional(req)),
                "redisChannel":await validation.redisChannel(req, optional(req)),
                "configCacheTtlMs":await validation.configCacheTtlMs(req, optional(req)),
                "redisControlChannel":await validation.redisControlChannel(req, optional(req)),
                "enableChangeStreams":await validation.enableChangeStreams(req, optional(req)),
                "clusterPollIntervalMs":await validation.clusterPollIntervalMs(req, optional(req)),
            }
        }
    }
}