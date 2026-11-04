'use strict';

const {
  COLLECTIONS,
  BUCKET_SIZE,
  DEFAULT_CONCURRENCY,
  DEFAULT_RETRY_DELAY_MS,
  DEFAULT_RETRY_BACKOFF_FACTOR,
  CONCURRENCY_POLICIES,
  EVENT_TYPES,
  RUNNER_STATUS,
  CONTROL_STATES,
  BATCH_STATUS,
  BATCH_MODES,
  APPROVAL_STATUS,
  TASK_STATUS,
  getHostId,
  generateId,
  getCollection
} = require('./constants');

let mongooseLib = null;
try {
  // eslint-disable-next-line global-require, import/no-unresolved
  mongooseLib = require('mongoose');
} catch (_err) {
  mongooseLib = null;
}

const RUNNER_STATUS_VALUES = Object.values(RUNNER_STATUS);
const CONTROL_STATE_VALUES = Object.values(CONTROL_STATES);
const BATCH_STATUS_VALUES = Object.values(BATCH_STATUS);
const BATCH_MODE_VALUES = Object.values(BATCH_MODES);
const APPROVAL_STATUS_VALUES = Object.values(APPROVAL_STATUS).filter((v) => v !== null);
const APPROVAL_STATUS_ENUM = [...APPROVAL_STATUS_VALUES, null];
const TASK_STATUS_VALUES = Object.values(TASK_STATUS);
const EVENT_TYPE_VALUES = Object.values(EVENT_TYPES);

// Fallback Mongoose-compatible Schema builder when running without mongoose in node_modules
const createFallbackSchema = (definition, options = {}) => {
  const registeredIndexes = [];
  const virtuals = Object.create(null);
  const preHooks = [];
  const postHooks = [];

  return {
    obj: definition,
    options,
    paths: Object.keys(definition),
    index: (fields, idxOptions = {}) => {
      registeredIndexes.push([fields, idxOptions]);
    },
    indexes: () => registeredIndexes.slice(),
    virtual: (name, virtualOpts) => {
      const v = { name, options: virtualOpts, getters: [], setters: [] };
      virtuals[name] = v;
      return {
        get: (fn) => {
          v.getters.push(fn);
          return v;
        },
        set: (fn) => {
          v.setters.push(fn);
          return v;
        }
      };
    },
    pre: (hook, fn) => {
      preHooks.push({ hook, fn });
    },
    post: (hook, fn) => {
      postHooks.push({ hook, fn });
    },
    virtuals,
    preHooks,
    postHooks
  };
};

const FallbackSchemaTypes = {
  ObjectId: 'ObjectId',
  Mixed: 'Mixed',
  String,
  Number,
  Boolean,
  Date,
  Buffer,
  Map: 'Map',
  Array
};

const resolveMongoose = (customMongoose) => {
  if (customMongoose && customMongoose.Schema) {
    return customMongoose;
  }
  if (mongooseLib && mongooseLib.Schema) {
    return mongooseLib;
  }
  const fallbackModels = Object.create(null);
  const SchemaFn = (def, opts) => createFallbackSchema(def, opts);
  SchemaFn.Types = FallbackSchemaTypes;

  return {
    Schema: SchemaFn,
    Types: { ObjectId: FallbackSchemaTypes.ObjectId },
    models: fallbackModels,
    model: (name, schema, collectionName) => {
      if (!schema) {
        return fallbackModels[name];
      }
      const modelObj = {
        modelName: name,
        schema,
        collection: { name: collectionName || (schema.options && schema.options.collection) || name }
      };
      fallbackModels[name] = modelObj;
      return modelObj;
    }
  };
};

// ============================================================================
// 1. Mongoose Schema Builder (Runner, Batch, Task, LogBucket & Sub-Schemas)
// ============================================================================

exports.createMongooseSchemas = (customMongoose) => {
  const mg = resolveMongoose(customMongoose);
  const { Schema } = mg;

  // Sub-Schema: User Session Details `ud: { uId, aId }` from session.details(req)
  const UserDetailSchema = Schema(
    {
      uId: {
        type: Schema.Types.Mixed,
        required: [true, 'User ID (ud.uId) is required'],
        index: true
      },
      aId: {
        type: Schema.Types.Mixed,
        required: [true, 'Account ID (ud.aId) is required'],
        index: true
      }
    },
    { _id: false }
  );

  // Sub-Schema: Individual Log Entry `{ type, msg, ts, progress }` inside a Log Bucket
  const LogEntrySchema = Schema(
    {
      type: {
        type: String,
        enum: EVENT_TYPE_VALUES,
        default: EVENT_TYPES.STDOUT,
        required: true
      },
      msg: {
        type: String,
        required: true,
        default: ''
      },
      ts: {
        type: Number,
        required: true,
        default: Date.now
      },
      progress: {
        type: Number,
        min: 0,
        max: 100,
        default: undefined
      },
      hostId: {
        type: String,
        default: undefined
      }
    },
    { _id: false }
  );

  // --------------------------------------------------------------------------
  // Tier 1: Runner Schema (`runner` Collection)
  // --------------------------------------------------------------------------
  const RunnerSchema = Schema(
    {
      mapId: {
        type: Schema.Types.Mixed, // Supports String or Schema.Types.ObjectId
        required: [true, 'External reference mapId is required'],
        index: true
      },
      name: {
        type: String,
        trim: true,
        default: null
      },
      status: {
        type: String,
        enum: {
          values: RUNNER_STATUS_VALUES,
          message: 'Invalid runner status "{VALUE}"'
        },
        default: RUNNER_STATUS.TRIGGERED,
        required: true,
        index: true
      },
      controlState: {
        type: String,
        enum: {
          values: CONTROL_STATE_VALUES,
          message: 'Invalid runner controlState "{VALUE}"'
        },
        default: CONTROL_STATES.NORMAL,
        required: true,
        index: true
      },
      ud: {
        type: UserDetailSchema,
        required: [true, 'User session details (ud) are required']
      },
      totalBatches: {
        type: Number,
        required: true,
        default: 0,
        min: [0, 'totalBatches cannot be negative']
      },
      currentBatchIndex: {
        type: Number,
        required: true,
        default: 0,
        min: [0, 'currentBatchIndex cannot be negative']
      },
      replayCount: {
        type: Number,
        default: 0,
        min: 0
      },
      outputs: {
        type: Schema.Types.Mixed,
        default: {}
      },
      when: {
        type: Schema.Types.Mixed,
        default: null
      },
      matrixValues: {
        type: Schema.Types.Mixed,
        default: null
      },
      secretKeys: {
        type: [String],
        default: []
      },
      concurrencyPolicy: {
        type: String,
        enum: Object.values(CONCURRENCY_POLICIES),
        default: CONCURRENCY_POLICIES.ALLOW
      },
      cleanupTempOnFinish: {
        type: Boolean,
        default: false
      },
      webhookUrl: {
        type: String,
        default: null
      },
      hostId: {
        type: String,
        default: () => getHostId(),
        index: true
      },
      startedAt: {
        type: Number,
        default: null
      },
      finishedAt: {
        type: Number,
        default: null
      },
      scheduledAt: {
        type: Number,
        default: null
      },
      durationMs: {
        type: Number,
        default: null
      }
    },
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

  // --------------------------------------------------------------------------
  // Tier 2: Batch Schema (`batch` Collection)
  // --------------------------------------------------------------------------
  const BatchSchema = Schema(
    {
      runnerId: {
        type: Schema.Types.ObjectId,
        ref: COLLECTIONS.RUNNER,
        required: [true, 'Parent runnerId is required'],
        index: true
      },
      mapId: {
        type: Schema.Types.Mixed,
        required: [true, 'External reference mapId is required'],
        index: true
      },
      name: {
        type: String,
        required: [true, 'Batch name is required'],
        trim: true
      },
      mode: {
        type: String,
        enum: {
          values: BATCH_MODE_VALUES,
          message: 'Batch mode must be "queue" or "parallel"'
        },
        default: BATCH_MODES.QUEUE,
        required: true
      },
      maxQueueConcurrency: {
        type: Number,
        default: DEFAULT_CONCURRENCY,
        min: [1, 'maxQueueConcurrency must be at least 1']
      },
      continueOnError: {
        type: Boolean,
        default: false
      },
      when: {
        type: Schema.Types.Mixed,
        default: null
      },
      requiresApproval: {
        type: Boolean,
        default: false
      },
      approvalStatus: {
        type: String,
        enum: {
          values: APPROVAL_STATUS_ENUM,
          message: 'Invalid batch approvalStatus "{VALUE}"'
        },
        default: null,
        index: true
      },
      approvedBy: {
        type: Schema.Types.Mixed,
        default: null
      },
      approvedAt: {
        type: Number,
        default: null
      },
      rejectedBy: {
        type: Schema.Types.Mixed,
        default: null
      },
      rejectedAt: {
        type: Number,
        default: null
      },
      approvalComment: {
        type: String,
        default: null
      },
      approvalTimeoutMs: {
        type: Number,
        default: 0,
        min: [0, 'approvalTimeoutMs cannot be negative']
      },
      matrix: {
        type: Schema.Types.Mixed,
        default: null
      },
      status: {
        type: String,
        enum: {
          values: BATCH_STATUS_VALUES,
          message: 'Invalid batch status "{VALUE}"'
        },
        default: BATCH_STATUS.QUEUED,
        required: true,
        index: true
      },
      order: {
        type: Number,
        required: true,
        default: 0,
        min: [0, 'Batch execution order cannot be negative']
      },
      startedAt: {
        type: Number,
        default: null
      },
      finishedAt: {
        type: Number,
        default: null
      },
      durationMs: {
        type: Number,
        default: null
      }
    },
    {
      collection: COLLECTIONS.BATCH,
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

  BatchSchema.index({ runnerId: 1, order: 1 }, { name: 'idx_batch_runnerId_order' });
  BatchSchema.index({ runnerId: 1, status: 1 }, { name: 'idx_batch_runnerId_status' });
  BatchSchema.index({ mapId: 1, runnerId: 1 }, { name: 'idx_batch_mapId_runnerId' });

  BatchSchema.virtual('tasks', {
    ref: COLLECTIONS.TASK,
    localField: '_id',
    foreignField: 'batchId'
  });

  // --------------------------------------------------------------------------
  // Tier 3: Command Task Schema (`task` Collection)
  // --------------------------------------------------------------------------
  const TaskSchema = Schema(
    {
      batchId: {
        type: Schema.Types.ObjectId,
        ref: COLLECTIONS.BATCH,
        required: [true, 'Parent batchId is required'],
        index: true
      },
      runnerId: {
        type: Schema.Types.ObjectId,
        ref: COLLECTIONS.RUNNER,
        required: [true, 'Parent runnerId is required'],
        index: true
      },
      mapId: {
        type: Schema.Types.Mixed,
        required: [true, 'External reference mapId is required'],
        index: true
      },
      name: {
        type: String,
        trim: true,
        default: null
      },
      cmd: {
        type: String,
        required: [true, 'Shell command (cmd) is required'],
        trim: true
      },
      scriptPath: {
        type: String,
        trim: true,
        default: null
      },
      script: {
        type: String,
        default: null
      },
      args: {
        type: [String],
        default: []
      },
      shell: {
        type: String,
        trim: true,
        default: null
      },
      cwd: {
        type: String,
        default: () => process.cwd()
      },
      env: {
        type: Schema.Types.Mixed,
        default: {}
      },
      pid: {
        type: Number,
        default: null,
        index: true
      },
      exitCode: {
        type: Number,
        default: null
      },
      byteOffset: {
        type: Number,
        required: true,
        default: 0,
        min: [0, 'byteOffset cannot be negative']
      },
      status: {
        type: String,
        enum: {
          values: TASK_STATUS_VALUES,
          message: 'Invalid task status "{VALUE}"'
        },
        default: TASK_STATUS.QUEUED,
        required: true,
        index: true
      },
      order: {
        type: Number,
        required: true,
        default: 0,
        min: [0, 'Task order cannot be negative']
      },
      outputs: {
        type: Schema.Types.Mixed,
        default: {}
      },
      when: {
        type: Schema.Types.Mixed,
        default: null
      },
      matrixValues: {
        type: Schema.Types.Mixed,
        default: null
      },
      secretKeys: {
        type: [String],
        default: []
      },
      maxRetries: {
        type: Number,
        default: 0,
        min: 0
      },
      retryDelayMs: {
        type: Number,
        default: DEFAULT_RETRY_DELAY_MS,
        min: 0
      },
      retryBackoffFactor: {
        type: Number,
        default: DEFAULT_RETRY_BACKOFF_FACTOR,
        min: 1
      },
      retryCount: {
        type: Number,
        default: 0,
        min: 0
      },
      cleanupTempOnFinish: {
        type: Boolean,
        default: false
      },
      controlState: {
        type: String,
        enum: {
          values: CONTROL_STATE_VALUES,
          message: 'Invalid task controlState "{VALUE}"'
        },
        default: CONTROL_STATES.NORMAL,
        index: true
      },
      hostId: {
        type: String,
        default: () => getHostId(),
        index: true
      },
      timeoutMs: {
        type: Number,
        default: 0,
        min: [0, 'timeoutMs cannot be negative']
      },
      killGraceMs: {
        type: Number,
        default: null
      },
      pollIntervalMs: {
        type: Number,
        default: null
      },
      startedAt: {
        type: Number,
        default: null
      },
      finishedAt: {
        type: Number,
        default: null
      },
      durationMs: {
        type: Number,
        default: null
      }
    },
    {
      collection: COLLECTIONS.TASK,
      timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
        currentTime: () => Date.now()
      },
      versionKey: false
    }
  );

  TaskSchema.index({ batchId: 1, order: 1 }, { name: 'idx_task_batchId_order' });
  TaskSchema.index({ runnerId: 1, order: 1 }, { name: 'idx_task_runnerId_order' });
  TaskSchema.index({ status: 1, pid: 1 }, { name: 'idx_task_status_pid' });
  TaskSchema.index({ mapId: 1, status: 1 }, { name: 'idx_task_mapId_status' });

  // --------------------------------------------------------------------------
  // Tier 3 Nested Logs: Bucketed Log Schema (`log` Collection)
  // --------------------------------------------------------------------------
  const LogBucketSchema = Schema(
    {
      mapId: {
        type: Schema.Types.Mixed,
        default: null,
        index: true
      },
      runnerId: {
        type: Schema.Types.ObjectId,
        ref: COLLECTIONS.RUNNER,
        default: null,
        index: true
      },
      batchId: {
        type: Schema.Types.ObjectId,
        ref: COLLECTIONS.BATCH,
        default: null,
        index: true
      },
      taskId: {
        type: Schema.Types.ObjectId,
        ref: COLLECTIONS.TASK,
        default: null,
        index: true
      },
      hostId: {
        type: String,
        default: () => getHostId(),
        index: true
      },
      count: {
        type: Number,
        required: true,
        default: 0,
        min: [0, 'Bucket count cannot be negative'],
        max: [BUCKET_SIZE, `Bucket count cannot exceed BUCKET_SIZE (${BUCKET_SIZE})`]
      },
      ud: {
        type: UserDetailSchema,
        required: [true, 'User session details (ud) are required']
      },
      logs: {
        type: [LogEntrySchema],
        default: [],
        validate: {
          validator: (arr) => Array.isArray(arr) && arr.length <= BUCKET_SIZE,
          message: `Log bucket entries cannot exceed ${BUCKET_SIZE} items`
        }
      }
    },
    {
      collection: COLLECTIONS.LOG,
      timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
        currentTime: () => Date.now()
      },
      versionKey: false
    }
  );

  // Hot-path compound index for appendLogsToDb findOneAndUpdate({ ..., count: { $lt: 500 } }, ..., { sort: { _id: -1 }, upsert: true })
  LogBucketSchema.index(
    { taskId: 1, runnerId: 1, batchId: 1, mapId: 1, count: 1, _id: -1 },
    { name: 'idx_log_bucket_upsert_hotpath' }
  );
  LogBucketSchema.index({ taskId: 1, _id: 1 }, { name: 'idx_log_taskId' });
  LogBucketSchema.index({ batchId: 1, _id: 1 }, { name: 'idx_log_batchId' });
  LogBucketSchema.index({ runnerId: 1, _id: 1 }, { name: 'idx_log_runnerId' });
  LogBucketSchema.index({ mapId: 1, _id: 1 }, { name: 'idx_log_mapId' });

  return {
    UserDetailSchema,
    LogEntrySchema,
    RunnerSchema,
    BatchSchema,
    TaskSchema,
    LogBucketSchema
  };
};

// Instantiate default Mongoose schemas
const defaultSchemas = exports.createMongooseSchemas();

exports.UserDetailSchema = defaultSchemas.UserDetailSchema;
exports.LogEntrySchema = defaultSchemas.LogEntrySchema;
exports.RunnerSchema = defaultSchemas.RunnerSchema;
exports.BatchSchema = defaultSchemas.BatchSchema;
exports.TaskSchema = defaultSchemas.TaskSchema;
exports.LogBucketSchema = defaultSchemas.LogBucketSchema;

// Register and retrieve Mongoose Models on a Mongoose instance or connection
exports.registerMongooseModels = (customMongoose) => {
  const mg = resolveMongoose(customMongoose);
  const schemas = customMongoose ? exports.createMongooseSchemas(customMongoose) : defaultSchemas;
  const modelsRegistry = mg.models || Object.create(null);

  const RunnerModel = modelsRegistry[COLLECTIONS.RUNNER] ||
    mg.model(COLLECTIONS.RUNNER, schemas.RunnerSchema, COLLECTIONS.RUNNER);

  const BatchModel = modelsRegistry[COLLECTIONS.BATCH] ||
    mg.model(COLLECTIONS.BATCH, schemas.BatchSchema, COLLECTIONS.BATCH);

  const TaskModel = modelsRegistry[COLLECTIONS.TASK] ||
    mg.model(COLLECTIONS.TASK, schemas.TaskSchema, COLLECTIONS.TASK);

  const LogBucketModel = modelsRegistry[COLLECTIONS.LOG] ||
    mg.model(COLLECTIONS.LOG, schemas.LogBucketSchema, COLLECTIONS.LOG);

  return {
    [COLLECTIONS.RUNNER]: RunnerModel,
    [COLLECTIONS.BATCH]: BatchModel,
    [COLLECTIONS.TASK]: TaskModel,
    [COLLECTIONS.LOG]: LogBucketModel,
    RunnerModel,
    BatchModel,
    TaskModel,
    LogBucketModel
  };
};

const defaultModels = exports.registerMongooseModels();
exports.RunnerModel = defaultModels.RunnerModel;
exports.BatchModel = defaultModels.BatchModel;
exports.TaskModel = defaultModels.TaskModel;
exports.LogBucketModel = defaultModels.LogBucketModel;

exports.MONGOOSE_SCHEMA_DEFS = {
  [COLLECTIONS.RUNNER]: exports.RunnerSchema.obj,
  [COLLECTIONS.BATCH]: exports.BatchSchema.obj,
  [COLLECTIONS.TASK]: exports.TaskSchema.obj,
  [COLLECTIONS.LOG]: exports.LogBucketSchema.obj
};

// ============================================================================
// 2. MongoDB Native $jsonSchema & Index Specifications
// ============================================================================

exports.RUNNER_JSON_SCHEMA = {
  bsonType: 'object',
  required: ['mapId', 'status', 'controlState', 'ud', 'totalBatches', 'currentBatchIndex'],
  additionalProperties: true,
  properties: {
    _id: { description: 'Unique Runner ID (ObjectId)' },
    mapId: { bsonType: ['string', 'objectId'] },
    name: { bsonType: ['string', 'null'] },
    status: { enum: RUNNER_STATUS_VALUES },
    controlState: { enum: CONTROL_STATE_VALUES },
    ud: {
      bsonType: 'object',
      required: ['uId', 'aId'],
      properties: {
        uId: { bsonType: ['string', 'objectId'] },
        aId: { bsonType: ['string', 'objectId'] }
      }
    },
    totalBatches: { bsonType: ['int', 'long', 'double'], minimum: 0 },
    currentBatchIndex: { bsonType: ['int', 'long', 'double'], minimum: 0 }
  }
};

exports.BATCH_JSON_SCHEMA = {
  bsonType: 'object',
  required: ['runnerId', 'mapId', 'name', 'mode', 'status', 'order'],
  additionalProperties: true,
  properties: {
    _id: { description: 'Unique Batch ID (ObjectId)' },
    runnerId: { bsonType: ['string', 'objectId'] },
    mapId: { bsonType: ['string', 'objectId'] },
    name: { bsonType: 'string' },
    mode: { enum: BATCH_MODE_VALUES },
    maxQueueConcurrency: { bsonType: ['int', 'long', 'double'], minimum: 1 },
    requiresApproval: { bsonType: 'bool' },
    approvalStatus: { enum: APPROVAL_STATUS_ENUM },
    approvalTimeoutMs: { bsonType: ['int', 'long', 'double'], minimum: 0 },
    status: { enum: BATCH_STATUS_VALUES },
    order: { bsonType: ['int', 'long', 'double'], minimum: 0 }
  }
};

exports.TASK_JSON_SCHEMA = {
  bsonType: 'object',
  required: ['batchId', 'runnerId', 'mapId', 'cmd', 'byteOffset', 'status'],
  additionalProperties: true,
  properties: {
    _id: { description: 'Unique Task ID (ObjectId)' },
    batchId: { bsonType: ['string', 'objectId'] },
    runnerId: { bsonType: ['string', 'objectId'] },
    mapId: { bsonType: ['string', 'objectId'] },
    cmd: { bsonType: 'string', minLength: 1 },
    scriptPath: { bsonType: ['string', 'null'] },
    script: { bsonType: ['string', 'null'] },
    args: { bsonType: ['array', 'null'] },
    shell: { bsonType: ['string', 'null'] },
    cwd: { bsonType: ['string', 'null'] },
    env: { bsonType: ['object', 'null'] },
    pid: { bsonType: ['int', 'long', 'double', 'null'] },
    exitCode: { bsonType: ['int', 'long', 'double', 'null'] },
    byteOffset: { bsonType: ['int', 'long', 'double'], minimum: 0 },
    status: { enum: TASK_STATUS_VALUES }
  }
};

exports.LOG_BUCKET_JSON_SCHEMA = {
  bsonType: 'object',
  required: ['mapId', 'runnerId', 'batchId', 'taskId', 'count', 'ud', 'logs'],
  additionalProperties: true,
  properties: {
    _id: { description: 'Unique Log Bucket ID (ObjectId)' },
    mapId: { bsonType: ['string', 'objectId', 'null'] },
    runnerId: { bsonType: ['string', 'objectId', 'null'] },
    batchId: { bsonType: ['string', 'objectId', 'null'] },
    taskId: { bsonType: ['string', 'objectId', 'null'] },
    count: { bsonType: ['int', 'long', 'double'], minimum: 0, maximum: BUCKET_SIZE },
    ud: {
      bsonType: 'object',
      required: ['uId', 'aId'],
      properties: {
        uId: { bsonType: ['string', 'objectId'] },
        aId: { bsonType: ['string', 'objectId'] }
      }
    },
    logs: {
      bsonType: 'array',
      maxItems: BUCKET_SIZE
    }
  }
};

exports.COLLECTION_INDEXES = {
  [COLLECTIONS.RUNNER]: [
    { key: { mapId: 1, createdAt: -1 }, name: 'idx_runner_mapId_createdAt' },
    { key: { status: 1, controlState: 1 }, name: 'idx_runner_status_controlState' },
    { key: { 'ud.aId': 1, 'ud.uId': 1, createdAt: -1 }, name: 'idx_runner_ud_createdAt' }
  ],
  [COLLECTIONS.BATCH]: [
    { key: { runnerId: 1, order: 1 }, name: 'idx_batch_runnerId_order' },
    { key: { runnerId: 1, status: 1 }, name: 'idx_batch_runnerId_status' },
    { key: { mapId: 1, runnerId: 1 }, name: 'idx_batch_mapId_runnerId' }
  ],
  [COLLECTIONS.TASK]: [
    { key: { batchId: 1, order: 1 }, name: 'idx_task_batchId_order' },
    { key: { runnerId: 1, order: 1 }, name: 'idx_task_runnerId_order' },
    { key: { status: 1, pid: 1 }, name: 'idx_task_status_pid' },
    { key: { mapId: 1, status: 1 }, name: 'idx_task_mapId_status' }
  ],
  [COLLECTIONS.LOG]: [
    {
      key: { taskId: 1, runnerId: 1, batchId: 1, mapId: 1, count: 1, _id: -1 },
      name: 'idx_log_bucket_upsert_hotpath'
    },
    { key: { taskId: 1, _id: 1 }, name: 'idx_log_taskId' },
    { key: { batchId: 1, _id: 1 }, name: 'idx_log_batchId' },
    { key: { runnerId: 1, _id: 1 }, name: 'idx_log_runnerId' },
    { key: { mapId: 1, _id: 1 }, name: 'idx_log_mapId' }
  ]
};

exports.COLLECTION_VALIDATORS = {
  [COLLECTIONS.RUNNER]: exports.RUNNER_JSON_SCHEMA,
  [COLLECTIONS.BATCH]: exports.BATCH_JSON_SCHEMA,
  [COLLECTIONS.TASK]: exports.TASK_JSON_SCHEMA,
  [COLLECTIONS.LOG]: exports.LOG_BUCKET_JSON_SCHEMA
};

// ============================================================================
// 3. Functional Document Builders & Validators
// ============================================================================

exports.validateRunnerDoc = (doc) => {
  const errors = [];
  if (!doc || typeof doc !== 'object') {
    return { valid: false, errors: ['Runner document must be an object'] };
  }
  if (!doc.mapId) {
    errors.push('mapId is required');
  }
  if (!RUNNER_STATUS_VALUES.includes(doc.status)) {
    errors.push(`Invalid runner status "${doc.status}". Allowed: ${RUNNER_STATUS_VALUES.join(', ')}`);
  }
  if (!CONTROL_STATE_VALUES.includes(doc.controlState)) {
    errors.push(`Invalid controlState "${doc.controlState}". Allowed: ${CONTROL_STATE_VALUES.join(', ')}`);
  }
  if (!doc.ud || typeof doc.ud !== 'object' || !doc.ud.uId || !doc.ud.aId) {
    errors.push('ud ({ uId, aId }) is required');
  }
  if (typeof doc.totalBatches !== 'number' || doc.totalBatches < 0) {
    errors.push('totalBatches must be a non-negative number');
  }
  if (typeof doc.currentBatchIndex !== 'number' || doc.currentBatchIndex < 0) {
    errors.push('currentBatchIndex must be a non-negative number');
  }
  return { valid: errors.length === 0, errors };
};

exports.validateBatchDoc = (doc) => {
  const errors = [];
  if (!doc || typeof doc !== 'object') {
    return { valid: false, errors: ['Batch document must be an object'] };
  }
  if (!doc.runnerId) {
    errors.push('runnerId is required');
  }
  if (!doc.mapId) {
    errors.push('mapId is required');
  }
  if (!doc.name || typeof doc.name !== 'string') {
    errors.push('name must be a non-empty string');
  }
  if (!BATCH_MODE_VALUES.includes(doc.mode)) {
    errors.push(`Invalid batch mode "${doc.mode}". Allowed: ${BATCH_MODE_VALUES.join(', ')}`);
  }
  if (!BATCH_STATUS_VALUES.includes(doc.status)) {
    errors.push(`Invalid batch status "${doc.status}". Allowed: ${BATCH_STATUS_VALUES.join(', ')}`);
  }
  if (
    doc.approvalStatus !== undefined &&
    doc.approvalStatus !== null &&
    !APPROVAL_STATUS_VALUES.includes(doc.approvalStatus)
  ) {
    errors.push(`Invalid batch approvalStatus "${doc.approvalStatus}". Allowed: ${APPROVAL_STATUS_VALUES.join(', ')}, null`);
  }
  if (typeof doc.order !== 'number' || doc.order < 0) {
    errors.push('order must be a non-negative number');
  }
  return { valid: errors.length === 0, errors };
};

exports.validateTaskDoc = (doc) => {
  const errors = [];
  if (!doc || typeof doc !== 'object') {
    return { valid: false, errors: ['Task document must be an object'] };
  }
  if (!doc.batchId) {
    errors.push('batchId is required');
  }
  if (!doc.runnerId) {
    errors.push('runnerId is required');
  }
  if (!doc.mapId) {
    errors.push('mapId is required');
  }
  if (!doc.cmd || typeof doc.cmd !== 'string' || doc.cmd.trim() === '') {
    errors.push('cmd must be a non-empty shell command string');
  }
  if (typeof doc.byteOffset !== 'number' || doc.byteOffset < 0) {
    errors.push('byteOffset must be a non-negative number');
  }
  if (!TASK_STATUS_VALUES.includes(doc.status)) {
    errors.push(`Invalid task status "${doc.status}". Allowed: ${TASK_STATUS_VALUES.join(', ')}`);
  }
  return { valid: errors.length === 0, errors };
};

exports.validateLogBucketDoc = (doc) => {
  const errors = [];
  if (!doc || typeof doc !== 'object') {
    return { valid: false, errors: ['Log bucket document must be an object'] };
  }
  if (typeof doc.count !== 'number' || doc.count < 0 || doc.count > BUCKET_SIZE) {
    errors.push(`count must be between 0 and ${BUCKET_SIZE}`);
  }
  if (!doc.ud || typeof doc.ud !== 'object' || !doc.ud.uId || !doc.ud.aId) {
    errors.push('ud ({ uId, aId }) is required');
  }
  if (!Array.isArray(doc.logs)) {
    errors.push('logs must be an array');
  } else if (doc.logs.length > BUCKET_SIZE) {
    errors.push(`logs array cannot exceed BUCKET_SIZE (${BUCKET_SIZE})`);
  } else {
    for (let i = 0; i < doc.logs.length; i += 1) {
      const entry = doc.logs[i];
      if (!entry || typeof entry.type !== 'string' || typeof entry.msg !== 'string' || typeof entry.ts !== 'number') {
        errors.push(`logs[${i}] must contain { type: String, msg: String, ts: Number }`);
        break;
      }
    }
  }
  return { valid: errors.length === 0, errors };
};

exports.buildRunnerDoc = (req, input = {}) => {
  const now = Date.now();
  return {
    _id: input._id || input.runnerId || generateId(req),
    mapId: input.mapId || generateId(req),
    name: input.name || null,
    status: input.status || RUNNER_STATUS.TRIGGERED,
    controlState: input.controlState || CONTROL_STATES.NORMAL,
    ud: input.ud || { uId: 'system', aId: 'system' },
    totalBatches: Number(input.totalBatches || 0),
    currentBatchIndex: Number(input.currentBatchIndex || 0),
    replayCount: Number(input.replayCount || 0),
    outputs: input.outputs && typeof input.outputs === 'object' ? { ...input.outputs } : {},
    secretKeys: Array.isArray(input.secretKeys) ? input.secretKeys : [],
    concurrencyPolicy: input.concurrencyPolicy || CONCURRENCY_POLICIES.ALLOW,
    cleanupTempOnFinish: Boolean(input.cleanupTempOnFinish),
    webhookUrl: input.webhookUrl || null,
    hostId: input.hostId || getHostId(req),
    startedAt: input.startedAt || null,
    finishedAt: input.finishedAt || null,
    scheduledAt: input.scheduledAt || null,
    durationMs: input.durationMs !== undefined ? input.durationMs : null,
    createdAt: input.createdAt || now,
    updatedAt: input.updatedAt || now
  };
};

exports.buildBatchDoc = (req, input = {}) => {
  const now = Date.now();
  return {
    _id: input._id || input.batchId || generateId(req),
    runnerId: input.runnerId,
    mapId: input.mapId,
    name: input.name || 'Batch Stage',
    mode: input.mode === BATCH_MODES.PARALLEL ? BATCH_MODES.PARALLEL : BATCH_MODES.QUEUE,
    maxQueueConcurrency: Math.max(1, Number(input.maxQueueConcurrency || DEFAULT_CONCURRENCY)),
    continueOnError: Boolean(input.continueOnError),
    when: input.when || null,
    requiresApproval: Boolean(input.requiresApproval),
    approvalStatus:
      input.approvalStatus !== undefined
        ? input.approvalStatus
        : input.requiresApproval
          ? APPROVAL_STATUS.PENDING
          : APPROVAL_STATUS.NONE,
    approvedBy: input.approvedBy || null,
    approvedAt: input.approvedAt || null,
    rejectedBy: input.rejectedBy || null,
    rejectedAt: input.rejectedAt || null,
    approvalComment: input.approvalComment || null,
    approvalTimeoutMs: Math.max(0, Number(input.approvalTimeoutMs || 0)),
    matrix: input.matrix || null,
    status: input.status || BATCH_STATUS.QUEUED,
    order: typeof input.order === 'number' ? input.order : 0,
    startedAt: input.startedAt || null,
    finishedAt: input.finishedAt || null,
    durationMs: input.durationMs !== undefined ? input.durationMs : null,
    createdAt: input.createdAt || now,
    updatedAt: input.updatedAt || now
  };
};

exports.buildTaskDoc = (req, input = {}) => {
  const now = Date.now();
  return {
    _id: input._id || input.taskId || generateId(req),
    batchId: input.batchId,
    runnerId: input.runnerId,
    mapId: input.mapId,
    name: input.name || input.scriptPath || input.cmd || 'Command Task',
    cmd: input.cmd,
    scriptPath: input.scriptPath || input.file || null,
    script: input.script || input.inlineScript || null,
    args: Array.isArray(input.args) ? input.args.map(String) : [],
    shell: input.shell || null,
    cwd: input.cwd || process.cwd(),
    env: input.env || {},
    outputs: input.outputs && typeof input.outputs === 'object' ? { ...input.outputs } : {},
    when: input.when || null,
    matrixValues: input.matrixValues || null,
    secretKeys: Array.isArray(input.secretKeys) ? input.secretKeys : [],
    maxRetries: Math.max(0, Number(input.maxRetries || 0)),
    retryDelayMs: Number(input.retryDelayMs || DEFAULT_RETRY_DELAY_MS),
    retryBackoffFactor: Number(input.retryBackoffFactor || DEFAULT_RETRY_BACKOFF_FACTOR),
    retryCount: Number(input.retryCount || 0),
    cleanupTempOnFinish: Boolean(input.cleanupTempOnFinish),
    controlState: input.controlState || CONTROL_STATES.NORMAL,
    hostId: input.hostId || getHostId(req),
    pid: input.pid !== undefined ? input.pid : null,
    exitCode: input.exitCode !== undefined ? input.exitCode : null,
    byteOffset: Number(input.byteOffset || 0),
    status: input.status || TASK_STATUS.QUEUED,
    order: typeof input.order === 'number' ? input.order : 0,
    timeoutMs: Number(input.timeoutMs || 0),
    killGraceMs: input.killGraceMs || null,
    pollIntervalMs: input.pollIntervalMs || null,
    startedAt: input.startedAt || null,
    finishedAt: input.finishedAt || null,
    durationMs: input.durationMs !== undefined ? input.durationMs : null,
    createdAt: input.createdAt || now,
    updatedAt: input.updatedAt || now
  };
};

exports.buildLogBucketDoc = (req, input = {}) => {
  const now = Date.now();
  const logs = Array.isArray(input.logs) ? input.logs.slice(0, BUCKET_SIZE) : [];
  return {
    _id: input._id || generateId(req),
    mapId: input.mapId || null,
    runnerId: input.runnerId || null,
    batchId: input.batchId || null,
    taskId: input.taskId || null,
    hostId: input.hostId || getHostId(req),
    count: typeof input.count === 'number' ? input.count : logs.length,
    ud: input.ud || { uId: 'system', aId: 'system' },
    logs,
    createdAt: input.createdAt || now,
    updatedAt: input.updatedAt || now
  };
};

exports.ensureSchemasAndIndexes = async (req, options = {}) => {
  const db = (req && req.db) || (req && req.app && req.app.locals && req.app.locals.db) || req;
  if (!db) {
    throw Error('ensureSchemasAndIndexes requires a valid database instance on req.db');
  }

  const validationLevel = options.validationLevel || 'moderate';
  const validationAction = options.validationAction || 'error';
  const collectionNames = Object.values(COLLECTIONS);
  const results = {};

  for (let i = 0; i < collectionNames.length; i += 1) {
    const colName = collectionNames[i];
    const jsonSchema = exports.COLLECTION_VALIDATORS[colName];
    const baseSpecs = exports.COLLECTION_INDEXES[colName] || [];
    const indexSpecs = baseSpecs.slice();

    if (colName === COLLECTIONS.LOG && Number(options.logTtlSeconds) > 0) {
      indexSpecs.push({
        key: { createdAt: 1 },
        name: 'idx_log_ttl',
        expireAfterSeconds: Number(options.logTtlSeconds)
      });
    }

    if (typeof db.createCollection === 'function' && options.applyValidators !== false) {
      try {
        await db.createCollection(colName, {
          validator: { $jsonSchema: jsonSchema },
          validationLevel,
          validationAction
        });
      } catch (_createErr) {
        if (typeof db.command === 'function') {
          try {
            await db.command({
              collMod: colName,
              validator: { $jsonSchema: jsonSchema },
              validationLevel,
              validationAction
            });
          } catch (_modErr) {
            // Ignore collMod error on mock/restricted DBs
          }
        }
      }
    }

    const col = getCollection(req, colName);
    const createdIndexes = [];

    if (col && typeof col.createIndexes === 'function' && indexSpecs.length > 0) {
      await col.createIndexes(indexSpecs);
      createdIndexes.push(...indexSpecs.map((s) => s.name));
    } else if (col && typeof col.createIndex === 'function') {
      for (let j = 0; j < indexSpecs.length; j += 1) {
        const spec = indexSpecs[j];
        const idxOpts = { name: spec.name };
        if (spec.expireAfterSeconds !== undefined) {
          idxOpts.expireAfterSeconds = spec.expireAfterSeconds;
        }
        await col.createIndex(spec.key, idxOpts);
        createdIndexes.push(spec.name);
      }
    }

    results[colName] = {
      validatorApplied: true,
      indexes: createdIndexes,
      eventTypesSupported: EVENT_TYPE_VALUES.length
    };
  }

  return results;
};
