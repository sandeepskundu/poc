
const validation = require('./../validation');
const validate = process.aioBeLibs('helpers/_private/utils/validations');

module.exports = async (req) => {
    return {
        "request":{
            "methods":{
                "post":await validate.build(req, 'request.methods.post')
            }
        },
        "validation":{
            "body":{
                "name":await validation.name(req, {}),
                "mapId":await validation.mapId(req, {}),
                "version":await validation.version(req, {}),
                "useRedis":await validation.useRedis(req, {}),
                "clusterMode":await validation.clusterMode(req, {}),
                "redisChannel":await validation.redisChannel(req, {}),
                "configCacheTtlMs":await validation.configCacheTtlMs(req, {}),
                "redisControlChannel":await validation.redisControlChannel(req, {}),
                "enableChangeStreams":await validation.enableChangeStreams(req, {}),
                "clusterPollIntervalMs":await validation.clusterPollIntervalMs(req, {})
            }
        }
    }
}