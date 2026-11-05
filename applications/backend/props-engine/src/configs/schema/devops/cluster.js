const common = require('./common');
const schema = process.aioBeLibs(`helpers/_private/schemas/structures`);

exports.get = async (private, appConfig, req, dH) => {
    const rval = {
        "collection":{
            "name":dH.devops.constants.MAP.COLLECTIONS.CLUSTER
        },
        "schema":{
            nameHash:await schema.universal.hashId(req, {}),
            mapId:await schema.universal.mongoId(req, {
                "configs":{
                    "mongodb":{
                        //index: true
                        "unique":false,
                        "required": {
                            "enable":true
                        }
                    }
                }
            }),
            useRedis:await schema.universal.boolean(req, {
                "configs":{
                    "mongodb":{
                        "default":{
                            "enable":true,
                            "value":dH.devops.constants.MAP.DEFAULT_REDIS_ENABLED
                        },
                        "required": {
                            "enable":false
                        }
                    }
                }
            }),
            clusterMode:await common.enums(req,  ['CLUSTER_MODES'], dH.devops.constants.MAP.CLUSTER_MODES.MONGO, dH.devops.constants.ENUMS, {
                "configs": {
                    "mongodb": {
                        //index:true
                        "required": {
                            "enable":true
                        }
                    }
                }
            }),
            name:await schema.universal.string.value(req, {
                "configs":{
                    "mongodb":{
                        "required": {
                            "enable":true
                        }
                    }
                }
            }),
            clusterPollIntervalMs:await schema.universal.number.value(req, {
                "configs":{
                    "mongodb":{
                        "min":{
                            "value":10,
                            "enable":true,
                            "message":"clusterPollIntervalMs must be at least 10ms"
                        },
                        "default":{
                            "enable":true,
                            "value":dH.devops.constants.MAP.DEFAULT_CLUSTER_POLL_MS,
                        },
                        "required": {
                            "enable":false
                        }
                    }
                }
            }),
            enableChangeStreams:await schema.universal.boolean(req, {
                "configs":{
                    "mongodb":{
                        "default":{
                            "value":true,
                            "enable":true
                        },
                        "required": {
                            "enable":false
                        }
                    }
                }
            }),
            redisChannel:await schema.universal.string.value(req, {
                "configs":{
                    "mongodb":{
                        "default":{
                            "enable":true,
                            "value":`'${dH.devops.constants.MAP.DEFAULT_REDIS_CHANNEL}'`
                        },
                        "required": {
                            "enable":false
                        }
                    }
                }
            }),
            redisControlChannel:await schema.universal.string.value(req, {
                "configs":{
                    "mongodb":{
                        "default":{
                            "enable":true,
                            "value":`'${dH.devops.constants.MAP.DEFAULT_REDIS_CHANNEL}:control'`
                        },
                        "required": {
                            "enable":false
                        }
                    }
                }
            }),
            configCacheTtlMs:await schema.universal.number.value(req, {
                "configs":{
                    "mongodb":{
                        "min":{
                            "value":0,
                            "enable":true,
                            "message":"configCacheTtlMs cannot be negative"
                        },
                        "default":{
                            "enable":true,
                            "value":dH.devops.constants.MAP.DEFAULT_CLUSTER_CONFIG_CACHE_TTL_MS,
                        },
                        "required": {
                            "enable":false
                        }
                    }
                }
            }),
            version:await schema.universal.number.value(req, {
                "configs":{
                    "mongodb":{
                        "min":{
                            "value":1,
                            "enable":true,
                            "message":"version must be at least 1"
                        },
                        "default":{
                            "value":1,
                            "enable":true
                        },
                        "required": {
                            "enable":false
                        }
                    }
                }
            })
        }
    };

    return rval;
}

/*--
    ClusterSchema.index({ mapId: 1 }, { name: 'idx_cluster_mapId_unique', unique: true });
    ClusterSchema.index({ updatedAt: -1 }, { name: 'idx_cluster_updatedAt' });
--*/