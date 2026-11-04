'use strict';

const {
  COLLECTIONS,
  cleanupStaleTempFiles,
  getCollection
} = require('./constants');
const broadcaster = require('./broadcaster');
const scheduler = require('./scheduler');
const indexLib = require('./index');

const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((err) => {
    if (typeof next === 'function') {
      next(err);
      return;
    }
    const statusCode = Number(err.statusCode) || (err.code === 'RUNNER_CONFLICT' ? 409 : 500);
    res.status(statusCode).json({
      ok: false,
      code: err.code || 'INTERNAL_ERROR',
      error: err.message,
      ...(err.activeRunnerIds ? { activeRunnerIds: err.activeRunnerIds } : {})
    });
  });
};

// ============================================================================
// Functional Route Controllers (Mountable on any Express Router or App)
// ============================================================================

exports.triggerRunnerHandler = asyncHandler(async (req, res) => {
  const payload = {
    ...(req.body || {}),
    mapId: (req.params && req.params.mapId) || (req.body && req.body.mapId)
  };
  const result = await scheduler.triggerRunner(req, payload);
  res.status(201).json({
    ok: true,
    runnerId: result.runnerId,
    mapId: result.mapId,
    status: result.status,
    runner: result.runner,
    batches: result.batches,
    tasks: result.tasks
  });
});

exports.listRunnersHandler = asyncHandler(async (req, res) => {
  const query = req.query || {};
  const filters = {
    mapId: (req.params && req.params.mapId) || query.mapId || undefined,
    hostId: query.hostId || undefined,
    status: query.status || undefined
  };
  const runners = await scheduler.listRunners(req, filters);
  res.status(200).json({ ok: true, count: runners.length, runners });
});

exports.getScheduledRunnersHandler = asyncHandler(async (req, res) => {
  const query = req.query || {};
  const filters = {
    mapId: (req.params && req.params.mapId) || query.mapId || undefined,
    hostId: query.hostId || undefined
  };
  const runners = await scheduler.getScheduledRunners(req, filters);
  res.status(200).json({ ok: true, count: runners.length, runners });
});

exports.getPausedRunnersHandler = asyncHandler(async (req, res) => {
  const query = req.query || {};
  const filters = {
    mapId: (req.params && req.params.mapId) || query.mapId || undefined,
    hostId: query.hostId || undefined
  };
  const runners = await scheduler.getPausedRunners(req, filters);
  res.status(200).json({ ok: true, count: runners.length, runners });
});

exports.getAwaitingApprovalRunnersHandler = asyncHandler(async (req, res) => {
  const query = req.query || {};
  const filters = {
    mapId: (req.params && req.params.mapId) || query.mapId || undefined,
    hostId: query.hostId || undefined
  };
  const runners = await scheduler.getAwaitingApprovalRunners(req, filters);
  res.status(200).json({ ok: true, count: runners.length, runners });
});

exports.getFailedRunnersHandler = asyncHandler(async (req, res) => {
  const query = req.query || {};
  const filters = {
    mapId: (req.params && req.params.mapId) || query.mapId || undefined,
    hostId: query.hostId || undefined,
    includeStopped: query.includeStopped === 'true'
  };
  const runners = await scheduler.getFailedRunners(req, filters);
  res.status(200).json({ ok: true, count: runners.length, runners });
});

exports.cancelScheduledRunnersHandler = asyncHandler(async (req, res) => {
  const query = req.query || {};
  const body = req.body || {};
  const filters = {
    mapId: (req.params && req.params.mapId) || body.mapId || query.mapId || undefined,
    hostId: body.hostId || query.hostId || undefined
  };
  const result = await scheduler.cancelScheduledRunners(req, filters);
  res.status(200).json({ ok: true, action: 'cancel-scheduled', ...result });
});

exports.stopRunnersHandler = asyncHandler(async (req, res) => {
  const query = req.query || {};
  const body = req.body || {};
  const filters = {
    mapId: (req.params && req.params.mapId) || body.mapId || query.mapId || undefined,
    hostId: body.hostId || query.hostId || undefined,
    status: body.status || query.status || undefined
  };
  const result = await scheduler.stopRunners(req, filters);
  res.status(200).json({ ok: true, action: 'stop-runners', ...result });
});

exports.getBatchHandler = asyncHandler(async (req, res) => {
  const batch = await scheduler.getBatch(req, req.params.batchId);
  if (!batch) {
    res.status(404).json({ ok: false, error: `Batch "${req.params.batchId}" not found` });
    return;
  }
  res.status(200).json({ ok: true, batch });
});

exports.listBatchesHandler = asyncHandler(async (req, res) => {
  const query = req.query || {};
  const filters = {
    mapId: (req.params && req.params.mapId) || query.mapId || undefined,
    runnerId: (req.params && req.params.runnerId) || query.runnerId || undefined,
    status: query.status || undefined,
    mode: query.mode || undefined,
    requiresApproval: query.requiresApproval !== undefined ? query.requiresApproval === 'true' : undefined,
    approvalStatus: query.approvalStatus || undefined
  };
  const batches = await scheduler.listBatches(req, filters);
  res.status(200).json({ ok: true, count: batches.length, batches });
});

exports.getSkippableBatchesHandler = asyncHandler(async (req, res) => {
  const query = req.query || {};
  const filters = {
    mapId: (req.params && req.params.mapId) || query.mapId || undefined,
    runnerId: (req.params && req.params.runnerId) || query.runnerId || undefined
  };
  const batches = await scheduler.getSkippableBatches(req, filters);
  res.status(200).json({ ok: true, count: batches.length, batches });
});

exports.getAwaitingApprovalBatchesHandler = asyncHandler(async (req, res) => {
  const query = req.query || {};
  const filters = {
    mapId: (req.params && req.params.mapId) || query.mapId || undefined,
    runnerId: (req.params && req.params.runnerId) || query.runnerId || undefined
  };
  const batches = await scheduler.getAwaitingApprovalBatches(req, filters);
  res.status(200).json({ ok: true, count: batches.length, batches });
});

exports.getPendingApprovalBatchesHandler = asyncHandler(async (req, res) => {
  const query = req.query || {};
  const filters = {
    mapId: (req.params && req.params.mapId) || query.mapId || undefined,
    runnerId: (req.params && req.params.runnerId) || query.runnerId || undefined
  };
  const batches = await scheduler.getPendingApprovalBatches(req, filters);
  res.status(200).json({ ok: true, count: batches.length, batches });
});

exports.approveBatchesHandler = asyncHandler(async (req, res) => {
  const query = req.query || {};
  const body = req.body || {};
  const filters = {
    mapId: (req.params && req.params.mapId) || body.mapId || query.mapId || undefined,
    runnerId: (req.params && req.params.runnerId) || body.runnerId || query.runnerId || undefined,
    status: body.status || query.status || undefined,
    approvalStatus: body.approvalStatus || query.approvalStatus || undefined
  };
  const result = await scheduler.approveBatches(req, filters, {
    approvedBy: body.approvedBy,
    comment: body.comment || body.reason,
    reopen: body.reopen,
    awaitCompletion: Boolean(body.awaitCompletion)
  });
  res.status(200).json({ ok: true, action: 'approve-batches', ...result });
});

exports.rejectBatchesHandler = asyncHandler(async (req, res) => {
  const query = req.query || {};
  const body = req.body || {};
  const filters = {
    mapId: (req.params && req.params.mapId) || body.mapId || query.mapId || undefined,
    runnerId: (req.params && req.params.runnerId) || body.runnerId || query.runnerId || undefined,
    status: body.status || query.status || undefined,
    approvalStatus: body.approvalStatus || query.approvalStatus || undefined
  };
  const result = await scheduler.rejectBatches(req, filters, {
    rejectedBy: body.rejectedBy,
    comment: body.comment,
    reason: body.reason,
    stopRunner: body.stopRunner
  });
  res.status(200).json({ ok: true, action: 'reject-batches', ...result });
});

exports.getFailedBatchesHandler = asyncHandler(async (req, res) => {
  const query = req.query || {};
  const filters = {
    mapId: (req.params && req.params.mapId) || query.mapId || undefined,
    runnerId: (req.params && req.params.runnerId) || query.runnerId || undefined,
    includeStopped: query.includeStopped === 'true'
  };
  const batches = await scheduler.getFailedBatches(req, filters);
  res.status(200).json({ ok: true, count: batches.length, batches });
});

exports.skipBatchesHandler = asyncHandler(async (req, res) => {
  const query = req.query || {};
  const body = req.body || {};
  const filters = {
    mapId: (req.params && req.params.mapId) || body.mapId || query.mapId || undefined,
    runnerId: (req.params && req.params.runnerId) || body.runnerId || query.runnerId || undefined
  };
  const result = await scheduler.skipBatches(req, filters, {
    force: Boolean(body.force || query.force === 'true'),
    awaitCompletion: Boolean(body.awaitCompletion)
  });
  res.status(200).json({ ok: true, action: 'skip-batches', ...result });
});

exports.getTaskHandler = asyncHandler(async (req, res) => {
  const task = await scheduler.getTask(req, req.params.taskId);
  if (!task) {
    res.status(404).json({ ok: false, error: `Task "${req.params.taskId}" not found` });
    return;
  }
  res.status(200).json({ ok: true, task });
});

exports.listTasksHandler = asyncHandler(async (req, res) => {
  const query = req.query || {};
  const filters = {
    mapId: (req.params && req.params.mapId) || query.mapId || undefined,
    runnerId: (req.params && req.params.runnerId) || query.runnerId || undefined,
    batchId: (req.params && req.params.batchId) || query.batchId || undefined,
    hostId: query.hostId || undefined,
    status: query.status || undefined
  };
  const tasks = await scheduler.listTasks(req, filters);
  res.status(200).json({ ok: true, count: tasks.length, tasks });
});

exports.getPausedTasksHandler = asyncHandler(async (req, res) => {
  const query = req.query || {};
  const filters = {
    mapId: (req.params && req.params.mapId) || query.mapId || undefined,
    runnerId: (req.params && req.params.runnerId) || query.runnerId || undefined,
    batchId: (req.params && req.params.batchId) || query.batchId || undefined,
    hostId: query.hostId || undefined
  };
  const tasks = await scheduler.getPausedTasks(req, filters);
  res.status(200).json({ ok: true, count: tasks.length, tasks });
});

exports.getRunningTasksHandler = asyncHandler(async (req, res) => {
  const query = req.query || {};
  const filters = {
    mapId: (req.params && req.params.mapId) || query.mapId || undefined,
    runnerId: (req.params && req.params.runnerId) || query.runnerId || undefined,
    batchId: (req.params && req.params.batchId) || query.batchId || undefined,
    hostId: query.hostId || undefined
  };
  const tasks = await scheduler.getRunningTasks(req, filters);
  res.status(200).json({ ok: true, count: tasks.length, tasks });
});

exports.getFailedTasksHandler = asyncHandler(async (req, res) => {
  const query = req.query || {};
  const filters = {
    mapId: (req.params && req.params.mapId) || query.mapId || undefined,
    runnerId: (req.params && req.params.runnerId) || query.runnerId || undefined,
    batchId: (req.params && req.params.batchId) || query.batchId || undefined,
    hostId: query.hostId || undefined,
    includeStopped: query.includeStopped === 'true'
  };
  const tasks = await scheduler.getFailedTasks(req, filters);
  res.status(200).json({ ok: true, count: tasks.length, tasks });
});

exports.pauseTasksHandler = asyncHandler(async (req, res) => {
  const query = req.query || {};
  const body = req.body || {};
  const filters = {
    mapId: (req.params && req.params.mapId) || body.mapId || query.mapId || undefined,
    runnerId: (req.params && req.params.runnerId) || body.runnerId || query.runnerId || undefined,
    batchId: (req.params && req.params.batchId) || body.batchId || query.batchId || undefined,
    hostId: body.hostId || query.hostId || undefined
  };
  const result = await scheduler.pauseTasks(req, filters);
  res.status(200).json({ ok: true, action: 'pause-tasks', ...result });
});

exports.resumeTasksHandler = asyncHandler(async (req, res) => {
  const query = req.query || {};
  const body = req.body || {};
  const filters = {
    mapId: (req.params && req.params.mapId) || body.mapId || query.mapId || undefined,
    runnerId: (req.params && req.params.runnerId) || body.runnerId || query.runnerId || undefined,
    batchId: (req.params && req.params.batchId) || body.batchId || query.batchId || undefined,
    hostId: body.hostId || query.hostId || undefined
  };
  const result = await scheduler.resumeTasks(req, filters);
  res.status(200).json({ ok: true, action: 'resume-tasks', ...result });
});

exports.getRunnerHandler = asyncHandler(async (req, res) => {
  const { runnerId } = req.params;
  const runnerCol = getCollection(req, COLLECTIONS.RUNNER);
  const batchCol = getCollection(req, COLLECTIONS.BATCH);
  const taskCol = getCollection(req, COLLECTIONS.TASK);

  const runner = await runnerCol.findOne({ _id: runnerId });
  if (!runner) {
    res.status(404).json({ ok: false, error: `Runner "${runnerId}" not found` });
    return;
  }

  const batchesCursor = await batchCol.find({ runnerId });
  const batches = typeof batchesCursor.toArray === 'function'
    ? await batchesCursor.toArray()
    : batchesCursor;

  const tasksCursor = await taskCol.find({ runnerId });
  const tasks = typeof tasksCursor.toArray === 'function'
    ? await tasksCursor.toArray()
    : tasksCursor;

  res.status(200).json({ ok: true, runner, batches, tasks });
});

exports.streamHandler = (req, res) => {
  const filters = {
    mapId: (req.params && req.params.mapId) || (req.query && req.query.mapId) || null,
    runnerId: (req.params && req.params.runnerId) || (req.query && req.query.runnerId) || null,
    batchId: (req.params && req.params.batchId) || (req.query && req.query.batchId) || null,
    taskId: (req.params && req.params.taskId) || (req.query && req.query.taskId) || null
  };
  return broadcaster.attachStream(req, res, filters);
};

exports.logsHandler = asyncHandler(async (req, res) => {
  const query = req.query || {};
  const filters = {
    mapId: (req.params && req.params.mapId) || query.mapId || undefined,
    runnerId: (req.params && req.params.runnerId) || query.runnerId || undefined,
    batchId: (req.params && req.params.batchId) || query.batchId || undefined,
    taskId: (req.params && req.params.taskId) || query.taskId || undefined,
    type: query.type || undefined,
    search: query.search || undefined,
    afterTs: query.afterTs || undefined,
    beforeTs: query.beforeTs || undefined,
    limit: query.limit || undefined,
    offset: query.offset !== undefined ? query.offset : query.skip
  };
  const result = await indexLib.queryLogs(req, filters);
  res.status(200).json({ ok: true, ...result });
});

exports.getRunnerMetricsHandler = asyncHandler(async (req, res) => {
  const metrics = await scheduler.getRunnerMetrics(req, req.params.runnerId);
  res.status(200).json({ ok: true, metrics });
});

exports.exportRunnerLogsHandler = asyncHandler(async (req, res) => {
  const query = req.query || {};
  const filters = {
    mapId: (req.params && req.params.mapId) || query.mapId || undefined,
    runnerId: (req.params && req.params.runnerId) || query.runnerId || undefined,
    batchId: (req.params && req.params.batchId) || query.batchId || undefined,
    taskId: (req.params && req.params.taskId) || query.taskId || undefined,
    type: query.type || undefined,
    search: query.search || undefined,
    afterTs: query.afterTs || undefined,
    beforeTs: query.beforeTs || undefined
  };
  const exported = await indexLib.exportRunnerLogs(req, filters, { format: query.format || 'txt' });
  if (typeof res.setHeader === 'function') {
    res.setHeader('Content-Type', exported.contentType);
    res.setHeader('Content-Disposition', `attachment; filename="${exported.filename}"`);
  }
  if (typeof res.send === 'function') {
    res.status(200).send(exported.content);
  } else {
    res.status(200).json({ ok: true, ...exported });
  }
});

exports.cleanupRunnerHandler = asyncHandler(async (req, res) => {
  const result = await scheduler.cleanupRunnerFiles(req, req.params.runnerId, req.body || {});
  res.status(200).json({ ok: true, action: 'cleanup', tier: 'runner', ...result });
});

exports.cleanupStaleTempHandler = asyncHandler(async (req, res) => {
  const maxAgeMs = (req.body && req.body.maxAgeMs) || (req.query && req.query.maxAgeMs);
  const result = cleanupStaleTempFiles(maxAgeMs);
  res.status(200).json({ ok: true, action: 'cleanup-temp', ...result });
});

exports.getClusterConfigHandler = asyncHandler(async (_req, res) => {
  res.status(200).json({ ok: true, config: broadcaster.getClusterConfig() });
});

exports.configureClusterHandler = asyncHandler(async (req, res) => {
  const updated = broadcaster.configureCluster(req.body || {});
  res.status(200).json({ ok: true, action: 'configure-cluster', config: updated });
});

// Tier 1: Runner Controls (stop, pause, resume, replay)
exports.stopRunnerHandler = asyncHandler(async (req, res) => {
  const doc = await scheduler.stopRunner(req, req.params.runnerId);
  res.status(200).json({ ok: true, action: 'stop', tier: 'runner', data: doc });
});

exports.pauseRunnerHandler = asyncHandler(async (req, res) => {
  const doc = await scheduler.pauseRunner(req, req.params.runnerId);
  res.status(200).json({ ok: true, action: 'pause', tier: 'runner', data: doc });
});

exports.resumeRunnerHandler = asyncHandler(async (req, res) => {
  const doc = await scheduler.resumeRunner(req, req.params.runnerId, {
    awaitCompletion: Boolean(req.body && req.body.awaitCompletion)
  });
  res.status(200).json({ ok: true, action: 'resume', tier: 'runner', data: doc });
});

exports.replayRunnerHandler = asyncHandler(async (req, res) => {
  const body = req.body || {};
  const doc = await scheduler.replayRunner(req, req.params.runnerId, {
    fromFailed: Boolean(body.fromFailed || req.query?.fromFailed === 'true'),
    fromBatchId: body.fromBatchId,
    fromTaskId: body.fromTaskId,
    autoApprove: Boolean(body.autoApprove || req.query?.autoApprove === 'true'),
    preserveApprovals: Boolean(body.preserveApprovals || req.query?.preserveApprovals === 'true'),
    awaitCompletion: Boolean(body.awaitCompletion)
  });
  res.status(200).json({ ok: true, action: 'replay', tier: 'runner', data: doc });
});

// Tier 2: Batch Controls (skip, stop, replay, approve, reject, expire)
exports.skipBatchHandler = asyncHandler(async (req, res) => {
  const body = req.body || {};
  const doc = await scheduler.skipBatch(req, req.params.batchId, {
    force: Boolean(body.force || req.query?.force === 'true'),
    comment: body.comment,
    reason: body.reason,
    awaitCompletion: Boolean(body.awaitCompletion)
  });
  res.status(200).json({ ok: true, action: 'skip', tier: 'batch', data: doc });
});

exports.stopBatchHandler = asyncHandler(async (req, res) => {
  const doc = await scheduler.stopBatch(req, req.params.batchId);
  res.status(200).json({ ok: true, action: 'stop', tier: 'batch', data: doc });
});

exports.replayBatchHandler = asyncHandler(async (req, res) => {
  const body = req.body || {};
  const doc = await scheduler.replayBatch(req, req.params.batchId, {
    fromFailed: Boolean(body.fromFailed || req.query?.fromFailed === 'true'),
    fromTaskId: body.fromTaskId || req.query?.fromTaskId,
    requireApproval: Boolean(body.requireApproval || req.query?.requireApproval === 'true'),
    awaitCompletion: Boolean(body.awaitCompletion)
  });
  res.status(200).json({ ok: true, action: 'replay', tier: 'batch', data: doc });
});

exports.approveBatchHandler = asyncHandler(async (req, res) => {
  const doc = await scheduler.approveBatch(req, req.params.batchId, {
    ...(req.body || {}),
    awaitCompletion: Boolean(req.body && req.body.awaitCompletion)
  });
  res.status(200).json({ ok: true, action: 'approve', tier: 'batch', data: doc });
});

exports.rejectBatchHandler = asyncHandler(async (req, res) => {
  const doc = await scheduler.rejectBatch(req, req.params.batchId, req.body || {});
  res.status(200).json({ ok: true, action: 'reject', tier: 'batch', data: doc });
});

exports.expireBatchApprovalHandler = asyncHandler(async (req, res) => {
  const doc = await scheduler.expireBatchApproval(req, req.params.batchId, req.body || {});
  res.status(200).json({ ok: true, action: 'expire-approval', tier: 'batch', data: doc });
});

// Tier 3: Task Controls (skip, stop, pause, resume, replay)
exports.skipTaskHandler = asyncHandler(async (req, res) => {
  const doc = await scheduler.skipTask(req, req.params.taskId);
  res.status(200).json({ ok: true, action: 'skip', tier: 'task', data: doc });
});

exports.stopTaskHandler = asyncHandler(async (req, res) => {
  const doc = await scheduler.stopTask(req, req.params.taskId);
  res.status(200).json({ ok: true, action: 'stop', tier: 'task', data: doc });
});

exports.pauseTaskHandler = asyncHandler(async (req, res) => {
  const doc = await scheduler.pauseTask(req, req.params.taskId);
  res.status(200).json({ ok: true, action: 'pause', tier: 'task', data: doc });
});

exports.resumeTaskHandler = asyncHandler(async (req, res) => {
  const doc = await scheduler.resumeTask(req, req.params.taskId);
  res.status(200).json({ ok: true, action: 'resume', tier: 'task', data: doc });
});

exports.replayTaskHandler = asyncHandler(async (req, res) => {
  const doc = await scheduler.replayTask(req, req.params.taskId, {
    awaitCompletion: Boolean(req.body && req.body.awaitCompletion)
  });
  res.status(200).json({ ok: true, action: 'replay', tier: 'task', data: doc });
});

// ============================================================================
// Unified Express Route Registration Helper
// ============================================================================

exports.registerRoutes = (router) => {
  if (!router || typeof router.get !== 'function' || typeof router.post !== 'function') {
    throw Error('registerRoutes requires a valid Express app or Router instance');
  }

  // 1. Trigger & Inspect Pipelines (Runners, Batches, Tasks)
  router.get('/runners', exports.listRunnersHandler);
  router.get('/runners/scheduled', exports.getScheduledRunnersHandler);
  router.get('/runners/paused', exports.getPausedRunnersHandler);
  router.get('/runners/awaiting-approval', exports.getAwaitingApprovalRunnersHandler);
  router.get('/runners/failed', exports.getFailedRunnersHandler);
  router.post('/runners/scheduled/cancel', exports.cancelScheduledRunnersHandler);
  router.post('/runners/stop', exports.stopRunnersHandler);
  router.get('/maps/:mapId/runners', exports.listRunnersHandler);
  router.get('/maps/:mapId/runners/scheduled', exports.getScheduledRunnersHandler);
  router.get('/maps/:mapId/runners/paused', exports.getPausedRunnersHandler);
  router.get('/maps/:mapId/runners/awaiting-approval', exports.getAwaitingApprovalRunnersHandler);
  router.get('/maps/:mapId/runners/failed', exports.getFailedRunnersHandler);
  router.post('/maps/:mapId/runners/scheduled/cancel', exports.cancelScheduledRunnersHandler);
  router.post('/maps/:mapId/runners/stop', exports.stopRunnersHandler);
  router.post('/runners', exports.triggerRunnerHandler);
  router.post('/maps/:mapId/runners', exports.triggerRunnerHandler);
  router.get('/runners/:runnerId', exports.getRunnerHandler);
  router.get('/runners/:runnerId/metrics', exports.getRunnerMetricsHandler);
  router.get('/runners/:runnerId/export', exports.exportRunnerLogsHandler);
  router.get('/maps/:mapId/export', exports.exportRunnerLogsHandler);

  // Batch Discovery & Bulk Actions
  router.get('/batches', exports.listBatchesHandler);
  router.get('/batches/skippable', exports.getSkippableBatchesHandler);
  router.get('/batches/awaiting-approval', exports.getAwaitingApprovalBatchesHandler);
  router.get('/batches/pending-approval', exports.getPendingApprovalBatchesHandler);
  router.get('/batches/failed', exports.getFailedBatchesHandler);
  router.post('/batches/skip', exports.skipBatchesHandler);
  router.post('/batches/approve', exports.approveBatchesHandler);
  router.post('/batches/reject', exports.rejectBatchesHandler);
  router.get('/runners/:runnerId/batches', exports.listBatchesHandler);
  router.get('/runners/:runnerId/batches/skippable', exports.getSkippableBatchesHandler);
  router.get('/runners/:runnerId/batches/awaiting-approval', exports.getAwaitingApprovalBatchesHandler);
  router.get('/runners/:runnerId/batches/pending-approval', exports.getPendingApprovalBatchesHandler);
  router.get('/runners/:runnerId/batches/failed', exports.getFailedBatchesHandler);
  router.post('/runners/:runnerId/batches/skip', exports.skipBatchesHandler);
  router.post('/runners/:runnerId/batches/approve', exports.approveBatchesHandler);
  router.post('/runners/:runnerId/batches/reject', exports.rejectBatchesHandler);
  router.get('/batches/:batchId', exports.getBatchHandler);

  // Task Discovery & Bulk Actions
  router.get('/tasks', exports.listTasksHandler);
  router.get('/tasks/paused', exports.getPausedTasksHandler);
  router.get('/tasks/running', exports.getRunningTasksHandler);
  router.get('/tasks/failed', exports.getFailedTasksHandler);
  router.post('/tasks/pause', exports.pauseTasksHandler);
  router.post('/tasks/resume', exports.resumeTasksHandler);
  router.get('/runners/:runnerId/tasks', exports.listTasksHandler);
  router.get('/runners/:runnerId/tasks/paused', exports.getPausedTasksHandler);
  router.get('/runners/:runnerId/tasks/running', exports.getRunningTasksHandler);
  router.get('/runners/:runnerId/tasks/failed', exports.getFailedTasksHandler);
  router.post('/runners/:runnerId/tasks/pause', exports.pauseTasksHandler);
  router.post('/runners/:runnerId/tasks/resume', exports.resumeTasksHandler);
  router.get('/batches/:batchId/tasks', exports.listTasksHandler);
  router.get('/batches/:batchId/tasks/paused', exports.getPausedTasksHandler);
  router.get('/batches/:batchId/tasks/running', exports.getRunningTasksHandler);
  router.get('/batches/:batchId/tasks/failed', exports.getFailedTasksHandler);
  router.post('/batches/:batchId/tasks/pause', exports.pauseTasksHandler);
  router.post('/batches/:batchId/tasks/resume', exports.resumeTasksHandler);
  router.get('/tasks/:taskId', exports.getTaskHandler);

  // 2. Real-Time SSE Streams (Unified query stream + semantic tier streams)
  router.get('/stream', exports.streamHandler);
  router.get('/maps/:mapId/stream', exports.streamHandler);
  router.get('/runners/:runnerId/stream', exports.streamHandler);
  router.get('/batches/:batchId/stream', exports.streamHandler);
  router.get('/tasks/:taskId/stream', exports.streamHandler);

  // 3. Historical Bucketed Log Queries (Unified + semantic tier logs)
  router.get('/logs', exports.logsHandler);
  router.get('/maps/:mapId/logs', exports.logsHandler);
  router.get('/runners/:runnerId/logs', exports.logsHandler);
  router.get('/batches/:batchId/logs', exports.logsHandler);
  router.get('/tasks/:taskId/logs', exports.logsHandler);

  // 4. Tier 1: Runner Control Verbs & Maintenance
  router.post('/runners/:runnerId/stop', exports.stopRunnerHandler);
  router.post('/runners/:runnerId/pause', exports.pauseRunnerHandler);
  router.post('/runners/:runnerId/resume', exports.resumeRunnerHandler);
  router.post('/runners/:runnerId/replay', exports.replayRunnerHandler);
  router.post('/runners/:runnerId/cleanup', exports.cleanupRunnerHandler);
  router.post('/maintenance/cleanup-temp', exports.cleanupStaleTempHandler);
  router.get('/cluster/config', exports.getClusterConfigHandler);
  router.post('/cluster/config', exports.configureClusterHandler);

  // 5. Tier 2: Batch Control Verbs
  router.post('/batches/:batchId/skip', exports.skipBatchHandler);
  router.post('/batches/:batchId/stop', exports.stopBatchHandler);
  router.post('/batches/:batchId/replay', exports.replayBatchHandler);
  router.post('/batches/:batchId/approve', exports.approveBatchHandler);
  router.post('/batches/:batchId/reject', exports.rejectBatchHandler);
  router.post('/batches/:batchId/expire-approval', exports.expireBatchApprovalHandler);

  // 6. Tier 3: Task Control Verbs
  router.post('/tasks/:taskId/skip', exports.skipTaskHandler);
  router.post('/tasks/:taskId/stop', exports.stopTaskHandler);
  router.post('/tasks/:taskId/pause', exports.pauseTaskHandler);
  router.post('/tasks/:taskId/resume', exports.resumeTaskHandler);
  router.post('/tasks/:taskId/replay', exports.replayTaskHandler);

  return router;
};
