const common = require('./common');
const schema = process.aioBeLibs(`helpers/_private/schemas/structures`);

exports.get = async (private, appConfig, req, dH) => {
    const rval = {
        "collection": {
            "name": dH.devops.constants.MAP.COLLECTIONS.TASK
        },
        "schema": {
            batchId:await schema.universal.mongoId(req, {
                "configs": {
                    "mongodb": {
                        //index:true
                        //ref:dH.devops.constants.MAP.COLLECTIONS.BATCH,
                        "unique": false,
                        "required": {
                            "enable": true
                        }
                    }
                }
            }),
            runnerId:await schema.universal.mongoId(req, {
                "configs": {
                    "mongodb": {
                        //index:true
                        //ref:dH.devops.constants.MAP.COLLECTIONS.RUNNER,
                        "unique": false,
                        "required": {
                            "enable": true
                        }
                    }
                }
            }),
            mapId: await schema.universal.mongoId(req, {
                "configs": {
                    "mongodb": {
                        //index: true
                        "unique": false,
                        "required": {
                            "enable": true
                        }
                    }
                }
            }),
            name:await schema.universal.string.value(req, {
                "configs": {
                    "mongodb": {
                        "required": {
                            "enable":false
                        }
                    }
                }
            }),
            cmd:await schema.universal.string.value(req, {
                "configs": {
                    "mongodb": {
                        "required": {
                            "enable":true,
                            "message":"'Shell command (cmd) is required'"
                        }
                    }
                }
            }),
            script:await schema.universal.string.value(req, {
                "configs": {
                    "mongodb": {
                        "required": {
                            "enable":false,
                        }
                    }
                }
            }),
            scriptPath:await schema.universal.string.value(req, {
                "configs": {
                    "mongodb": {
                        "required": {
                            "enable":false,
                        }
                    }
                }
            }),
            shell:await schema.universal.string.value(req, {
                "configs": {
                    "mongodb": {
                        "required": {
                            "enable":false,
                        }
                    }
                }
            }),
            args:await schema.universal.mixed(req, {
                "configs": {
                    "mongodb": {
                        "___type":`[String]`,
                        "default": {
                            "value":[],
                            "enable":true
                        }
                    }
                }
            }),
            cwd:await schema.universal.string.value(req, {
                "configs": {
                    "mongodb": {
                        "default":{
                            "enable":true,
                            "value":`() => process.cwd()`
                        },
                        "required": {
                            "enable":false,
                        }
                    }
                }
            }),
            env:await schema.universal.mixed(req, {
                "configs": {
                    "mongodb": {
                        "default":{
                            "enable":true,
                            "value":{}
                        },
                        "required": {
                            "enable": false
                        }
                    }
                }
            }),
            pid:await schema.universal.number.value(req, {
                "configs": {
                    "mongodb": {
                        // index:true,
                        "default": {
                            "enable": false
                        },
                        "required": {
                            "enable": false
                        }
                    }
                }
            }),
            exitCode:await schema.universal.number.value(req, {
                "configs": {
                    "mongodb":{
                        "default": {
                            "enable": false
                        },
                        "required": {
                            "enable": false
                        }
                    }
                }
            }),
            byteOffset:await schema.universal.number.value(req, {
                "configs": {
                    "mongodb":{
                        "min":{
                            "value":0,
                            "enable":true,
                            "message":"byteOffset cannot be negative"
                        },
                        "default": {
                            "value":0,
                            "enable":true
                        },
                        "required": {
                            "enable":true
                        }
                    }
                }
            }),
            status:await common.enums(req, ['TASK_STATUS'], dH.devops.constants.MAP.TASK_STATUS.QUEUED, dH.devops.constants.ENUMS, {
                "configs": {
                    "mongodb": {
                        //index:true
                        "required": {
                            "enable": true
                        }
                    }
                }
            }),
            order:await schema.universal.number.value(req, {
                "configs": {
                    "mongodb":{
                        "min":{
                            "value":0,
                            "enable":true,
                            "message":"order cannot be negative"
                        },
                        "default": {
                            "value":0,
                            "enable":true
                        },
                        "required": {
                            "enable":true
                        }
                    }
                }
            }),
            outputs:await schema.universal.mixed(req, {
                "configs": {
                    "mongodb": {
                        "required": {
                            "enable": false
                        }
                    }
                }
            }),
            when:await schema.universal.mixed(req, {
                "configs": {
                    "mongodb": {
                        "required": {
                            "enable": false
                        }
                    }
                }
            }),
            matrixValues:await schema.universal.mixed(req, {
                "configs": {
                    "mongodb": {
                        "required": {
                            "enable": false
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
            }),
            maxRetries:await schema.universal.number.value(req, {
                "configs": {
                    "mongodb":{
                        "min":{
                            "value":0,
                            "enable":true,
                            "message":"maxRetries cannot be negative"
                        },
                        "default": {
                            "value":0,
                            "enable":true
                        },
                        "required":{
                            "enable":false
                        }
                    }
                }
            }),
            retryDelayMs:await schema.universal.number.value(req, {
                "configs": {
                    "mongodb":{
                        "min":{
                            "value":0,
                            "enable":true
                        },
                        "default": {
                            "enable":true,
                            "value":dH.devops.constants.MAP.DEFAULT_RETRY_DELAY_MS,
                        },
                        "required":{
                            "enable":false
                        }
                    }
                }
            }),
            retryBackoffFactor:await schema.universal.number.value(req, {
                "configs": {
                    "mongodb":{
                        "min":{
                            "value":1,
                            "enable":true
                        },
                        "default": {
                            "enable":true,
                            "value":dH.devops.constants.MAP.DEFAULT_RETRY_BACKOFF_FACTOR,
                        },
                        "required":{
                            "enable":false
                        }
                    }
                }
            }),
            retryCount:await schema.universal.number.value(req, {
                "configs": {
                    "mongodb":{
                        "min":{
                            "value":0,
                            "enable":true
                        },
                        "default": {
                            "enable":true,
                            "value":0,
                        },
                        "required":{
                            "enable":false
                        }
                    }
                }
            }),
            cleanupTempOnFinish:await schema.universal.boolean(req, {
                "configs": {
                    "mongodb": {
                        "required": {
                            "enable": false
                        }
                    }
                }
            }),
            controlState:await common.enums(req, ['CONTROL_STATES'], dH.devops.constants.MAP.CONTROL_STATES.NORMAL, dH.devops.constants.ENUMS, {
                "configs": {
                    "mongodb": {
                        //"index":true,
                        "required": {
                            "enable": true
                        }
                    }
                }
            }),
            heartbeatAt:await schema.universal.number.value(req, {
                "configs":{
                    "mongodb":{
                        //"index":true,
                        "required": {
                            "enable":false
                        }
                    }
                }
            }),
            timeoutMs:await schema.universal.number.value(req, {
                "configs": {
                    "mongodb":{
                        "min":{
                            "value":0,
                            "enable":true,
                            "message":"timeoutMs cannot be negative"
                        },
                        "default": {
                            "value":0,
                            "enable":true
                        },
                        "required":{
                            "enable":false
                        }
                    }
                }
            }),
            killGraceMs: await schema.universal.number.value(req, {
                "configs": {
                    "mongodb": {
                        "default": {
                            "enable": false
                        },
                        "required": {
                            "enable": false
                        }
                    }
                }
            }),
            pollIntervalMs: await schema.universal.number.value(req, {
                "configs": {
                    "mongodb": {
                        "default": {
                            "enable": false
                        },
                        "required": {
                            "enable": false
                        }
                    }
                }
            }),
            startedAt: await schema.universal.number.value(req, {
                "configs": {
                    "mongodb": {
                        "default": {
                            "enable": false
                        },
                        "required": {
                            "enable": false
                        }
                    }
                }
            }),
            finishedAt: await schema.universal.number.value(req, {
                "configs": {
                    "mongodb": {
                        "default": {
                            "enable": false
                        },
                        "required": {
                            "enable": false
                        }
                    }
                }
            }),
            durationMs:await schema.universal.number.value(req, {
                "configs": {
                    "mongodb": {
                        "default": {
                            "enable": false
                        },
                        "required": {
                            "enable": false
                        }
                    }
                }
            })
        }
    };

    return rval;
}


/*--
    TaskSchema.index({ batchId: 1, order: 1 }, { name: 'idx_task_batchId_order' });
    TaskSchema.index({ runnerId: 1, order: 1 }, { name: 'idx_task_runnerId_order' });
    TaskSchema.index({ status: 1, pid: 1 }, { name: 'idx_task_status_pid' });
    TaskSchema.index({ mapId: 1, status: 1 }, { name: 'idx_task_mapId_status' });
--*/