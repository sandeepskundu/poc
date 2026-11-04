'use strict';

const constants = require('./constants');
const processUtils = require('./process');
const logger = require('./logger');
const broadcaster = require('./broadcaster');
const watcher = require('./watcher');
const scheduler = require('./scheduler');
const schemas = require('./schemas');

// 1. Constants & Helpers
exports.LOG_DIR = constants.LOG_DIR;
exports.BUCKET_SIZE = constants.BUCKET_SIZE;
exports.HEARTBEAT_MS = constants.HEARTBEAT_MS;
exports.FLUSH_INTERVAL_MS = constants.FLUSH_INTERVAL_MS;
exports.KILL_GRACE_MS = constants.KILL_GRACE_MS;
exports.DEFAULT_CONCURRENCY = constants.DEFAULT_CONCURRENCY;
exports.DEFAULT_RETRY_DELAY_MS = constants.DEFAULT_RETRY_DELAY_MS;
exports.DEFAULT_RETRY_BACKOFF_FACTOR = constants.DEFAULT_RETRY_BACKOFF_FACTOR;
exports.DEFAULT_TEMP_RETENTION_MS = constants.DEFAULT_TEMP_RETENTION_MS;
exports.REDACTION_MASK = constants.REDACTION_MASK;
exports.DEFAULT_SECRET_KEY_PATTERN = constants.DEFAULT_SECRET_KEY_PATTERN;
exports.COLLECTIONS = constants.COLLECTIONS;
exports.EVENT_TYPES = constants.EVENT_TYPES;
exports.RUNNER_STATUS = constants.RUNNER_STATUS;
exports.CONTROL_STATES = constants.CONTROL_STATES;
exports.BATCH_STATUS = constants.BATCH_STATUS;
exports.BATCH_MODES = constants.BATCH_MODES;
exports.APPROVAL_STATUS = constants.APPROVAL_STATUS;
exports.TASK_STATUS = constants.TASK_STATUS;
exports.CONCURRENCY_POLICIES = constants.CONCURRENCY_POLICIES;
exports.WHEN_CONDITIONS = constants.WHEN_CONDITIONS;
exports.DEFAULT_HOST_ID = constants.DEFAULT_HOST_ID;
exports.CLUSTER_MODES = constants.CLUSTER_MODES;
exports.DEFAULT_REDIS_ENABLED = constants.DEFAULT_REDIS_ENABLED;
exports.DEFAULT_REDIS_CHANNEL = constants.DEFAULT_REDIS_CHANNEL;
exports.DEFAULT_CLUSTER_POLL_MS = constants.DEFAULT_CLUSTER_POLL_MS;
exports.getHostId = constants.getHostId;
exports.setHostId = constants.setHostId;
exports.ensureLogDir = constants.ensureLogDir;
exports.getLogFilePath = constants.getLogFilePath;
exports.getScriptFilePath = constants.getScriptFilePath;
exports.cleanupTaskFiles = constants.cleanupTaskFiles;
exports.cleanupStaleTempFiles = constants.cleanupStaleTempFiles;
exports.generateId = constants.generateId;
exports.normalizeId = constants.normalizeId;
exports.idsEqual = constants.idsEqual;
exports.getCollection = constants.getCollection;

// 2. Process & Shell Script Execution Management
exports.escapeShellArg = processUtils.escapeShellArg;
exports.prepareTaskCommand = processUtils.prepareTaskCommand;
exports.spawnShellProcess = processUtils.spawnShellProcess;
exports.isPidAlive = processUtils.isPidAlive;
exports.sendGroupSignal = processUtils.sendGroupSignal;
exports.suspendProcessTree = processUtils.suspendProcessTree;
exports.resumeProcessTree = processUtils.resumeProcessTree;
exports.killProcessTree = processUtils.killProcessTree;

// 3. Logger, Secret Masking & DB Log Bucketing
exports.setSessionProvider = logger.setSessionProvider;
exports.user = logger.user;
exports.extractSecretValues = logger.extractSecretValues;
exports.maskSecrets = logger.maskSecrets;
exports.parseLogLine = logger.parseLogLine;
exports.parseLogChunk = logger.parseLogChunk;
exports.appendLogsToDb = logger.appendLogsToDb;
exports.resolveTierContext = logger.resolveTierContext;
exports.recordLifecycleEvent = logger.recordLifecycleEvent;

// 4. Real-Time SSE Broadcaster, Multi-Node Cluster Mode & Watcher Registry
exports.activeWatchers = broadcaster.activeWatchers;
exports.activeStreams = broadcaster.activeStreams;
exports.configureCluster = broadcaster.configureCluster;
exports.getClusterConfig = broadcaster.getClusterConfig;
exports.createInMemoryRedisBus = broadcaster.createInMemoryRedisBus;
exports.publishControlSignal = broadcaster.publishControlSignal;
exports.pollClientMongoBuckets = broadcaster.pollClientMongoBuckets;
exports.registerWatcher = broadcaster.registerWatcher;
exports.getWatcher = broadcaster.getWatcher;
exports.unregisterWatcher = broadcaster.unregisterWatcher;
exports.getWatchersByBatch = broadcaster.getWatchersByBatch;
exports.getWatchersByRunner = broadcaster.getWatchersByRunner;
exports.getAllWatchers = broadcaster.getAllWatchers;
exports.matchesStreamFilter = broadcaster.matchesStreamFilter;
exports.broadcast = broadcaster.broadcast;
exports.replayStreamHistory = broadcaster.replayStreamHistory;
exports.attachStream = broadcaster.attachStream;

// 5. Task File Watcher & Watchdog
exports.flushFileToDb = watcher.flushFileToDb;
exports.pauseWatcherTimeout = watcher.pauseWatcherTimeout;
exports.resumeWatcherTimeout = watcher.resumeWatcherTimeout;
exports.reconcileWatcherControlState = watcher.reconcileWatcherControlState;
exports.finalizeTaskWatcher = watcher.finalizeTaskWatcher;
exports.ensureTaskWatcher = watcher.ensureTaskWatcher;

// 6. Scheduler & Multi-Level Control Interface
exports.registerLifecycleHook = scheduler.registerLifecycleHook;
exports.clearLifecycleHooks = scheduler.clearLifecycleHooks;
exports.dispatchRunnerWebhook = scheduler.dispatchRunnerWebhook;
exports.cleanupRunnerFiles = scheduler.cleanupRunnerFiles;
exports.getActiveRunnersByMapId = scheduler.getActiveRunnersByMapId;
exports.getRunner = scheduler.getRunner;
exports.listRunners = scheduler.listRunners;
exports.getScheduledRunners = scheduler.getScheduledRunners;
exports.getPausedRunners = scheduler.getPausedRunners;
exports.getAwaitingApprovalRunners = scheduler.getAwaitingApprovalRunners;
exports.getFailedRunners = scheduler.getFailedRunners;
exports.cancelScheduledRunners = scheduler.cancelScheduledRunners;
exports.stopRunners = scheduler.stopRunners;
exports.getBatch = scheduler.getBatch;
exports.listBatches = scheduler.listBatches;
exports.getSkippableBatches = scheduler.getSkippableBatches;
exports.getAwaitingApprovalBatches = scheduler.getAwaitingApprovalBatches;
exports.getPendingApprovalBatches = scheduler.getPendingApprovalBatches;
exports.getFailedBatches = scheduler.getFailedBatches;
exports.skipBatches = scheduler.skipBatches;
exports.approveBatches = scheduler.approveBatches;
exports.rejectBatches = scheduler.rejectBatches;
exports.getTask = scheduler.getTask;
exports.listTasks = scheduler.listTasks;
exports.getPausedTasks = scheduler.getPausedTasks;
exports.getRunningTasks = scheduler.getRunningTasks;
exports.getFailedTasks = scheduler.getFailedTasks;
exports.pauseTasks = scheduler.pauseTasks;
exports.resumeTasks = scheduler.resumeTasks;
exports.evaluateWhenCondition = scheduler.evaluateWhenCondition;
exports.expandMatrixTasks = scheduler.expandMatrixTasks;
exports.executeTask = scheduler.executeTask;
exports.runBatch = scheduler.runBatch;
exports.executeRunner = scheduler.executeRunner;
exports.triggerRunner = scheduler.triggerRunner;
exports.skipTask = scheduler.skipTask;
exports.skipBatch = scheduler.skipBatch;
exports.stopTask = scheduler.stopTask;
exports.stopBatch = scheduler.stopBatch;
exports.stopRunner = scheduler.stopRunner;
exports.pauseTask = scheduler.pauseTask;
exports.resumeTask = scheduler.resumeTask;
exports.pauseRunner = scheduler.pauseRunner;
exports.resumeRunner = scheduler.resumeRunner;
exports.replayTask = scheduler.replayTask;
exports.replayBatch = scheduler.replayBatch;
exports.replayRunner = scheduler.replayRunner;
exports.approveBatch = scheduler.approveBatch;
exports.rejectBatch = scheduler.rejectBatch;
exports.expireBatchApproval = scheduler.expireBatchApproval;
exports.getRunnerMetrics = scheduler.getRunnerMetrics;
exports.resumeRunningJobsOnBoot = scheduler.resumeRunningJobsOnBoot;

// 7. Tiered Query Utilities (Application/mapId, Pipeline/runnerId, Stage/batchId, Step/taskId + Filtering & Pagination)
exports.queryLogs = async (req, queryFilters = {}) => {
  const logCol = constants.getCollection(req, constants.COLLECTIONS.LOG);
  const filter = {};
  if (queryFilters.mapId !== undefined && queryFilters.mapId !== null) {
    filter.mapId = queryFilters.mapId;
  }
  if (queryFilters.runnerId !== undefined && queryFilters.runnerId !== null) {
    filter.runnerId = queryFilters.runnerId;
  }
  if (queryFilters.batchId !== undefined && queryFilters.batchId !== null) {
    filter.batchId = queryFilters.batchId;
  }
  if (queryFilters.taskId !== undefined && queryFilters.taskId !== null) {
    filter.taskId = queryFilters.taskId;
  }

  let buckets = [];
  if (logCol && typeof logCol.find === 'function') {
    const res = await logCol.find(filter);
    if (Array.isArray(res)) {
      buckets = res;
    } else if (res && typeof res.sort === 'function') {
      const sorted = res.sort({ _id: 1 });
      buckets = typeof sorted.toArray === 'function' ? await sorted.toArray() : [];
    } else if (res && typeof res.toArray === 'function') {
      buckets = await res.toArray();
    }
  }

  const allowedTypes = queryFilters.type
    ? (Array.isArray(queryFilters.type)
      ? queryFilters.type.map((t) => String(t).trim().toLowerCase())
      : String(queryFilters.type).split(',').map((t) => t.trim().toLowerCase()).filter(Boolean))
    : null;

  const searchLower = queryFilters.search && typeof queryFilters.search === 'string'
    ? queryFilters.search.toLowerCase()
    : null;

  const afterTs = Number(queryFilters.afterTs || 0);
  const beforeTs = Number(queryFilters.beforeTs || 0);

  const matchedLogs = [];
  for (let i = 0; i < buckets.length; i += 1) {
    const b = buckets[i];
    if (b && Array.isArray(b.logs)) {
      for (let j = 0; j < b.logs.length; j += 1) {
        const entry = b.logs[j];
        if (!entry) {
          continue;
        }
        if (allowedTypes && allowedTypes.length > 0 && !allowedTypes.includes(String(entry.type).toLowerCase())) {
          continue;
        }
        if (afterTs > 0 && Number(entry.ts || 0) <= afterTs) {
          continue;
        }
        if (beforeTs > 0 && Number(entry.ts || 0) > beforeTs) {
          continue;
        }
        if (searchLower && !String(entry.msg || '').toLowerCase().includes(searchLower)) {
          continue;
        }
        matchedLogs.push({
          ...entry,
          mapId: b.mapId,
          runnerId: b.runnerId,
          batchId: b.batchId,
          taskId: b.taskId
        });
      }
    }
  }

  const totalLogs = matchedLogs.length;
  const offset = Math.max(0, Number(queryFilters.offset !== undefined ? queryFilters.offset : (queryFilters.skip || 0)));
  const limit = Number(queryFilters.limit || 0);

  const paginatedLogs = limit > 0
    ? matchedLogs.slice(offset, offset + limit)
    : (offset > 0 ? matchedLogs.slice(offset) : matchedLogs);

  const hasMore = limit > 0 ? (offset + limit < totalLogs) : false;

  return {
    buckets,
    logs: paginatedLogs,
    totalLogs,
    offset,
    limit: limit > 0 ? limit : totalLogs,
    hasMore
  };
};

exports.exportRunnerLogs = async (req, queryFilters = {}, options = {}) => {
  const format = String(options.format || queryFilters.format || 'txt').toLowerCase();
  const queryResult = await exports.queryLogs(req, queryFilters);
  const logs = queryResult.logs || [];

  const scopeId = queryFilters.taskId || queryFilters.batchId || queryFilters.runnerId || queryFilters.mapId || 'pipeline';
  const safeScope = String(scopeId).replace(/[^a-zA-Z0-9_-]/g, '_');

  if (format === 'json') {
    return {
      format: 'json',
      contentType: 'application/json; charset=utf-8',
      filename: `${safeScope}-logs.json`,
      content: JSON.stringify(logs, null, 2),
      totalLogs: logs.length
    };
  }

  if (format === 'ndjson') {
    const lines = logs.map((entry) => JSON.stringify(entry));
    return {
      format: 'ndjson',
      contentType: 'application/x-ndjson; charset=utf-8',
      filename: `${safeScope}-logs.ndjson`,
      content: lines.join('\n') + (lines.length > 0 ? '\n' : ''),
      totalLogs: logs.length
    };
  }

  const dtf = Intl.DateTimeFormat('sv-SE', {
    timeZone: 'UTC',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });

  const textLines = logs.map((entry) => {
    const tsVal = Number(entry.ts || Date.now());
    const isoTs = `${dtf.format(tsVal).replace(' ', 'T')}Z`;
    const typeLabel = String(entry.type || 'stdout').toUpperCase();
    const taskPart = entry.taskId ? ` [task:${entry.taskId}]` : '';
    return `[${isoTs}] [${typeLabel}]${taskPart} ${entry.msg || ''}`;
  });

  return {
    format: 'txt',
    contentType: 'text/plain; charset=utf-8',
    filename: `${safeScope}-logs.txt`,
    content: textLines.join('\n') + (textLines.length > 0 ? '\n' : ''),
    totalLogs: logs.length
  };
};

// 8. Mongoose Schemas, Models, Validators, Builders & Index Provisioning
exports.createMongooseSchemas = schemas.createMongooseSchemas;
exports.registerMongooseModels = schemas.registerMongooseModels;
exports.UserDetailSchema = schemas.UserDetailSchema;
exports.LogEntrySchema = schemas.LogEntrySchema;
exports.RunnerSchema = schemas.RunnerSchema;
exports.BatchSchema = schemas.BatchSchema;
exports.TaskSchema = schemas.TaskSchema;
exports.LogBucketSchema = schemas.LogBucketSchema;
exports.RunnerModel = schemas.RunnerModel;
exports.BatchModel = schemas.BatchModel;
exports.TaskModel = schemas.TaskModel;
exports.LogBucketModel = schemas.LogBucketModel;
exports.RUNNER_JSON_SCHEMA = schemas.RUNNER_JSON_SCHEMA;
exports.BATCH_JSON_SCHEMA = schemas.BATCH_JSON_SCHEMA;
exports.TASK_JSON_SCHEMA = schemas.TASK_JSON_SCHEMA;
exports.LOG_BUCKET_JSON_SCHEMA = schemas.LOG_BUCKET_JSON_SCHEMA;
exports.MONGOOSE_SCHEMA_DEFS = schemas.MONGOOSE_SCHEMA_DEFS;
exports.COLLECTION_INDEXES = schemas.COLLECTION_INDEXES;
exports.COLLECTION_VALIDATORS = schemas.COLLECTION_VALIDATORS;
exports.validateRunnerDoc = schemas.validateRunnerDoc;
exports.validateBatchDoc = schemas.validateBatchDoc;
exports.validateTaskDoc = schemas.validateTaskDoc;
exports.validateLogBucketDoc = schemas.validateLogBucketDoc;
exports.buildRunnerDoc = schemas.buildRunnerDoc;
exports.buildBatchDoc = schemas.buildBatchDoc;
exports.buildTaskDoc = schemas.buildTaskDoc;
exports.buildLogBucketDoc = schemas.buildLogBucketDoc;
exports.ensureSchemasAndIndexes = schemas.ensureSchemasAndIndexes;

// 9. Express Route Controllers & Router Registration
const routes = require('./routes');

exports.registerRoutes = routes.registerRoutes;
exports.listRunnersHandler = routes.listRunnersHandler;
exports.getScheduledRunnersHandler = routes.getScheduledRunnersHandler;
exports.getPausedRunnersHandler = routes.getPausedRunnersHandler;
exports.getAwaitingApprovalRunnersHandler = routes.getAwaitingApprovalRunnersHandler;
exports.getFailedRunnersHandler = routes.getFailedRunnersHandler;
exports.cancelScheduledRunnersHandler = routes.cancelScheduledRunnersHandler;
exports.stopRunnersHandler = routes.stopRunnersHandler;
exports.getBatchHandler = routes.getBatchHandler;
exports.listBatchesHandler = routes.listBatchesHandler;
exports.getSkippableBatchesHandler = routes.getSkippableBatchesHandler;
exports.getAwaitingApprovalBatchesHandler = routes.getAwaitingApprovalBatchesHandler;
exports.getPendingApprovalBatchesHandler = routes.getPendingApprovalBatchesHandler;
exports.getFailedBatchesHandler = routes.getFailedBatchesHandler;
exports.skipBatchesHandler = routes.skipBatchesHandler;
exports.approveBatchesHandler = routes.approveBatchesHandler;
exports.rejectBatchesHandler = routes.rejectBatchesHandler;
exports.getTaskHandler = routes.getTaskHandler;
exports.listTasksHandler = routes.listTasksHandler;
exports.getPausedTasksHandler = routes.getPausedTasksHandler;
exports.getRunningTasksHandler = routes.getRunningTasksHandler;
exports.getFailedTasksHandler = routes.getFailedTasksHandler;
exports.pauseTasksHandler = routes.pauseTasksHandler;
exports.resumeTasksHandler = routes.resumeTasksHandler;
exports.triggerRunnerHandler = routes.triggerRunnerHandler;
exports.getRunnerHandler = routes.getRunnerHandler;
exports.getRunnerMetricsHandler = routes.getRunnerMetricsHandler;
exports.exportRunnerLogsHandler = routes.exportRunnerLogsHandler;
exports.streamHandler = routes.streamHandler;
exports.logsHandler = routes.logsHandler;
exports.stopRunnerHandler = routes.stopRunnerHandler;
exports.pauseRunnerHandler = routes.pauseRunnerHandler;
exports.resumeRunnerHandler = routes.resumeRunnerHandler;
exports.replayRunnerHandler = routes.replayRunnerHandler;
exports.cleanupRunnerHandler = routes.cleanupRunnerHandler;
exports.cleanupStaleTempHandler = routes.cleanupStaleTempHandler;
exports.getClusterConfigHandler = routes.getClusterConfigHandler;
exports.configureClusterHandler = routes.configureClusterHandler;
exports.skipBatchHandler = routes.skipBatchHandler;
exports.stopBatchHandler = routes.stopBatchHandler;
exports.replayBatchHandler = routes.replayBatchHandler;
exports.approveBatchHandler = routes.approveBatchHandler;
exports.rejectBatchHandler = routes.rejectBatchHandler;
exports.expireBatchApprovalHandler = routes.expireBatchApprovalHandler;
exports.skipTaskHandler = routes.skipTaskHandler;
exports.stopTaskHandler = routes.stopTaskHandler;
exports.pauseTaskHandler = routes.pauseTaskHandler;
exports.resumeTaskHandler = routes.resumeTaskHandler;
exports.replayTaskHandler = routes.replayTaskHandler;


