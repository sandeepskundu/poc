const common = require('./common');
const schema = process.aioBeLibs(`helpers/_private/schemas/structures`);

exports.get = async (private, appConfig, req, dH) => {
    const rval = {
        "collection":{
            "name":dH.devops.constants.MAP.COLLECTIONS.BATCH
        },
        "schema":{
            runnerId:await schema.universal.mongoId(req, {
                "configs":{
                    "mongodb":{
                        //index:true
                        //ref:dH.devops.constants.MAP.COLLECTIONS.RUNNER,
                        "unique":false,
                        "required": {
                            "enable":true
                        }
                    }
                }
            }),
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
            name:await schema.universal.string.value(req, {
                "configs":{
                    "mongodb":{
                        "required": {
                            "enable":true
                        }
                    }
                }
            }),
            status:await common.enums(req,  ['BATCH_STATUS'], dH.devops.constants.MAP.BATCH_STATUS.QUEUED, dH.devops.constants.ENUMS, {
                "configs": {
                    "mongodb": {
                        //index:true
                        "required": {
                            "enable":true
                        }
                    }
                }
            }),
            mode:await common.enums(req,  ['BATCH_MODES'], dH.devops.constants.MAP.BATCH_MODES.QUEUE, dH.devops.constants.ENUMS, {
                "configs": {
                    "mongodb": {
                        "required": {
                            "enable":true
                        }
                    }
                }
            }),
            maxQueueConcurrency:await schema.universal.number.value(req, {
                "configs":{
                    "mongodb":{
                        "min":{
                            "enable":true,
                            "value":1
                        },
                        "default":{ 
                            "enable":true,
                            "value":dH.devops.constants.MAP.DEFAULT_CONCURRENCY,
                        },
                        "required": {
                            "enable":false
                        }
                    }
                }
            }),
            continueOnError:await schema.universal.boolean(req, {
                "configs":{
                    "mongodb":{
                        "required": {
                            "enable":false
                        }
                    }
                }
            }),
            when:await schema.universal.mixed(req, {
                "configs":{
                    "mongodb":{
                        "required": {
                            "enable":false
                        }
                    }
                }
            }),
            requiresApproval:await schema.universal.mixed(req, {
                "configs":{
                    "mongodb":{
                        "required": {
                            "enable":false
                        }
                    }
                }
            }),
            approvalStatus:await common.enums(req,  ['APPROVAL_STATUS'], dH.devops.constants.MAP.APPROVAL_STATUS.NONE, dH.devops.constants.ENUMS, {
                "configs": {
                    "mongodb": {
                        // index: true
                        "required": {
                            "enable":false
                        }
                    }
                }
            }),
            approvedBy:await schema.universal.mongoId(req, {
                "configs":{
                    "mongodb":{
                        "unique":false,
                        "required": {
                            "enable":false
                        }
                    }
                }
            }),
            rejectedBy:await schema.universal.mongoId(req, {
                "configs":{
                    "mongodb":{
                        "unique":false,
                        "required": {
                            "enable":false
                        }
                    }
                }
            }),
            approvedAt:await schema.universal.number.value(req, {
                "configs":{
                    "mongodb":{
                        "default":{ 
                            "enable":false
                        },
                        "required": {
                            "enable":false
                        }
                    }
                }
            }),
            rejectedAt:await schema.universal.number.value(req, {
                "configs":{
                    "mongodb":{
                        "default":{ 
                            "enable":false
                        },
                        "required": {
                            "enable":false
                        }
                    }
                }
            }),
            approvalComment:await schema.universal.string.value(req, {
                "configs":{
                    "mongodb":{
                        "required": {
                            "enable":false
                        }
                    }
                }
            }),
            approvalTimeoutMs:await schema.universal.number.value(req, {
                "configs":{
                    "mongodb":{
                        "min":{
                            "enable":true,
                            "value":0
                        },
                        "default":{ 
                            "enable":true,
                            "value":0
                        },
                        "required": {
                            "enable":false
                        }
                    }
                }
            }),
            matrix:await schema.universal.mixed(req, {
                "configs":{
                    "mongodb":{
                        "required": {
                            "enable":false
                        }
                    }
                }
            }),
            order:await schema.universal.number.value(req, {
                "configs":{
                    "mongodb":{
                        "min":{ 
                            "enable":true,
                            "value":0,
                        },
                        "default":{ 
                            "enable":true,
                            "value":0,
                        },
                        "required": {
                            "enable":true
                        }
                    }
                }
            }),
            startedAt:await schema.universal.number.value(req, {
                "configs":{
                    "mongodb":{
                        "default":{ 
                            "enable":false
                        },
                        "required": {
                            "enable":false
                        }
                    }
                }
            }),
            finishedAt:await schema.universal.number.value(req, {
                "configs":{
                    "mongodb":{
                        "default":{ 
                            "enable":false
                        },
                        "required": {
                            "enable":false
                        }
                    }
                }
            }),
            durationMs:await schema.universal.number.value(req, {
                "configs":{
                    "mongodb":{
                        "default":{ 
                            "enable":false
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
    BatchSchema.index({ runnerId: 1, order: 1 }, { name: 'idx_batch_runnerId_order' });
    BatchSchema.index({ runnerId: 1, status: 1 }, { name: 'idx_batch_runnerId_status' });
    BatchSchema.index({ mapId: 1, runnerId: 1 }, { name: 'idx_batch_mapId_runnerId' });
    BatchSchema.virtual('tasks', {
        ref: COLLECTIONS.TASK,
        localField: '_id',
        foreignField: 'batchId'
    });

--*/