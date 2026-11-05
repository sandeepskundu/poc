const common = require('./common');
const schema = process.aioBeLibs(`helpers/_private/schemas/structures`);

exports.get = async (private, appConfig, req, dH) => {
    const rval = {
        "collection":{
            "name":dH.devops.constants.MAP.COLLECTIONS.RUNNER
        },
        "schema":{
            status:await common.enums(req,  ['RUNNER_STATUS'], dH.devops.constants.MAP.RUNNER_STATUS.TRIGGERED, dH.devops.constants.ENUMS, {
                "configs": {
                    "mongodb": {
                        //index: true
                        "required": {
                            "enable":true
                        }
                    }
                }
            }),
            controlState:await common.enums(req,  ['CONTROL_STATES'], dH.devops.constants.MAP.CONTROL_STATES.NORMAL, dH.devops.constants.ENUMS, {
                "configs": {
                    "mongodb": {
                        //index:true
                        "required": {
                            "enable":true
                        }
                    }
                }
            }),
            concurrencyPolicy:await common.enums(req,  ['CONCURRENCY_POLICIES'], dH.devops.constants.MAP.CONCURRENCY_POLICIES.ALLOW, dH.devops.constants.ENUMS, {
                "configs": {
                    "mongodb": {
                        "required": {
                            "enable":false
                        }
                    }
                }
            }),
            ud:await common.userDetails(req, dH),
            mapId:await schema.universal.mongoId(req, {
                "configs":{
                    "mongodb":{
                        //index: true,
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
                        //index: true,
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
                            "enable":false
                        }
                    }
                }
            }),
            webhookUrl:await schema.universal.string.value(req, {
                "configs":{
                    "mongodb":{
                        "required": {
                            "enable":false
                        }
                    }
                }
            }),
            totalBatches:await schema.universal.number.value(req, {
                "configs":{
                    "mongodb":{
                        "min":{
                            "value":0,
                            "enable":true,
                        },
                        "default":{
                            "value":0,
                            "enable":true,
                        },
                        "required": {
                            "enable":true
                        }
                    }
                }
            }),
            currentBatchIndex: await schema.universal.number.value(req, {
                "configs":{
                    "mongodb":{
                        "min":{
                            "value":0,
                            "enable":true,
                        },
                        "default":{
                            "value":0,
                            "enable":true,
                        },
                        "required": {
                            "enable":true
                        }
                    }
                }
            }),
            replayCount:await schema.universal.number.value(req, {
                "configs":{
                    "mongodb":{
                        "min":{
                            "value":0,
                            "enable":true,
                        },
                        "default":{
                            "value":0,
                            "enable":true,
                        },
                        "required": {
                            "enable":false
                        }
                    }
                }
            }),
            outputs:await schema.universal.mixed(req, {
                "configs":{
                    "mongodb":{
                        "default":{
                            "value":{},
                            "enable":true,
                        },
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
            matrixValues:await schema.universal.mixed(req, {
                "configs":{
                    "mongodb":{
                        "required": {
                            "enable":false
                        }
                    }
                }
            }),
            cleanupTempOnFinish:await schema.universal.boolean(req, {
                "configs":{
                    "mongodb":{
                        "required": {
                            "enable":false
                        }
                    }
                }
            }),
            startedAt:await schema.universal.number.value(req, {
                "configs":{
                    "mongodb":{
                        "required": {
                            "enable":false
                        }
                    }
                }
            }),
            finishedAt:await schema.universal.number.value(req, {
                "configs":{
                    "mongodb":{
                        "required": {
                            "enable":false
                        }
                    }
                }
            }),
            scheduledAt:await schema.universal.number.value(req, {
                "configs":{
                    "mongodb":{
                        "required": {
                            "enable":false
                        }
                    }
                }
            }),
            durationMs:await schema.universal.number.value(req, {
                "configs":{
                    "mongodb":{
                        "required": {
                            "enable":false
                        }
                    }
                }
            }),
            heartbeatAt:await schema.universal.number.value(req, {
                "configs":{
                    "mongodb":{
                        //"index":true,
                        "default": {
                            "value":`Date.now()`,
                            "enable":true
                        },
                        "required": {
                            "enable":false
                        }
                    }
                }
            }),
            secretKeys:await schema.universal.mixed(req, {
                "configs": {
                    "mongodb": {
                        "___type":`[String]`,
                        "default": {
                            "value":[],
                            "enable":true
                        }
                    }
                }
            })
        }
    };

    return rval;
}

/*--

 {
      collection: COLLECTIONS.RUNNER,
      timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
        currentTime: () => Date.now()
      },
      versionKey: false,
      toJSON: { virtuals: true },
      toObject: { virtuals: true }
    }
  );

  RunnerSchema.index({ mapId: 1, createdAt: -1 }, { name: 'idx_runner_mapId_createdAt' });
  RunnerSchema.index({ status: 1, controlState: 1 }, { name: 'idx_runner_status_controlState' });
  RunnerSchema.index({ 'ud.aId': 1, 'ud.uId': 1, createdAt: -1 }, { name: 'idx_runner_ud_createdAt' });

  RunnerSchema.virtual('batches', {
    ref: COLLECTIONS.BATCH,
    localField: '_id',
    foreignField: 'runnerId'
  });

  RunnerSchema.virtual('tasks', {
    ref: COLLECTIONS.TASK,
    localField: '_id',
    foreignField: 'runnerId'
  });

--*/