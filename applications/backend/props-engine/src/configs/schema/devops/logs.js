const common = require('./common');
const schema = process.aioBeLibs(`helpers/_private/schemas/structures`);

exports.get = async (private, appConfig, req, dH) => {
    const rval = {
        "collection": {
            "name": dH.devops.constants.MAP.COLLECTIONS.LOG
        },
        "schema": {
            ud: await common.userDetails(req, dH),
            mapId: await schema.universal.mongoId(req, {
                "configs": {
                    "mongodb": {
                        //index: true
                        "unique": false,
                        "required": {
                            "enable": false
                        }
                    }
                }
            }),
            runnerId: await schema.universal.mongoId(req, {
                "configs": {
                    "mongodb": {
                        //index:true
                        //ref:dH.devops.constants.MAP.COLLECTIONS.RUNNER,
                        "unique": false,
                        "required": {
                            "enable": false
                        }
                    }
                }
            }),
            batchId: await schema.universal.mongoId(req, {
                "configs": {
                    "mongodb": {
                        //index:true
                        //ref:dH.devops.constants.MAP.COLLECTIONS.BATCH,
                        "unique": false,
                        "required": {
                            "enable": false
                        }
                    }
                }
            }),
            taskId: await schema.universal.mongoId(req, {
                "configs": {
                    "mongodb": {
                        //index:true
                        //ref:dH.devops.constants.MAP.COLLECTIONS.TASK,
                        "unique": false,
                        "required": {
                            "enable": false
                        }
                    }
                }
            }),
            count: await schema.universal.number.value(req, {
                "configs": {
                    "mongodb": {
                        "max": {
                            "enable": true,
                            "value": dH.devops.constants.MAP.COLLECTIONS.BUCKET_SIZE,
                            "message": `Bucket count cannot exceed BUCKET_SIZE (${dH.devops.constants.MAP.BUCKET_SIZE})`
                        },
                        "min": {
                            "value": 0,
                            "enable": true
                        },
                        "default": {
                            "value": 0,
                            "enable": true
                        },
                        "required": {
                            "enable": true
                        }
                    }
                }
            }),
            logs: await schema.universal.list(req, {
                "childs": await common.logSchema(req, dH),
                "configs": {
                    "mongodb": {
                        "default": {
                            "value": [],
                            "enable": true
                        },
                        "required": {
                            "enable": false
                        },
                        validate: `{
                            validator: (arr) => Array.isArray(arr) && arr.length <= ${dH.devops.constants.MAP.BUCKET_SIZE},
                            message: 'Log bucket entries cannot exceed ${dH.devops.constants.MAP.BUCKET_SIZE} items'
                        }`
                    }
                }
            })
        }
    };

    return rval;
}

/*--
    LogBucketSchema.index({taskId: 1, runnerId: 1, batchId: 1, mapId: 1, count: 1, _id: -1}, {name:'idx_log_bucket_upsert_hotpath'});
    LogBucketSchema.index({taskId:1, _id:1}, {name:'idx_log_taskId'});
    LogBucketSchema.index({batchId:1, _id:1}, {name:'idx_log_batchId'});
    LogBucketSchema.index({runnerId:1, _id:1}, {name:'idx_log_runnerId'});
    LogBucketSchema.index({mapId:1, _id:1}, {name:'idx_log_mapId'});
--*/