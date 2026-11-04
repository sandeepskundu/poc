'use strict';

const fs = require('node:fs');
const crypto = require('node:crypto');
const http = require('node:http');
const https = require('node:https');
const {
  COLLECTIONS,
  EVENT_TYPES,
  RUNNER_STATUS,
  CONTROL_STATES,
  BATCH_STATUS,
  BATCH_MODES,
  APPROVAL_STATUS,
  TASK_STATUS,
  CONCURRENCY_POLICIES,
  WHEN_CONDITIONS,
  DEFAULT_CONCURRENCY,
  DEFAULT_RETRY_DELAY_MS,
  DEFAULT_RETRY_BACKOFF_FACTOR,
  getHostId,
  getLogFilePath,
  cleanupTaskFiles,
  generateId,
  normalizeId,
  idsEqual,
  getCollection
} = require('./constants');
const processUtils = require('./process');
const logger = require('./logger');
const broadcaster = require('./broadcaster');
const watcher = require('./watcher');

const activeRunnerLoops = Object.create(null);
const scheduledRunnerTimers = Object.create(null);
const approvalGateTimers = Object.create(null);
const runnerFinishCallbacks = Object.create(null);
const runnerWebhookTransports = Object.create(null);
const lifecycleHooks = [];

const clearApprovalGateTimer = (batchId) => {
  const key = normalizeId(batchId);
  const entry = approvalGateTimers[key];
  if (entry) {
    clearTimeout(entry.timer);
    delete approvalGateTimers[key];
  }
};

const sleep = (ms) => {
  const { promise, resolve } = Promise.withResolvers();
  setTimeout(resolve, ms);
  return promise;
};

exports.registerLifecycleHook = (hookFn) => {
  if (typeof hookFn === 'function') {
    lifecycleHooks.push(hookFn);
  }
  return lifecycleHooks.length;
};

exports.clearLifecycleHooks = () => {
  lifecycleHooks.length = 0;
};

exports.dispatchRunnerWebhook = (webhookUrl, payload, options = {}) => {
  if (!webhookUrl || typeof webhookUrl !== 'string') {
    return Promise.resolve({ sent: false });
  }

  const { promise, resolve } = Promise.withResolvers();
  try {
    const urlMatch = webhookUrl.match(/^(https?):\/\/([^/:]+)(?::(\d+))?(\/.*)?$/i);
    if (!urlMatch) {
      resolve({ sent: false, error: `Invalid webhook URL: ${webhookUrl}` });
      return promise;
    }

    const protocol = `${urlMatch[1].toLowerCase()}:`;
    const hostname = urlMatch[2];
    const port = urlMatch[3] ? Number(urlMatch[3]) : (protocol === 'https:' ? 443 : 80);
    const reqPath = urlMatch[4] || '/';

    const bodyStr = JSON.stringify(payload);
    const headers = {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(bodyStr),
      ...(options.webhookHeaders || {})
    };

    if (options.webhookSecret) {
      const signature = crypto
        .createHmac('sha256', String(options.webhookSecret))
        .update(bodyStr)
        .digest('hex');
      headers['X-Runner-Signature-256'] = `sha256=${signature}`;
    }

    const reqOptions = {
      protocol,
      hostname,
      port,
      path: reqPath,
      method: 'POST',
      headers,
      timeout: 5000
    };

    if (typeof options.webhookTransport === 'function') {
      Promise.resolve(options.webhookTransport(reqOptions, bodyStr, payload))
        .then((res) => resolve({ sent: true, statusCode: (res && res.statusCode) || 200 }))
        .catch((err) => resolve({ sent: false, error: err.message }));
      return promise;
    }

    const transport = protocol === 'https:' ? https : http;
    const reqObj = transport.request(
      reqOptions,
      (res) => {
        res.resume();
        resolve({ sent: true, statusCode: res.statusCode });
      }
    );

    reqObj.on('error', (err) => resolve({ sent: false, error: err.message }));
    reqObj.on('timeout', () => {
      reqObj.destroy();
      resolve({ sent: false, error: 'Webhook request timed out' });
    });
    reqObj.write(bodyStr);
    reqObj.end();
  } catch (err) {
    resolve({ sent: false, error: err.message });
  }
  return promise;
};

const sortByOrder = (docs) => {
  if (!Array.isArray(docs)) {
    return [];
  }
  return docs.slice().sort((a, b) => {
    const orderA = typeof a.order === 'number' ? a.order : 0;
    const orderB = typeof b.order === 'number' ? b.order : 0;
    if (orderA !== orderB) {
      return orderA - orderB;
    }
    return String(a._id).localeCompare(String(b._id));
  });
};

const findMany = async (collection, filter) => {
  if (!collection) {
    return [];
  }
  if (typeof collection.find === 'function') {
    const cursorOrArray = await collection.find(filter);
    if (Array.isArray(cursorOrArray)) {
      return sortByOrder(cursorOrArray);
    }
    if (cursorOrArray && typeof cursorOrArray.sort === 'function') {
      const sorted = cursorOrArray.sort({ order: 1, _id: 1 });
      if (typeof sorted.toArray === 'function') {
        return sorted.toArray();
      }
    }
    if (cursorOrArray && typeof cursorOrArray.toArray === 'function') {
      const arr = await cursorOrArray.toArray();
      return sortByOrder(arr);
    }
  }
  return [];
};

exports.cleanupRunnerFiles = async (req, runnerId, options = {}) => {
  const taskCol = getCollection(req, COLLECTIONS.TASK);
  const tasks = await findMany(taskCol, { runnerId });
  let removedLogs = 0;
  let removedScripts = 0;

  for (let i = 0; i < tasks.length; i += 1) {
    const res = cleanupTaskFiles(tasks[i]._id, options);
    if (res.logRemoved) {
      removedLogs += 1;
    }
    if (res.scriptRemoved) {
      removedScripts += 1;
    }
  }

  return { removedLogs, removedScripts, taskCount: tasks.length };
};

exports.getActiveRunnersByMapId = async (req, mapId) => {
  if (!mapId) {
    return [];
  }
  const runnerCol = getCollection(req, COLLECTIONS.RUNNER);
  return findMany(runnerCol, {
    mapId,
    status: {
      $in: [
        RUNNER_STATUS.TRIGGERED,
        RUNNER_STATUS.SCHEDULED,
        RUNNER_STATUS.RUNNING,
        RUNNER_STATUS.PAUSED,
        RUNNER_STATUS.AWAITING_APPROVAL
      ]
    }
  });
};

const parseStatusFilter = (status) => {
  if (status === undefined || status === null) {
    return undefined;
  }
  if (Array.isArray(status)) {
    return { $in: status };
  }
  if (typeof status === 'string' && status.includes(',')) {
    return { $in: status.split(',').map((s) => s.trim()).filter(Boolean) };
  }
  return status;
};

exports.getRunner = async (req, runnerId) => {
  const runnerCol = getCollection(req, COLLECTIONS.RUNNER);
  const batchCol = getCollection(req, COLLECTIONS.BATCH);
  const taskCol = getCollection(req, COLLECTIONS.TASK);
  const doc = await runnerCol.findOne({ _id: runnerId });
  if (!doc) {
    return null;
  }
  const batches = await findMany(batchCol, { runnerId: doc._id });
  const tasks = await findMany(taskCol, { runnerId: doc._id });
  const now = Date.now();
  const runnerKey = normalizeId(doc._id);
  return {
    ...doc,
    runnerId: runnerKey,
    remainingDelayMs: doc.status === RUNNER_STATUS.SCHEDULED && doc.scheduledAt
      ? Math.max(0, Number(doc.scheduledAt) - now)
      : 0,
    hasLocalTimer: Boolean(scheduledRunnerTimers[runnerKey]),
    batches,
    tasks
  };
};

exports.listRunners = async (req, filters = {}) => {
  const runnerCol = getCollection(req, COLLECTIONS.RUNNER);
  const query = {};
  if (filters.mapId !== undefined && filters.mapId !== null) {
    query.mapId = filters.mapId;
  }
  if (filters.hostId !== undefined && filters.hostId !== null) {
    query.hostId = filters.hostId;
  }
  const statusCondition = parseStatusFilter(filters.status);
  if (statusCondition !== undefined) {
    query.status = statusCondition;
  }

  const now = Date.now();
  const docs = await findMany(runnerCol, query);
  return docs.map((doc) => ({
    ...doc,
    runnerId: normalizeId(doc._id),
    remainingDelayMs: doc.status === RUNNER_STATUS.SCHEDULED && doc.scheduledAt
      ? Math.max(0, Number(doc.scheduledAt) - now)
      : 0,
    hasLocalTimer: Boolean(scheduledRunnerTimers[normalizeId(doc._id)])
  }));
};

exports.getScheduledRunners = async (req, filters = {}) => {
  const scheduled = await exports.listRunners(req, {
    ...filters,
    status: RUNNER_STATUS.SCHEDULED
  });
  return scheduled.sort((a, b) => Number(a.scheduledAt || 0) - Number(b.scheduledAt || 0));
};

exports.getPausedRunners = async (req, filters = {}) =>
  exports.listRunners(req, {
    ...filters,
    status: RUNNER_STATUS.PAUSED
  });

exports.getAwaitingApprovalRunners = async (req, filters = {}) =>
  exports.listRunners(req, {
    ...filters,
    status: RUNNER_STATUS.AWAITING_APPROVAL
  });

exports.getFailedRunners = async (req, filters = {}) => {
  const targetStatuses = [
    RUNNER_STATUS.FAILED,
    RUNNER_STATUS.TIMEOUT,
    ...(filters.includeStopped ? [RUNNER_STATUS.STOPPED] : [])
  ];
  return exports.listRunners(req, {
    ...filters,
    status: targetStatuses
  });
};

exports.cancelScheduledRunners = async (req, filters = {}) => {
  const scheduled = await exports.getScheduledRunners(req, filters);
  const cancelled = [];
  for (let i = 0; i < scheduled.length; i += 1) {
    const stoppedDoc = await exports.stopRunner(req, scheduled[i]._id);
    if (stoppedDoc) {
      cancelled.push(stoppedDoc);
    }
  }
  return {
    cancelledCount: cancelled.length,
    runners: cancelled
  };
};

exports.stopRunners = async (req, filters = {}) => {
  const targetStatuses = filters.status || [
    RUNNER_STATUS.TRIGGERED,
    RUNNER_STATUS.SCHEDULED,
    RUNNER_STATUS.RUNNING,
    RUNNER_STATUS.PAUSED,
    RUNNER_STATUS.AWAITING_APPROVAL
  ];
  const active = await exports.listRunners(req, {
    ...filters,
    status: targetStatuses
  });
  const stopped = [];
  for (let i = 0; i < active.length; i += 1) {
    const doc = await exports.stopRunner(req, active[i]._id);
    if (doc) {
      stopped.push(doc);
    }
  }
  return {
    stoppedCount: stopped.length,
    runners: stopped
  };
};

exports.getBatch = async (req, batchId) => {
  const batchCol = getCollection(req, COLLECTIONS.BATCH);
  const taskCol = getCollection(req, COLLECTIONS.TASK);
  const doc = await batchCol.findOne({ _id: batchId });
  if (!doc) {
    return null;
  }
  const tasks = await findMany(taskCol, { batchId: doc._id });
  const batchKey = normalizeId(doc._id);
  return {
    ...doc,
    batchId: batchKey,
    hasApprovalTimer: Boolean(approvalGateTimers[batchKey]),
    tasks: tasks.map((t) => ({
      ...t,
      taskId: normalizeId(t._id),
      hasLocalWatcher: Boolean(broadcaster.getWatcher(t._id))
    }))
  };
};

exports.listBatches = async (req, filters = {}) => {
  const batchCol = getCollection(req, COLLECTIONS.BATCH);
  const query = {};
  if (filters.mapId !== undefined && filters.mapId !== null) {
    query.mapId = filters.mapId;
  }
  if (filters.runnerId !== undefined && filters.runnerId !== null) {
    query.runnerId = filters.runnerId;
  }
  if (filters.mode !== undefined && filters.mode !== null) {
    query.mode = filters.mode;
  }
  if (filters.requiresApproval !== undefined && filters.requiresApproval !== null) {
    query.requiresApproval = Boolean(filters.requiresApproval);
  }
  if (filters.approvalStatus !== undefined) {
    query.approvalStatus = parseStatusFilter(filters.approvalStatus);
  }
  const statusCondition = parseStatusFilter(filters.status);
  if (statusCondition !== undefined) {
    query.status = statusCondition;
  }

  const docs = await findMany(batchCol, query);
  return docs.map((doc) => {
    const batchKey = normalizeId(doc._id);
    return {
      ...doc,
      batchId: batchKey,
      hasApprovalTimer: Boolean(approvalGateTimers[batchKey])
    };
  });
};

exports.getAwaitingApprovalBatches = async (req, filters = {}) =>
  exports.listBatches(req, {
    ...filters,
    status: BATCH_STATUS.AWAITING_APPROVAL
  });

exports.getPendingApprovalBatches = async (req, filters = {}) =>
  exports.listBatches(req, {
    ...filters,
    approvalStatus: APPROVAL_STATUS.PENDING
  });

exports.getSkippableBatches = async (req, filters = {}) =>
  exports.listBatches(req, {
    ...filters,
    status: [
      BATCH_STATUS.QUEUED,
      BATCH_STATUS.PAUSED,
      BATCH_STATUS.AWAITING_APPROVAL
    ]
  });

exports.getFailedBatches = async (req, filters = {}) => {
  const targetStatuses = [
    BATCH_STATUS.FAILED,
    ...(filters.includeStopped ? [BATCH_STATUS.STOPPED] : [])
  ];
  return exports.listBatches(req, {
    ...filters,
    status: targetStatuses
  });
};

exports.skipBatches = async (req, filters = {}, options = {}) => {
  const skippable = await exports.getSkippableBatches(req, filters);
  const skipped = [];
  for (let i = 0; i < skippable.length; i += 1) {
    const doc = await exports.skipBatch(req, skippable[i]._id, options);
    if (doc) {
      skipped.push(doc);
    }
  }
  return {
    skippedCount: skipped.length,
    batches: skipped
  };
};

exports.getTask = async (req, taskId) => {
  const taskCol = getCollection(req, COLLECTIONS.TASK);
  const doc = await taskCol.findOne({ _id: taskId });
  if (!doc) {
    return null;
  }
  return {
    ...doc,
    taskId: normalizeId(doc._id),
    hasLocalWatcher: Boolean(broadcaster.getWatcher(doc._id))
  };
};

exports.listTasks = async (req, filters = {}) => {
  const taskCol = getCollection(req, COLLECTIONS.TASK);
  const query = {};
  if (filters.mapId !== undefined && filters.mapId !== null) {
    query.mapId = filters.mapId;
  }
  if (filters.runnerId !== undefined && filters.runnerId !== null) {
    query.runnerId = filters.runnerId;
  }
  if (filters.batchId !== undefined && filters.batchId !== null) {
    query.batchId = filters.batchId;
  }
  if (filters.hostId !== undefined && filters.hostId !== null) {
    query.hostId = filters.hostId;
  }
  const statusCondition = parseStatusFilter(filters.status);
  if (statusCondition !== undefined) {
    query.status = statusCondition;
  }

  const docs = await findMany(taskCol, query);
  return docs.map((doc) => ({
    ...doc,
    taskId: normalizeId(doc._id),
    hasLocalWatcher: Boolean(broadcaster.getWatcher(doc._id))
  }));
};

exports.getPausedTasks = async (req, filters = {}) =>
  exports.listTasks(req, {
    ...filters,
    status: TASK_STATUS.PAUSED
  });

exports.getRunningTasks = async (req, filters = {}) =>
  exports.listTasks(req, {
    ...filters,
    status: [TASK_STATUS.RUNNING, TASK_STATUS.STARTED]
  });

exports.getFailedTasks = async (req, filters = {}) => {
  const targetStatuses = [
    TASK_STATUS.FAILED,
    TASK_STATUS.TIMEOUT,
    ...(filters.includeStopped ? [TASK_STATUS.STOPPED] : [])
  ];
  return exports.listTasks(req, {
    ...filters,
    status: targetStatuses
  });
};

exports.pauseTasks = async (req, filters = {}) => {
  const running = await exports.getRunningTasks(req, filters);
  const paused = [];
  for (let i = 0; i < running.length; i += 1) {
    const doc = await exports.pauseTask(req, running[i]._id);
    if (doc) {
      paused.push(doc);
    }
  }
  return {
    pausedCount: paused.length,
    tasks: paused
  };
};

exports.resumeTasks = async (req, filters = {}) => {
  const pausedList = await exports.getPausedTasks(req, filters);
  const resumed = [];
  for (let i = 0; i < pausedList.length; i += 1) {
    const doc = await exports.resumeTask(req, pausedList[i]._id);
    if (doc) {
      resumed.push(doc);
    }
  }
  return {
    resumedCount: resumed.length,
    tasks: resumed
  };
};

exports.evaluateWhenCondition = (whenRule, context = {}) => {
  const hasFailed = Boolean(context.hasFailed);
  const outputs = context.outputs || {};
  const env = context.env || {};

  if (whenRule === undefined || whenRule === null || whenRule === WHEN_CONDITIONS.ON_SUCCESS) {
    return !hasFailed;
  }
  if (whenRule === WHEN_CONDITIONS.ON_FAILURE) {
    return hasFailed;
  }
  if (whenRule === WHEN_CONDITIONS.ALWAYS) {
    return true;
  }
  if (typeof whenRule === 'function') {
    return Boolean(whenRule({ hasFailed, outputs, env }));
  }
  if (typeof whenRule === 'object') {
    const statusRule = whenRule.status || whenRule.condition || (
      whenRule.always ? WHEN_CONDITIONS.ALWAYS : WHEN_CONDITIONS.ON_SUCCESS
    );
    if (statusRule === WHEN_CONDITIONS.ON_FAILURE && !hasFailed) {
      return false;
    }
    if (statusRule === WHEN_CONDITIONS.ON_SUCCESS && hasFailed) {
      return false;
    }

    const outputRules = whenRule.output || whenRule.outputs;
    if (outputRules && typeof outputRules === 'object') {
      const outKeys = Object.keys(outputRules);
      for (let i = 0; i < outKeys.length; i += 1) {
        const key = outKeys[i];
        const expected = outputRules[key];
        const actual = outputs[key] !== undefined ? String(outputs[key]) : '';
        if (Array.isArray(expected)) {
          if (!expected.map(String).includes(actual)) {
            return false;
          }
        } else if (actual !== String(expected)) {
          return false;
        }
      }
    }

    if (whenRule.notOutput && typeof whenRule.notOutput === 'object') {
      const notKeys = Object.keys(whenRule.notOutput);
      for (let i = 0; i < notKeys.length; i += 1) {
        const key = notKeys[i];
        const disallowed = whenRule.notOutput[key];
        const actual = outputs[key] !== undefined ? String(outputs[key]) : '';
        if (Array.isArray(disallowed)) {
          if (disallowed.map(String).includes(actual)) {
            return false;
          }
        } else if (actual === String(disallowed)) {
          return false;
        }
      }
    }

    if (whenRule.env && typeof whenRule.env === 'object') {
      const envKeys = Object.keys(whenRule.env);
      for (let i = 0; i < envKeys.length; i += 1) {
        const key = envKeys[i];
        const expected = whenRule.env[key];
        const actual = env[key] !== undefined ? String(env[key]) : '';
        if (Array.isArray(expected)) {
          if (!expected.map(String).includes(actual)) {
            return false;
          }
        } else if (actual !== String(expected)) {
          return false;
        }
      }
    }

    return true;
  }

  return !hasFailed;
};

const computeMatrixCombinations = (matrixObj) => {
  if (!matrixObj || typeof matrixObj !== 'object') {
    return [];
  }
  const keys = Object.keys(matrixObj).filter((k) => Array.isArray(matrixObj[k]) && matrixObj[k].length > 0);
  if (keys.length === 0) {
    return [];
  }
  let combos = [{}];
  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i];
    const values = matrixObj[key];
    const nextCombos = [];
    for (let c = 0; c < combos.length; c += 1) {
      for (let v = 0; v < values.length; v += 1) {
        nextCombos.push({
          ...combos[c],
          [key]: String(values[v])
        });
      }
    }
    combos = nextCombos;
  }
  return combos;
};

exports.expandMatrixTasks = (batchDef = {}) => {
  const baseTasks = Array.isArray(batchDef.tasks) && batchDef.tasks.length > 0
    ? batchDef.tasks
    : (batchDef.cmd || batchDef.script || batchDef.scriptPath || batchDef.file
      ? [{
        name: batchDef.taskName || batchDef.name || 'Matrix Task',
        cmd: batchDef.cmd,
        script: batchDef.script,
        scriptPath: batchDef.scriptPath || batchDef.file,
        args: batchDef.args,
        shell: batchDef.shell,
        cwd: batchDef.cwd,
        env: batchDef.env,
        when: batchDef.taskWhen
      }]
      : []);

  const batchCombos = computeMatrixCombinations(batchDef.matrix);
  const expanded = [];

  for (let i = 0; i < baseTasks.length; i += 1) {
    const rawItem = baseTasks[i];
    const taskTemplate = typeof rawItem === 'string' ? { cmd: rawItem } : (rawItem || {});
    const taskCombos = computeMatrixCombinations(taskTemplate.matrix);
    const activeCombos = taskCombos.length > 0 ? taskCombos : batchCombos;

    if (activeCombos.length === 0) {
      expanded.push(taskTemplate);
    } else {
      for (let c = 0; c < activeCombos.length; c += 1) {
        const combo = activeCombos[c];
        const label = Object.entries(combo)
          .map(([k, v]) => `${k}=${v}`)
          .join(', ');
        const baseName = taskTemplate.name || taskTemplate.scriptPath || taskTemplate.cmd || `Task ${i + 1}`;
        const { _id: _omitId, taskId: _omitTaskId, matrix: _omitMatrix, ...restTemplate } = taskTemplate;
        expanded.push({
          ...restTemplate,
          name: `${baseName} [${label}]`,
          env: {
            ...(batchDef.env || {}),
            ...(taskTemplate.env || {}),
            ...combo
          },
          matrixValues: combo
        });
      }
    }
  }

  return expanded;
};

const executeSingleTaskAttempt = async (req, taskDoc, attemptNumber = 0) => {
  const taskCol = getCollection(req, COLLECTIONS.TASK);
  const runnerCol = getCollection(req, COLLECTIONS.RUNNER);

  const runnerDoc = taskDoc.runnerId && runnerCol
    ? await runnerCol.findOne({ _id: taskDoc.runnerId })
    : null;

  const logFilePath = getLogFilePath(taskDoc._id);
  if (attemptNumber === 0 && (!taskDoc.byteOffset || Number(taskDoc.byteOffset) === 0)) {
    fs.writeFileSync(logFilePath, '', 'utf8');
  }

  // Merge upstream runner outputs (##[set-output KEY=VAL]) into task environment
  const effectiveEnv = {
    ...((runnerDoc && runnerDoc.outputs) || {}),
    ...(taskDoc.env || {})
  };

  const secretKeys = [
    ...(Array.isArray(runnerDoc && runnerDoc.secretKeys) ? runnerDoc.secretKeys : []),
    ...(Array.isArray(taskDoc.secretKeys) ? taskDoc.secretKeys : [])
  ];
  const explicitSecrets = [
    ...(Array.isArray(runnerDoc && runnerDoc.secrets) ? runnerDoc.secrets : []),
    ...(Array.isArray(taskDoc.secrets) ? taskDoc.secrets : [])
  ];
  const secretValues = logger.extractSecretValues(effectiveEnv, secretKeys, explicitSecrets);

  const prepared = processUtils.prepareTaskCommand(taskDoc, taskDoc._id);
  const resolvedCmd = prepared.cmd || taskDoc.cmd;

  const startedAt = Date.now();
  await taskCol.updateOne(
    { _id: taskDoc._id },
    {
      $set: {
        cmd: resolvedCmd,
        retryCount: attemptNumber,
        status: TASK_STATUS.STARTED,
        startedAt,
        updatedAt: startedAt
      }
    }
  );

  let logFd;
  try {
    logFd = fs.openSync(logFilePath, 'a');
  } catch (openErr) {
    await taskCol.updateOne(
      { _id: taskDoc._id },
      { $set: { status: TASK_STATUS.FAILED, exitCode: -1, updatedAt: Date.now() } }
    );
    throw openErr;
  }

  let child;
  try {
    child = processUtils.spawnShellProcess(resolvedCmd, {
      cwd: taskDoc.cwd || process.cwd(),
      env: effectiveEnv,
      logFd,
      shell: prepared.shell || taskDoc.shell || true
    });
  } finally {
    try {
      fs.closeSync(logFd);
    } catch (_closeErr) {
      // Ignore close error in parent
    }
  }

  const pid = child.pid || null;
  const hostId = taskDoc.hostId || getHostId(req);
  const runningDoc = {
    ...taskDoc,
    hostId,
    cmd: resolvedCmd,
    env: effectiveEnv,
    secretValues,
    retryCount: attemptNumber,
    pid,
    controlState: CONTROL_STATES.NORMAL,
    status: TASK_STATUS.RUNNING,
    byteOffset: Number(taskDoc.byteOffset || 0),
    startedAt
  };

  await taskCol.updateOne(
    { _id: taskDoc._id },
    {
      $set: {
        pid,
        hostId,
        controlState: CONTROL_STATES.NORMAL,
        retryCount: attemptNumber,
        status: TASK_STATUS.RUNNING,
        updatedAt: Date.now()
      }
    }
  );

  await logger.recordLifecycleEvent(
    req,
    {
      mapId: taskDoc.mapId,
      runnerId: taskDoc.runnerId,
      batchId: taskDoc.batchId,
      taskId: taskDoc._id,
      secretValues
    },
    EVENT_TYPES.LIFECYCLE,
    `Task started (PID: ${pid}${attemptNumber > 0 ? `, retry #${attemptNumber}` : ''}): ${logger.maskSecrets(resolvedCmd, secretValues)}`
  );

  const { promise, resolve } = Promise.withResolvers();

  const taskWatcher = watcher.ensureTaskWatcher(
    req,
    { ...runningDoc, childProcess: child },
    (_err, finalTaskDoc) => {
      resolve(finalTaskDoc);
    }
  );

  child.on('error', async (spawnErr) => {
    try {
      fs.appendFileSync(logFilePath, `##[error] Spawn error: ${spawnErr.message}\n`, 'utf8');
    } catch (_e) {
      // Ignore write error
    }
    await watcher.finalizeTaskWatcher(req, taskWatcher, -1, TASK_STATUS.FAILED);
  });

  child.on('exit', async (code, signal) => {
    const exitCode = typeof code === 'number' ? code : (signal ? 1 : -1);
    await watcher.finalizeTaskWatcher(req, taskWatcher, exitCode);
  });

  return promise;
};

exports.executeTask = async (req, taskInput) => {
  const taskCol = getCollection(req, COLLECTIONS.TASK);
  const batchCol = getCollection(req, COLLECTIONS.BATCH);
  const runnerCol = getCollection(req, COLLECTIONS.RUNNER);

  const taskId = taskInput && typeof taskInput === 'object' && taskInput._id !== undefined
    ? taskInput._id
    : taskInput;

  let taskDoc = await taskCol.findOne({ _id: taskId });
  if (!taskDoc && typeof taskInput === 'object') {
    taskDoc = taskInput;
  }
  if (!taskDoc) {
    throw Error(`Task "${taskId}" not found`);
  }

  // Re-verify task, batch, and runner states prior to spawning
  if (taskDoc.status === TASK_STATUS.SKIPPED) {
    return taskDoc;
  }

  const [batchDoc, runnerDoc] = await Promise.all([
    taskDoc.batchId && batchCol ? batchCol.findOne({ _id: taskDoc.batchId }) : null,
    taskDoc.runnerId && runnerCol ? runnerCol.findOne({ _id: taskDoc.runnerId }) : null
  ]);

  if (
    taskDoc.status === TASK_STATUS.STOPPED ||
    (batchDoc && batchDoc.status === BATCH_STATUS.STOPPED) ||
    (runnerDoc && (runnerDoc.controlState === CONTROL_STATES.STOP_REQUESTED || runnerDoc.status === RUNNER_STATUS.STOPPED))
  ) {
    await taskCol.updateOne(
      { _id: taskDoc._id },
      { $set: { status: TASK_STATUS.STOPPED, updatedAt: Date.now() } }
    );
    return { ...taskDoc, status: TASK_STATUS.STOPPED };
  }

  if (batchDoc && batchDoc.status === BATCH_STATUS.SKIPPED) {
    await taskCol.updateOne(
      { _id: taskDoc._id },
      { $set: { status: TASK_STATUS.SKIPPED, updatedAt: Date.now() } }
    );
    return { ...taskDoc, status: TASK_STATUS.SKIPPED };
  }

  const maxRetries = Math.max(0, Number(taskDoc.maxRetries || 0));
  const baseRetryDelayMs = Math.max(10, Number(taskDoc.retryDelayMs || DEFAULT_RETRY_DELAY_MS));
  const backoffFactor = Math.max(1, Number(taskDoc.retryBackoffFactor || DEFAULT_RETRY_BACKOFF_FACTOR));

  let attempt = 0;
  let finalResult = null;

  while (attempt <= maxRetries) {
    const freshTask = (await taskCol.findOne({ _id: taskDoc._id })) || taskDoc;
    finalResult = await executeSingleTaskAttempt(req, freshTask, attempt);

    if (
      !finalResult ||
      finalResult.status === TASK_STATUS.DONE ||
      finalResult.status === TASK_STATUS.STOPPED ||
      finalResult.status === TASK_STATUS.SKIPPED ||
      attempt >= maxRetries
    ) {
      break;
    }

    // Check if runner or batch was stopped or paused before retrying
    const [latestBatch, latestRunner] = await Promise.all([
      taskDoc.batchId && batchCol ? batchCol.findOne({ _id: taskDoc.batchId }) : null,
      taskDoc.runnerId && runnerCol ? runnerCol.findOne({ _id: taskDoc.runnerId }) : null
    ]);

    if (
      (latestBatch && (latestBatch.status === BATCH_STATUS.STOPPED || latestBatch.status === BATCH_STATUS.SKIPPED)) ||
      (latestRunner && (
        latestRunner.controlState === CONTROL_STATES.STOP_REQUESTED ||
        latestRunner.controlState === CONTROL_STATES.PAUSE_REQUESTED ||
        latestRunner.status === RUNNER_STATUS.STOPPED
      ))
    ) {
      break;
    }

    const delayMs = Math.round(baseRetryDelayMs * Math.pow(backoffFactor, attempt));
    attempt += 1;

    await logger.recordLifecycleEvent(
      req,
      {
        mapId: taskDoc.mapId,
        runnerId: taskDoc.runnerId,
        batchId: taskDoc.batchId,
        taskId: taskDoc._id
      },
      EVENT_TYPES.WARNING,
      `Task "${taskDoc.name || taskDoc._id}" failed (attempt ${attempt}/${maxRetries + 1}); retrying in ${delayMs}ms`
    );

    await sleep(delayMs);
  }

  return finalResult;
};

exports.runBatch = async (req, batchInput) => {
  const batchCol = getCollection(req, COLLECTIONS.BATCH);
  const taskCol = getCollection(req, COLLECTIONS.TASK);
  const runnerCol = getCollection(req, COLLECTIONS.RUNNER);

  const batchId = batchInput && typeof batchInput === 'object' && batchInput._id !== undefined
    ? batchInput._id
    : batchInput;

  let batchDoc = await batchCol.findOne({ _id: batchId });
  if (!batchDoc && typeof batchInput === 'object') {
    batchDoc = batchInput;
  }
  if (!batchDoc) {
    throw Error(`Batch "${batchId}" not found`);
  }

  if (batchDoc.status === BATCH_STATUS.SKIPPED) {
    await taskCol.updateMany(
      { batchId: batchDoc._id, status: TASK_STATUS.QUEUED },
      { $set: { status: TASK_STATUS.SKIPPED, updatedAt: Date.now() } }
    );
    return batchDoc;
  }

  const runnerDoc = batchDoc.runnerId && runnerCol
    ? await runnerCol.findOne({ _id: batchDoc.runnerId })
    : null;

  if (
    batchDoc.status === BATCH_STATUS.STOPPED ||
    (runnerDoc && (runnerDoc.controlState === CONTROL_STATES.STOP_REQUESTED || runnerDoc.status === RUNNER_STATUS.STOPPED))
  ) {
    await batchCol.updateOne(
      { _id: batchDoc._id },
      { $set: { status: BATCH_STATUS.STOPPED, updatedAt: Date.now() } }
    );
    return { ...batchDoc, status: BATCH_STATUS.STOPPED };
  }

  if (runnerDoc && runnerDoc.controlState === CONTROL_STATES.PAUSE_REQUESTED) {
    await batchCol.updateOne(
      { _id: batchDoc._id },
      { $set: { status: BATCH_STATUS.PAUSED, updatedAt: Date.now() } }
    );
    await runnerCol.updateOne(
      { _id: runnerDoc._id },
      { $set: { status: RUNNER_STATUS.PAUSED, updatedAt: Date.now() } }
    );
    return { ...batchDoc, status: BATCH_STATUS.PAUSED };
  }

  const batchStartedAt = batchDoc.startedAt || Date.now();
  await batchCol.updateOne(
    { _id: batchDoc._id },
    { $set: { status: BATCH_STATUS.RUNNING, startedAt: batchStartedAt, updatedAt: Date.now() } }
  );

  await logger.recordLifecycleEvent(
    req,
    {
      mapId: batchDoc.mapId,
      runnerId: batchDoc.runnerId,
      batchId: batchDoc._id,
      taskId: null
    },
    EVENT_TYPES.LIFECYCLE,
    `Batch "${batchDoc.name || batchDoc._id}" started in ${batchDoc.mode || BATCH_MODES.QUEUE} mode`
  );

  const tasks = await findMany(taskCol, { batchId: batchDoc._id });

  if (batchDoc.mode === BATCH_MODES.PARALLEL) {
    const currentRunner = batchDoc.runnerId && runnerCol
      ? await runnerCol.findOne({ _id: batchDoc.runnerId })
      : null;

    const activePromises = tasks.map(async (task) => {
      const freshTask = (await taskCol.findOne({ _id: task._id })) || task;
      if (freshTask.status === TASK_STATUS.QUEUED) {
        if (freshTask.when) {
          const shouldRun = exports.evaluateWhenCondition(freshTask.when, {
            hasFailed: Boolean(currentRunner && currentRunner.status === RUNNER_STATUS.FAILED),
            outputs: (currentRunner && currentRunner.outputs) || {},
            env: freshTask.env || {},
            runner: currentRunner,
            batch: batchDoc
          });
          if (!shouldRun) {
            return exports.skipTask(req, freshTask._id);
          }
        }
        return exports.executeTask(req, freshTask);
      }
      if (freshTask.status === TASK_STATUS.RUNNING || freshTask.status === TASK_STATUS.PAUSED) {
        const existingWatcher = broadcaster.getWatcher(freshTask._id);
        if (existingWatcher && !existingWatcher.isFinalized) {
          const { promise, resolve } = Promise.withResolvers();
          existingWatcher.callbacks.push((_err, finalDoc) => resolve(finalDoc));
          return promise;
        }
      }
      return freshTask;
    });

    await Promise.all(activePromises);
  } else {
    // Queue mode (FIFO sequential up to maxQueueConcurrency)
    const concurrency = Math.max(1, Number(batchDoc.maxQueueConcurrency || DEFAULT_CONCURRENCY));
    let cursorIndex = 0;
    let stopPulling = false;
    let batchHasFailed = false;

    const runWorker = async () => {
      while (!stopPulling && cursorIndex < tasks.length) {
        const currentRunner = batchDoc.runnerId && runnerCol
          ? await runnerCol.findOne({ _id: batchDoc.runnerId })
          : null;
        const currentBatch = await batchCol.findOne({ _id: batchDoc._id });

        if (
          (currentBatch && (currentBatch.status === BATCH_STATUS.STOPPED || currentBatch.status === BATCH_STATUS.SKIPPED)) ||
          (currentRunner && (currentRunner.controlState === CONTROL_STATES.STOP_REQUESTED || currentRunner.status === RUNNER_STATUS.STOPPED))
        ) {
          stopPulling = true;
          break;
        }

        if (currentRunner && currentRunner.controlState === CONTROL_STATES.PAUSE_REQUESTED) {
          stopPulling = true;
          break;
        }

        const taskCandidate = tasks[cursorIndex];
        cursorIndex += 1;
        if (!taskCandidate) {
          break;
        }

        const freshTask = (await taskCol.findOne({ _id: taskCandidate._id })) || taskCandidate;

        if (freshTask.status === TASK_STATUS.SKIPPED || freshTask.status === TASK_STATUS.DONE) {
          continue;
        }

        if (freshTask.status === TASK_STATUS.RUNNING || freshTask.status === TASK_STATUS.PAUSED) {
          const existingWatcher = broadcaster.getWatcher(freshTask._id);
          if (existingWatcher && !existingWatcher.isFinalized) {
            const { promise, resolve } = Promise.withResolvers();
            existingWatcher.callbacks.push((_err, finalDoc) => resolve(finalDoc));
            const finishedTask = await promise;
            if (
              finishedTask &&
              (finishedTask.status === TASK_STATUS.FAILED || finishedTask.status === TASK_STATUS.TIMEOUT) &&
              !batchDoc.continueOnError
            ) {
              batchHasFailed = true;
              const hasConditionalRemaining = tasks.slice(cursorIndex).some((t) => Boolean(t.when));
              if (!hasConditionalRemaining) {
                stopPulling = true;
                break;
              }
            }
          }
          continue;
        }

        if (freshTask.status !== TASK_STATUS.QUEUED) {
          continue;
        }

        if (freshTask.when) {
          const shouldRun = exports.evaluateWhenCondition(freshTask.when, {
            hasFailed: batchHasFailed || Boolean(currentRunner && currentRunner.status === RUNNER_STATUS.FAILED),
            outputs: (currentRunner && currentRunner.outputs) || {},
            env: freshTask.env || {},
            runner: currentRunner,
            batch: currentBatch || batchDoc
          });
          if (!shouldRun) {
            await exports.skipTask(req, freshTask._id);
            continue;
          }
        } else if (batchHasFailed && !batchDoc.continueOnError) {
          const hasConditionalRemaining = tasks.slice(cursorIndex).some((t) => Boolean(t.when));
          if (!hasConditionalRemaining) {
            stopPulling = true;
            break;
          }
          continue;
        }

        const completedTask = await exports.executeTask(req, freshTask);
        if (
          completedTask &&
          (completedTask.status === TASK_STATUS.FAILED || completedTask.status === TASK_STATUS.TIMEOUT) &&
          !batchDoc.continueOnError
        ) {
          batchHasFailed = true;
          const hasConditionalRemaining = tasks.slice(cursorIndex).some((t) => Boolean(t.when));
          if (!hasConditionalRemaining) {
            stopPulling = true;
            break;
          }
        }
      }
    };

    const workerCount = Math.min(concurrency, Math.max(1, tasks.length));
    const workers = [];
    for (let i = 0; i < workerCount; i += 1) {
      workers.push(runWorker());
    }
    await Promise.all(workers);
  }

  // Re-evaluate final batch status from latest DB documents
  const [latestBatch, latestRunner, latestTasks] = await Promise.all([
    batchCol.findOne({ _id: batchDoc._id }),
    batchDoc.runnerId && runnerCol ? runnerCol.findOne({ _id: batchDoc.runnerId }) : null,
    findMany(taskCol, { batchId: batchDoc._id })
  ]);

  let finalBatchStatus = BATCH_STATUS.BATCH_DONE;

  if (
    (latestBatch && latestBatch.status === BATCH_STATUS.STOPPED) ||
    (latestRunner && (latestRunner.controlState === CONTROL_STATES.STOP_REQUESTED || latestRunner.status === RUNNER_STATUS.STOPPED))
  ) {
    finalBatchStatus = BATCH_STATUS.STOPPED;
  } else if (
    (latestBatch && latestBatch.status === BATCH_STATUS.SKIPPED) ||
    (latestTasks.length > 0 && latestTasks.every((t) => t.status === TASK_STATUS.SKIPPED))
  ) {
    finalBatchStatus = BATCH_STATUS.SKIPPED;
  } else if (
    latestRunner &&
    latestRunner.controlState === CONTROL_STATES.PAUSE_REQUESTED &&
    latestTasks.some((t) => t.status === TASK_STATUS.QUEUED || t.status === TASK_STATUS.PAUSED)
  ) {
    finalBatchStatus = BATCH_STATUS.PAUSED;
  } else if (latestTasks.some((t) => t.status === TASK_STATUS.PAUSED)) {
    finalBatchStatus = BATCH_STATUS.PAUSED;
  } else if (latestTasks.some((t) => t.status === TASK_STATUS.FAILED || t.status === TASK_STATUS.TIMEOUT)) {
    finalBatchStatus = BATCH_STATUS.FAILED;
  } else if (latestTasks.some((t) => t.status === TASK_STATUS.STOPPED)) {
    finalBatchStatus = BATCH_STATUS.STOPPED;
  }

  const finishedAt = Date.now();
  const durationMs = Math.max(0, finishedAt - batchStartedAt);
  await batchCol.updateOne(
    { _id: batchDoc._id },
    { $set: { status: finalBatchStatus, finishedAt, durationMs, updatedAt: finishedAt } }
  );

  await logger.recordLifecycleEvent(
    req,
    {
      mapId: batchDoc.mapId,
      runnerId: batchDoc.runnerId,
      batchId: batchDoc._id,
      taskId: null
    },
    EVENT_TYPES.STATUS,
    `Batch "${batchDoc.name || batchDoc._id}" transitioned to "${finalBatchStatus}"`
  );

  const updatedBatch = await batchCol.findOne({ _id: batchDoc._id });
  return updatedBatch || { ...batchDoc, status: finalBatchStatus, durationMs };
};

const notifyRunnerFinished = async (req, runnerDoc) => {
  if (!runnerDoc || !runnerDoc._id) {
    return;
  }

  const terminalStatuses = [
    RUNNER_STATUS.COMPLETED,
    RUNNER_STATUS.FAILED,
    RUNNER_STATUS.TIMEOUT,
    RUNNER_STATUS.STOPPED
  ];
  if (!terminalStatuses.includes(runnerDoc.status)) {
    return;
  }

  const runnerKey = normalizeId(runnerDoc._id);
  const batchCol = getCollection(req, COLLECTIONS.BATCH);
  const taskCol = getCollection(req, COLLECTIONS.TASK);

  const [batches, tasks] = await Promise.all([
    findMany(batchCol, { runnerId: runnerDoc._id }),
    findMany(taskCol, { runnerId: runnerDoc._id })
  ]);

  const finishedAt = runnerDoc.finishedAt || Date.now();
  const eventPayload = {
    event: `runner.${String(runnerDoc.status).toLowerCase()}`,
    runnerId: runnerDoc._id,
    mapId: runnerDoc.mapId,
    status: runnerDoc.status,
    outputs: runnerDoc.outputs || {},
    startedAt: runnerDoc.startedAt || null,
    finishedAt,
    durationMs: runnerDoc.durationMs !== undefined && runnerDoc.durationMs !== null
      ? runnerDoc.durationMs
      : (runnerDoc.startedAt ? Math.max(0, finishedAt - runnerDoc.startedAt) : 0),
    runner: runnerDoc,
    batches,
    tasks
  };

  if (runnerDoc.cleanupTempOnFinish) {
    try {
      await exports.cleanupRunnerFiles(req, runnerDoc._id);
    } catch (_err) {
      // Ignore cleanup error
    }
  }

  const onFinishCb = runnerFinishCallbacks[runnerKey];
  if (typeof onFinishCb === 'function') {
    delete runnerFinishCallbacks[runnerKey];
    try {
      await onFinishCb(eventPayload);
    } catch (_err) {
      // Ignore callback error
    }
  }

  for (let i = 0; i < lifecycleHooks.length; i += 1) {
    try {
      await lifecycleHooks[i](eventPayload, req);
    } catch (_err) {
      // Ignore hook error
    }
  }

  const customWebhookTransport = runnerWebhookTransports[runnerKey];
  delete runnerWebhookTransports[runnerKey];

  if (runnerDoc.webhookUrl) {
    await exports.dispatchRunnerWebhook(runnerDoc.webhookUrl, eventPayload, {
      webhookSecret: runnerDoc.webhookSecret,
      webhookHeaders: runnerDoc.webhookHeaders,
      webhookTransport: customWebhookTransport
    });
  }
};

exports.executeRunner = async (req, runnerId) => {
  const runnerKey = normalizeId(runnerId);
  if (activeRunnerLoops[runnerKey]) {
    return activeRunnerLoops[runnerKey];
  }

  const runnerCol = getCollection(req, COLLECTIONS.RUNNER);
  const batchCol = getCollection(req, COLLECTIONS.BATCH);
  const taskCol = getCollection(req, COLLECTIONS.TASK);

  const runPipeline = async () => {
    let runnerDoc = await runnerCol.findOne({ _id: runnerId });
    if (!runnerDoc) {
      throw Error(`Runner "${runnerId}" not found`);
    }

    if (runnerDoc.controlState === CONTROL_STATES.STOP_REQUESTED || runnerDoc.status === RUNNER_STATUS.STOPPED) {
      const stopNow = runnerDoc.finishedAt || Date.now();
      const stopDuration = runnerDoc.startedAt ? Math.max(0, stopNow - runnerDoc.startedAt) : 0;
      await runnerCol.updateOne(
        { _id: runnerId },
        { $set: { status: RUNNER_STATUS.STOPPED, finishedAt: stopNow, durationMs: stopDuration, updatedAt: Date.now() } }
      );
      const stoppedDoc = await runnerCol.findOne({ _id: runnerId });
      await notifyRunnerFinished(req, stoppedDoc);
      return stoppedDoc;
    }

    if (runnerDoc.controlState === CONTROL_STATES.PAUSE_REQUESTED) {
      await runnerCol.updateOne(
        { _id: runnerId },
        { $set: { status: RUNNER_STATUS.PAUSED, updatedAt: Date.now() } }
      );
      return runnerCol.findOne({ _id: runnerId });
    }

    const runnerStartedAt = runnerDoc.startedAt || Date.now();
    await runnerCol.updateOne(
      { _id: runnerId },
      { $set: { status: RUNNER_STATUS.RUNNING, startedAt: runnerStartedAt, updatedAt: Date.now() } }
    );

    const batches = await findMany(batchCol, { runnerId });
    const startIdx = Math.max(0, Number(runnerDoc.currentBatchIndex || 0));

    let runnerHasFailed = false;
    let runnerFailureStatus = RUNNER_STATUS.FAILED;

    // Check if any prior batch before startIdx already failed
    for (let pIdx = 0; pIdx < startIdx && pIdx < batches.length; pIdx += 1) {
      if (batches[pIdx].status === BATCH_STATUS.FAILED) {
        runnerHasFailed = true;
      }
    }

    for (let idx = startIdx; idx < batches.length; idx += 1) {
      runnerDoc = await runnerCol.findOne({ _id: runnerId });
      if (!runnerDoc) {
        break;
      }

      if (runnerDoc.controlState === CONTROL_STATES.STOP_REQUESTED || runnerDoc.status === RUNNER_STATUS.STOPPED) {
        const stopNow = Date.now();
        await runnerCol.updateOne(
          { _id: runnerId },
          {
            $set: {
              status: RUNNER_STATUS.STOPPED,
              finishedAt: stopNow,
              durationMs: Math.max(0, stopNow - runnerStartedAt),
              updatedAt: stopNow
            }
          }
        );
        await logger.recordLifecycleEvent(
          req,
          { mapId: runnerDoc.mapId, runnerId, batchId: null, taskId: null },
          EVENT_TYPES.STATUS,
          'Runner stopped'
        );
        const stoppedDoc = await runnerCol.findOne({ _id: runnerId });
        await notifyRunnerFinished(req, stoppedDoc);
        return stoppedDoc;
      }

      if (runnerDoc.controlState === CONTROL_STATES.PAUSE_REQUESTED) {
        await runnerCol.updateOne(
          { _id: runnerId },
          { $set: { status: RUNNER_STATUS.PAUSED, currentBatchIndex: idx, updatedAt: Date.now() } }
        );
        await logger.recordLifecycleEvent(
          req,
          { mapId: runnerDoc.mapId, runnerId, batchId: null, taskId: null },
          EVENT_TYPES.STATUS,
          'Runner paused before next batch'
        );
        return runnerCol.findOne({ _id: runnerId });
      }

      await runnerCol.updateOne(
        { _id: runnerId },
        { $set: { currentBatchIndex: idx, updatedAt: Date.now() } }
      );

      const currentBatch = await batchCol.findOne({ _id: batches[idx]._id });
      if (!currentBatch) {
        continue;
      }

      if (currentBatch.status === BATCH_STATUS.SKIPPED || currentBatch.status === BATCH_STATUS.BATCH_DONE) {
        continue;
      }

      // Evaluate batch-level `when` condition if specified
      if (currentBatch.when) {
        const shouldRunBatch = exports.evaluateWhenCondition(currentBatch.when, {
          hasFailed: runnerHasFailed,
          outputs: runnerDoc.outputs || {},
          env: {},
          runner: runnerDoc,
          batch: currentBatch
        });
        if (!shouldRunBatch) {
          await exports.skipBatch(req, currentBatch._id);
          await logger.recordLifecycleEvent(
            req,
            { mapId: runnerDoc.mapId, runnerId, batchId: currentBatch._id, taskId: null },
            EVENT_TYPES.LIFECYCLE,
            `Batch "${currentBatch.name || currentBatch._id}" skipped because when condition was not met`
          );
          continue;
        }
      } else if (runnerHasFailed) {
        // Normal batch without `when` should not run after an upstream batch failed
        const hasConditionalDownstream = batches.slice(idx + 1).some((b) => Boolean(b.when));
        if (hasConditionalDownstream) {
          continue;
        }
        break;
      }

      // Manual Approval Gate check
      if (currentBatch.requiresApproval && currentBatch.approvalStatus !== APPROVAL_STATUS.APPROVED) {
        const gateNow = Date.now();
        const timeoutMs = Math.max(0, Number(currentBatch.approvalTimeoutMs || 0));
        await batchCol.updateOne(
          { _id: currentBatch._id },
          {
            $set: {
              status: BATCH_STATUS.AWAITING_APPROVAL,
              approvalStatus: APPROVAL_STATUS.PENDING,
              updatedAt: gateNow
            }
          }
        );
        await runnerCol.updateOne(
          { _id: runnerId },
          {
            $set: {
              status: RUNNER_STATUS.AWAITING_APPROVAL,
              currentBatchIndex: idx,
              updatedAt: gateNow
            }
          }
        );
        if (timeoutMs > 0) {
          clearApprovalGateTimer(currentBatch._id);
          const batchKey = normalizeId(currentBatch._id);
          const timer = setTimeout(async () => {
            delete approvalGateTimers[batchKey];
            try {
              const latestBatch = await batchCol.findOne({ _id: currentBatch._id });
              if (
                latestBatch &&
                latestBatch.status === BATCH_STATUS.AWAITING_APPROVAL &&
                latestBatch.approvalStatus === APPROVAL_STATUS.PENDING
              ) {
                await exports.expireBatchApproval(req, currentBatch._id, {
                  reason: `Approval gate timed out after ${timeoutMs}ms`
                });
              }
            } catch (_err) {
              // Ignore expiration error
            }
          }, timeoutMs);
          if (timer && typeof timer.unref === 'function') {
            timer.unref();
          }
          approvalGateTimers[batchKey] = {
            timer,
            expiresAt: gateNow + timeoutMs
          };
        }
        await logger.recordLifecycleEvent(
          req,
          { mapId: runnerDoc.mapId, runnerId, batchId: currentBatch._id, taskId: null },
          EVENT_TYPES.STATUS,
          `Batch "${currentBatch.name || currentBatch._id}" is awaiting manual approval${timeoutMs > 0 ? ` (timeout: ${timeoutMs}ms)` : ''}`
        );
        return runnerCol.findOne({ _id: runnerId });
      }

      const finishedBatch = await exports.runBatch(req, currentBatch);
      const postBatchRunner = await runnerCol.findOne({ _id: runnerId });

      if (
        (postBatchRunner && postBatchRunner.controlState === CONTROL_STATES.STOP_REQUESTED) ||
        (postBatchRunner && postBatchRunner.status === RUNNER_STATUS.STOPPED) ||
        finishedBatch.status === BATCH_STATUS.STOPPED
      ) {
        const stopNow = Date.now();
        await runnerCol.updateOne(
          { _id: runnerId },
          {
            $set: {
              status: RUNNER_STATUS.STOPPED,
              finishedAt: stopNow,
              durationMs: Math.max(0, stopNow - runnerStartedAt),
              updatedAt: stopNow
            }
          }
        );
        await logger.recordLifecycleEvent(
          req,
          { mapId: runnerDoc.mapId, runnerId, batchId: currentBatch._id, taskId: null },
          EVENT_TYPES.STATUS,
          'Runner stopped'
        );
        const stoppedDoc = await runnerCol.findOne({ _id: runnerId });
        await notifyRunnerFinished(req, stoppedDoc);
        return stoppedDoc;
      }

      if (
        finishedBatch.status === BATCH_STATUS.PAUSED ||
        (postBatchRunner && postBatchRunner.controlState === CONTROL_STATES.PAUSE_REQUESTED)
      ) {
        const nextIdx = finishedBatch.status === BATCH_STATUS.BATCH_DONE ? idx + 1 : idx;
        await runnerCol.updateOne(
          { _id: runnerId },
          { $set: { status: RUNNER_STATUS.PAUSED, currentBatchIndex: nextIdx, updatedAt: Date.now() } }
        );
        await logger.recordLifecycleEvent(
          req,
          { mapId: runnerDoc.mapId, runnerId, batchId: currentBatch._id, taskId: null },
          EVENT_TYPES.STATUS,
          'Runner paused'
        );
        return runnerCol.findOne({ _id: runnerId });
      }

      if (finishedBatch.status === BATCH_STATUS.FAILED) {
        const batchTasks = await findMany(taskCol, { batchId: currentBatch._id });
        const hasTimeout = batchTasks.some((t) => t.status === TASK_STATUS.TIMEOUT);
        const failStatus = hasTimeout ? RUNNER_STATUS.TIMEOUT : RUNNER_STATUS.FAILED;

        runnerHasFailed = true;
        runnerFailureStatus = failStatus;

        const hasConditionalDownstream = batches.slice(idx + 1).some((b) => Boolean(b.when));
        if (!hasConditionalDownstream) {
          const failNow = Date.now();
          await runnerCol.updateOne(
            { _id: runnerId },
            {
              $set: {
                status: failStatus,
                finishedAt: failNow,
                durationMs: Math.max(0, failNow - runnerStartedAt),
                updatedAt: failNow
              }
            }
          );
          await logger.recordLifecycleEvent(
            req,
            { mapId: runnerDoc.mapId, runnerId, batchId: currentBatch._id, taskId: null },
            hasTimeout ? EVENT_TYPES.TIMEOUT : EVENT_TYPES.ERROR,
            `Runner ${failStatus} at batch "${currentBatch.name || currentBatch._id}"`
          );
          const failedDoc = await runnerCol.findOne({ _id: runnerId });
          await notifyRunnerFinished(req, failedDoc);
          return failedDoc;
        }

        await logger.recordLifecycleEvent(
          req,
          { mapId: runnerDoc.mapId, runnerId, batchId: currentBatch._id, taskId: null },
          hasTimeout ? EVENT_TYPES.TIMEOUT : EVENT_TYPES.ERROR,
          `Batch "${currentBatch.name || currentBatch._id}" failed; evaluating downstream conditional batches`
        );
      }
    }

    const finalRunnerCheck = await runnerCol.findOne({ _id: runnerId });
    if (finalRunnerCheck && finalRunnerCheck.controlState === CONTROL_STATES.PAUSE_REQUESTED) {
      await runnerCol.updateOne(
        { _id: runnerId },
        { $set: { status: RUNNER_STATUS.PAUSED, updatedAt: Date.now() } }
      );
      return runnerCol.findOne({ _id: runnerId });
    }

    const doneNow = Date.now();
    const finalStatus = runnerHasFailed ? runnerFailureStatus : RUNNER_STATUS.COMPLETED;

    await runnerCol.updateOne(
      { _id: runnerId },
      {
        $set: {
          status: finalStatus,
          currentBatchIndex: batches.length,
          finishedAt: doneNow,
          durationMs: Math.max(0, doneNow - runnerStartedAt),
          updatedAt: doneNow
        }
      }
    );

    await logger.recordLifecycleEvent(
      req,
      { mapId: runnerDoc.mapId, runnerId, batchId: null, taskId: null },
      runnerHasFailed ? EVENT_TYPES.ERROR : EVENT_TYPES.DONE,
      runnerHasFailed
        ? `Runner finished with status "${finalStatus}" after executing conditional batches`
        : 'Runner completed all batches'
    );

    const completedDoc = await runnerCol.findOne({ _id: runnerId });
    await notifyRunnerFinished(req, completedDoc);
    return completedDoc;
  };

  const loopPromise = runPipeline().finally(() => {
    delete activeRunnerLoops[runnerKey];
  });
  activeRunnerLoops[runnerKey] = loopPromise;
  return loopPromise;
};

exports.triggerRunner = async (req, config = {}) => {
  const runnerCol = getCollection(req, COLLECTIONS.RUNNER);
  const batchCol = getCollection(req, COLLECTIONS.BATCH);
  const taskCol = getCollection(req, COLLECTIONS.TASK);

  const runnerId = config._id || config.runnerId || generateId(req);
  const mapId = config.mapId !== undefined ? config.mapId : generateId(req);
  const ud = config.ud || logger.user(req);

  const concurrencyPolicy = config.concurrencyPolicy || (
    config.preventParallelRuns ? CONCURRENCY_POLICIES.REJECT : CONCURRENCY_POLICIES.ALLOW
  );

  if (concurrencyPolicy !== CONCURRENCY_POLICIES.ALLOW && mapId) {
    const activeRunners = await exports.getActiveRunnersByMapId(req, mapId);
    if (activeRunners.length > 0) {
      if (concurrencyPolicy === CONCURRENCY_POLICIES.REJECT) {
        const conflictErr = Error(
          `Conflict: mapId "${mapId}" already has an active runner (${activeRunners[0]._id})`
        );
        conflictErr.code = 'RUNNER_CONFLICT';
        conflictErr.statusCode = 409;
        conflictErr.activeRunnerIds = activeRunners.map((r) => r._id);
        throw conflictErr;
      }

      if (concurrencyPolicy === CONCURRENCY_POLICIES.CANCEL_PREVIOUS) {
        await Promise.all(activeRunners.map((r) => exports.stopRunner(req, r._id)));
      } else if (concurrencyPolicy === CONCURRENCY_POLICIES.QUEUE) {
        for (let i = 0; i < activeRunners.length; i += 1) {
          const prevKey = normalizeId(activeRunners[i]._id);
          if (activeRunnerLoops[prevKey]) {
            await activeRunnerLoops[prevKey];
          }
        }
      }
    }
  }

  const now = Date.now();
  const hostId = config.hostId || getHostId(req);
  const rawBatches = Array.isArray(config.batches)
    ? config.batches
    : (Array.isArray(config.tasks)
      ? [{
        name: config.name || 'Default Batch',
        mode: config.mode || BATCH_MODES.QUEUE,
        matrix: config.matrix || null,
        when: config.when || null,
        requiresApproval: Boolean(config.requiresApproval),
        approvalStatus: config.approvalStatus,
        approvalTimeoutMs: config.approvalTimeoutMs,
        tasks: config.tasks
      }]
      : []);

  let scheduledDelayMs = 0;
  if (config.delayMs !== undefined && Number(config.delayMs) > 0) {
    scheduledDelayMs = Math.max(0, Number(config.delayMs));
  } else if (config.runAt !== undefined && config.runAt !== null) {
    const targetEpoch = typeof config.runAt === 'number'
      ? config.runAt
      : Date.parse(String(config.runAt));
    if (!Number.isNaN(targetEpoch) && targetEpoch > now) {
      scheduledDelayMs = targetEpoch - now;
    }
  }

  const initialStatus = scheduledDelayMs > 0 ? RUNNER_STATUS.SCHEDULED : RUNNER_STATUS.TRIGGERED;

  const runnerDoc = {
    _id: runnerId,
    mapId,
    hostId,
    status: initialStatus,
    controlState: CONTROL_STATES.NORMAL,
    ud,
    totalBatches: rawBatches.length,
    currentBatchIndex: 0,
    outputs: config.outputs && typeof config.outputs === 'object' ? { ...config.outputs } : {},
    secretKeys: Array.isArray(config.secretKeys) ? config.secretKeys : [],
    secrets: Array.isArray(config.secrets) ? config.secrets : [],
    concurrencyPolicy,
    cleanupTempOnFinish: Boolean(config.cleanupTempOnFinish),
    webhookUrl: config.webhookUrl || null,
    webhookSecret: config.webhookSecret || null,
    webhookHeaders: config.webhookHeaders || null,
    scheduledAt: scheduledDelayMs > 0 ? now + scheduledDelayMs : null,
    durationMs: null,
    createdAt: now,
    updatedAt: now
  };

  if (typeof config.onFinish === 'function') {
    runnerFinishCallbacks[normalizeId(runnerId)] = config.onFinish;
  }
  if (typeof config.webhookTransport === 'function') {
    runnerWebhookTransports[normalizeId(runnerId)] = config.webhookTransport;
  }

  await runnerCol.insertOne(runnerDoc);

  const createdBatches = [];
  const createdTasks = [];

  for (let bIdx = 0; bIdx < rawBatches.length; bIdx += 1) {
    const batchDef = rawBatches[bIdx] || {};
    const batchId = batchDef._id || batchDef.batchId || generateId(req);
    const mode = batchDef.mode === BATCH_MODES.PARALLEL ? BATCH_MODES.PARALLEL : BATCH_MODES.QUEUE;

    const requiresApproval = Boolean(batchDef.requiresApproval);
    const approvalTimeoutMs = Math.max(
      0,
      Number(
        batchDef.approvalTimeoutMs !== undefined
          ? batchDef.approvalTimeoutMs
          : (config.approvalTimeoutMs || 0)
      )
    );
    const batchDoc = {
      _id: batchId,
      runnerId,
      mapId,
      name: batchDef.name || `Batch ${bIdx + 1}`,
      mode,
      maxQueueConcurrency: Number(batchDef.maxQueueConcurrency || DEFAULT_CONCURRENCY),
      continueOnError: Boolean(batchDef.continueOnError),
      when: batchDef.when || null,
      requiresApproval,
      approvalStatus:
        batchDef.approvalStatus !== undefined
          ? batchDef.approvalStatus
          : (requiresApproval ? APPROVAL_STATUS.PENDING : APPROVAL_STATUS.NONE),
      approvedBy: batchDef.approvedBy || null,
      approvedAt: batchDef.approvedAt || null,
      rejectedBy: null,
      rejectedAt: null,
      approvalComment: batchDef.approvalComment || null,
      approvalTimeoutMs,
      matrix: batchDef.matrix || null,
      status: BATCH_STATUS.QUEUED,
      order: typeof batchDef.order === 'number' ? batchDef.order : bIdx,
      durationMs: null,
      createdAt: now,
      updatedAt: now
    };

    await batchCol.insertOne(batchDoc);
    createdBatches.push(batchDoc);

    const expandedTasks = exports.expandMatrixTasks(batchDef);
    for (let tIdx = 0; tIdx < expandedTasks.length; tIdx += 1) {
      const taskDef = typeof expandedTasks[tIdx] === 'string'
        ? { cmd: expandedTasks[tIdx] }
        : (expandedTasks[tIdx] || {});

      const taskId = taskDef._id || taskDef.taskId || generateId(req);
      const taskCwd = taskDef.cwd || batchDef.cwd || config.cwd || process.cwd();
      const prepared = processUtils.prepareTaskCommand(
        {
          ...taskDef,
          cwd: taskCwd,
          shell: taskDef.shell || batchDef.shell || config.shell
        },
        taskId
      );

      const maxRetries = Number(
        taskDef.maxRetries !== undefined
          ? taskDef.maxRetries
          : (batchDef.maxRetries !== undefined ? batchDef.maxRetries : (config.maxRetries || 0))
      );

      const taskDoc = {
        _id: taskId,
        batchId,
        runnerId,
        mapId,
        hostId,
        controlState: CONTROL_STATES.NORMAL,
        name: taskDef.name || taskDef.scriptPath || taskDef.file || prepared.cmd || `Task ${tIdx + 1}`,
        cmd: prepared.cmd,
        scriptPath: taskDef.scriptPath || taskDef.file || prepared.scriptPath || null,
        script: taskDef.script || taskDef.inlineScript || null,
        args: prepared.args,
        shell: taskDef.shell || batchDef.shell || config.shell || null,
        cwd: taskCwd,
        env: { ...(config.env || {}), ...(batchDef.env || {}), ...(taskDef.env || {}) },
        secretKeys: Array.isArray(taskDef.secretKeys) ? taskDef.secretKeys : [],
        secrets: Array.isArray(taskDef.secrets) ? taskDef.secrets : [],
        outputs: {},
        when: taskDef.when || null,
        matrixValues: taskDef.matrixValues || null,
        maxRetries: Math.max(0, maxRetries),
        retryDelayMs: Number(taskDef.retryDelayMs || batchDef.retryDelayMs || config.retryDelayMs || DEFAULT_RETRY_DELAY_MS),
        retryBackoffFactor: Number(taskDef.retryBackoffFactor || batchDef.retryBackoffFactor || config.retryBackoffFactor || DEFAULT_RETRY_BACKOFF_FACTOR),
        retryCount: 0,
        cleanupTempOnFinish: Boolean(
          taskDef.cleanupTempOnFinish !== undefined ? taskDef.cleanupTempOnFinish : config.cleanupTempOnFinish
        ),
        timeoutMs: Number(taskDef.timeoutMs || batchDef.timeoutMs || config.timeoutMs || 0),
        killGraceMs: taskDef.killGraceMs || config.killGraceMs,
        pollIntervalMs: taskDef.pollIntervalMs || config.pollIntervalMs,
        order: typeof taskDef.order === 'number' ? taskDef.order : tIdx,
        pid: null,
        exitCode: null,
        byteOffset: 0,
        durationMs: null,
        status: TASK_STATUS.QUEUED,
        createdAt: now,
        updatedAt: now
      };

      await taskCol.insertOne(taskDoc);
      createdTasks.push(taskDoc);
    }
  }

  await logger.recordLifecycleEvent(
    req,
    { mapId, runnerId, batchId: null, taskId: null },
    EVENT_TYPES.LIFECYCLE,
    scheduledDelayMs > 0
      ? `Runner scheduled to start in ${scheduledDelayMs}ms with ${createdBatches.length} batch(es) and ${createdTasks.length} task(s)`
      : `Runner triggered with ${createdBatches.length} batch(es) and ${createdTasks.length} task(s)`
  );

  let executionPromise;
  if (scheduledDelayMs > 0) {
    const runnerKey = normalizeId(runnerId);
    const { promise, resolve } = Promise.withResolvers();
    const timer = setTimeout(async () => {
      delete scheduledRunnerTimers[runnerKey];
      try {
        const latestRunner = await runnerCol.findOne({ _id: runnerId });
        if (!latestRunner || latestRunner.status === RUNNER_STATUS.STOPPED || latestRunner.controlState === CONTROL_STATES.STOP_REQUESTED) {
          resolve(latestRunner);
          return;
        }
        const finalDoc = await exports.executeRunner(req, runnerId);
        resolve(finalDoc);
      } catch (_err) {
        const fallbackDoc = await runnerCol.findOne({ _id: runnerId });
        resolve(fallbackDoc);
      }
    }, scheduledDelayMs);
    if (timer && typeof timer.unref === 'function') {
      timer.unref();
    }
    scheduledRunnerTimers[runnerKey] = { timer, resolve };
    executionPromise = promise;
  } else {
    executionPromise = exports.executeRunner(req, runnerId);
  }

  if (config.awaitCompletion) {
    const finalRunner = await executionPromise;
    return {
      runnerId,
      mapId,
      status: finalRunner ? finalRunner.status : runnerDoc.status,
      runner: finalRunner || runnerDoc,
      batches: await findMany(batchCol, { runnerId }),
      tasks: await findMany(taskCol, { runnerId }),
      executionPromise
    };
  }

  return {
    runnerId,
    mapId,
    status: runnerDoc.status,
    runner: runnerDoc,
    batches: createdBatches,
    tasks: createdTasks,
    executionPromise
  };
};

// ============================================================================
// UNIVERSAL CONTROL COMMANDS (SKIP, STOP, PAUSE, RESUME, REPLAY)
// ============================================================================

exports.skipTask = async (req, taskId) => {
  const taskCol = getCollection(req, COLLECTIONS.TASK);
  const taskDoc = await taskCol.findOne({ _id: taskId });
  if (!taskDoc) {
    throw Error(`Task "${taskId}" not found`);
  }

  if (taskDoc.status !== TASK_STATUS.QUEUED) {
    return taskDoc;
  }

  const now = Date.now();
  await taskCol.updateOne(
    { _id: taskId },
    { $set: { status: TASK_STATUS.SKIPPED, finishedAt: now, updatedAt: now } }
  );

  const activeWatcher = broadcaster.getWatcher(taskId);
  if (activeWatcher) {
    activeWatcher.skipped = true;
    await watcher.finalizeTaskWatcher(req, activeWatcher, 0, TASK_STATUS.SKIPPED);
  } else {
    await logger.recordLifecycleEvent(
      req,
      {
        mapId: taskDoc.mapId,
        runnerId: taskDoc.runnerId,
        batchId: taskDoc.batchId,
        taskId: taskDoc._id
      },
      EVENT_TYPES.LIFECYCLE,
      `Task "${taskDoc.name || taskDoc._id}" skipped`
    );
  }

  return taskCol.findOne({ _id: taskId });
};

exports.skipBatch = async (req, batchId, options = {}) => {
  const batchCol = getCollection(req, COLLECTIONS.BATCH);
  const taskCol = getCollection(req, COLLECTIONS.TASK);
  const runnerCol = getCollection(req, COLLECTIONS.RUNNER);

  const batchDoc = await batchCol.findOne({ _id: batchId });
  if (!batchDoc) {
    throw Error(`Batch "${batchId}" not found`);
  }

  const wasAwaitingApproval = batchDoc.status === BATCH_STATUS.AWAITING_APPROVAL;
  const isSkippableState =
    batchDoc.status === BATCH_STATUS.QUEUED ||
    batchDoc.status === BATCH_STATUS.PAUSED ||
    wasAwaitingApproval ||
    (options.force && batchDoc.status === BATCH_STATUS.RUNNING);

  if (!isSkippableState) {
    return batchDoc;
  }

  clearApprovalGateTimer(batchId);

  if (options.force && batchDoc.status === BATCH_STATUS.RUNNING) {
    const batchTasks = await findMany(taskCol, { batchId });
    for (let i = 0; i < batchTasks.length; i += 1) {
      const t = batchTasks[i];
      if (
        t.status === TASK_STATUS.RUNNING ||
        t.status === TASK_STATUS.STARTED ||
        t.status === TASK_STATUS.PAUSED ||
        broadcaster.getWatcher(t._id)
      ) {
        await exports.stopTask(req, t._id);
      }
    }
  }

  const now = Date.now();
  const batchUpdate = {
    status: BATCH_STATUS.SKIPPED,
    finishedAt: now,
    updatedAt: now
  };
  if (
    wasAwaitingApproval ||
    batchDoc.requiresApproval ||
    batchDoc.approvalStatus === APPROVAL_STATUS.PENDING
  ) {
    batchUpdate.approvalStatus = APPROVAL_STATUS.SKIPPED;
    if (options.comment || options.reason) {
      batchUpdate.approvalComment = options.comment || options.reason;
    }
  }

  await batchCol.updateOne(
    { _id: batchId },
    { $set: batchUpdate }
  );

  await taskCol.updateMany(
    { batchId, status: TASK_STATUS.QUEUED },
    { $set: { status: TASK_STATUS.SKIPPED, finishedAt: now, updatedAt: now } }
  );

  await logger.recordLifecycleEvent(
    req,
    {
      mapId: batchDoc.mapId,
      runnerId: batchDoc.runnerId,
      batchId: batchDoc._id,
      taskId: null
    },
    EVENT_TYPES.LIFECYCLE,
    `Batch "${batchDoc.name || batchDoc._id}" and all nested tasks skipped`
  );

  let executionPromise = null;
  if (wasAwaitingApproval && batchDoc.runnerId && runnerCol) {
    const runnerDoc = await runnerCol.findOne({ _id: batchDoc.runnerId });
    if (runnerDoc && runnerDoc.status === RUNNER_STATUS.AWAITING_APPROVAL) {
      await runnerCol.updateOne(
        { _id: batchDoc.runnerId },
        {
          $set: {
            status: RUNNER_STATUS.RUNNING,
            controlState: CONTROL_STATES.NORMAL,
            updatedAt: now
          }
        }
      );
      executionPromise = exports.executeRunner(req, batchDoc.runnerId);
      if (options.awaitCompletion) {
        await executionPromise;
      }
    }
  }

  const updatedBatch = await batchCol.findOne({ _id: batchId });
  if (executionPromise && updatedBatch) {
    return { ...updatedBatch, executionPromise };
  }
  return updatedBatch;
};

exports.stopTask = async (req, taskId) => {
  const taskCol = getCollection(req, COLLECTIONS.TASK);
  const taskDoc = await taskCol.findOne({ _id: taskId });
  if (!taskDoc) {
    throw Error(`Task "${taskId}" not found`);
  }

  const localHostId = getHostId(req);
  const isRemoteHost = Boolean(taskDoc.hostId && taskDoc.hostId !== localHostId);
  const activeWatcher = !isRemoteHost ? broadcaster.getWatcher(taskId) : null;

  if (isRemoteHost) {
    const now = Date.now();
    await taskCol.updateOne(
      { _id: taskId },
      {
        $set: {
          controlState: CONTROL_STATES.STOP_REQUESTED,
          status: TASK_STATUS.STOPPED,
          exitCode: -1,
          finishedAt: now,
          updatedAt: now
        }
      }
    );
    await broadcaster.publishControlSignal(req, {
      targetHostId: taskDoc.hostId,
      action: 'stop_task',
      taskId: taskDoc._id,
      killGraceMs: taskDoc.killGraceMs
    });
    await logger.recordLifecycleEvent(
      req,
      {
        mapId: taskDoc.mapId,
        runnerId: taskDoc.runnerId,
        batchId: taskDoc.batchId,
        taskId: taskDoc._id
      },
      EVENT_TYPES.STATUS,
      `Task "${taskDoc.name || taskDoc._id}" stop requested for host "${taskDoc.hostId}"`
    );
    return taskCol.findOne({ _id: taskId });
  }

  if (activeWatcher) {
    activeWatcher.stopped = true;
  }

  const pidToKill = (activeWatcher && activeWatcher.pid) || taskDoc.pid;
  if (pidToKill) {
    await processUtils.killProcessTree(pidToKill, taskDoc.killGraceMs);
  }

  if (activeWatcher && !activeWatcher.isFinalized) {
    await watcher.finalizeTaskWatcher(req, activeWatcher, -1, TASK_STATUS.STOPPED);
  } else {
    const now = Date.now();
    await taskCol.updateOne(
      { _id: taskId },
      {
        $set: {
          controlState: CONTROL_STATES.NORMAL,
          status: TASK_STATUS.STOPPED,
          exitCode: -1,
          finishedAt: now,
          updatedAt: now
        }
      }
    );
    await logger.recordLifecycleEvent(
      req,
      {
        mapId: taskDoc.mapId,
        runnerId: taskDoc.runnerId,
        batchId: taskDoc.batchId,
        taskId: taskDoc._id
      },
      EVENT_TYPES.STATUS,
      `Task "${taskDoc.name || taskDoc._id}" stopped`
    );
  }

  return taskCol.findOne({ _id: taskId });
};

exports.stopBatch = async (req, batchId) => {
  const batchCol = getCollection(req, COLLECTIONS.BATCH);
  const taskCol = getCollection(req, COLLECTIONS.TASK);

  const batchDoc = await batchCol.findOne({ _id: batchId });
  if (!batchDoc) {
    throw Error(`Batch "${batchId}" not found`);
  }

  clearApprovalGateTimer(batchId);

  const now = Date.now();
  const batchStopUpdate = {
    status: BATCH_STATUS.STOPPED,
    finishedAt: now,
    updatedAt: now
  };
  if (
    batchDoc.status === BATCH_STATUS.AWAITING_APPROVAL ||
    batchDoc.approvalStatus === APPROVAL_STATUS.PENDING
  ) {
    batchStopUpdate.approvalStatus = APPROVAL_STATUS.CANCELLED;
  }

  await batchCol.updateOne(
    { _id: batchId },
    { $set: batchStopUpdate }
  );

  const batchTasks = await findMany(taskCol, { batchId });

  const stopPromises = batchTasks.map(async (t) => {
    if (
      t.status === TASK_STATUS.RUNNING ||
      t.status === TASK_STATUS.STARTED ||
      t.status === TASK_STATUS.PAUSED ||
      broadcaster.getWatcher(t._id)
    ) {
      return exports.stopTask(req, t._id);
    }
    if (t.status === TASK_STATUS.QUEUED) {
      await taskCol.updateOne(
        { _id: t._id },
        { $set: { status: TASK_STATUS.STOPPED, finishedAt: now, updatedAt: now } }
      );
    }
    return t;
  });

  await Promise.all(stopPromises);

  await logger.recordLifecycleEvent(
    req,
    {
      mapId: batchDoc.mapId,
      runnerId: batchDoc.runnerId,
      batchId: batchDoc._id,
      taskId: null
    },
    EVENT_TYPES.STATUS,
    `Batch "${batchDoc.name || batchDoc._id}" stopped`
  );

  return batchCol.findOne({ _id: batchId });
};

exports.stopRunner = async (req, runnerId) => {
  const runnerCol = getCollection(req, COLLECTIONS.RUNNER);
  const batchCol = getCollection(req, COLLECTIONS.BATCH);
  const taskCol = getCollection(req, COLLECTIONS.TASK);

  const runnerDoc = await runnerCol.findOne({ _id: runnerId });
  if (!runnerDoc) {
    throw Error(`Runner "${runnerId}" not found`);
  }

  const runnerKey = normalizeId(runnerId);
  const scheduledEntry = scheduledRunnerTimers[runnerKey];
  if (scheduledEntry) {
    clearTimeout(scheduledEntry.timer);
    delete scheduledRunnerTimers[runnerKey];
  }

  const now = Date.now();
  const durationMs = runnerDoc.startedAt ? Math.max(0, now - runnerDoc.startedAt) : 0;
  await runnerCol.updateOne(
    { _id: runnerId },
    {
      $set: {
        controlState: CONTROL_STATES.STOP_REQUESTED,
        status: RUNNER_STATUS.STOPPED,
        finishedAt: now,
        durationMs,
        updatedAt: now
      }
    }
  );

  const batches = await findMany(batchCol, { runnerId });
  for (let i = 0; i < batches.length; i += 1) {
    const b = batches[i];
    clearApprovalGateTimer(b._id);
    if (
      b.status === BATCH_STATUS.QUEUED ||
      b.status === BATCH_STATUS.RUNNING ||
      b.status === BATCH_STATUS.PAUSED ||
      b.status === BATCH_STATUS.AWAITING_APPROVAL
    ) {
      const batchStopUpdate = {
        status: BATCH_STATUS.STOPPED,
        finishedAt: now,
        updatedAt: now
      };
      if (
        b.status === BATCH_STATUS.AWAITING_APPROVAL ||
        b.approvalStatus === APPROVAL_STATUS.PENDING
      ) {
        batchStopUpdate.approvalStatus = APPROVAL_STATUS.CANCELLED;
      }
      await batchCol.updateOne(
        { _id: b._id },
        { $set: batchStopUpdate }
      );
    }
  }

  const tasks = await findMany(taskCol, { runnerId });
  await Promise.all(
    tasks.map(async (t) => {
      if (
        t.status === TASK_STATUS.RUNNING ||
        t.status === TASK_STATUS.STARTED ||
        t.status === TASK_STATUS.PAUSED ||
        broadcaster.getWatcher(t._id)
      ) {
        return exports.stopTask(req, t._id);
      }
      if (t.status === TASK_STATUS.QUEUED) {
        await taskCol.updateOne(
          { _id: t._id },
          { $set: { status: TASK_STATUS.STOPPED, finishedAt: now, updatedAt: now } }
        );
      }
      return t;
    })
  );

  await logger.recordLifecycleEvent(
    req,
    { mapId: runnerDoc.mapId, runnerId: runnerDoc._id, batchId: null, taskId: null },
    EVENT_TYPES.STATUS,
    'Runner stopped and all active processes terminated'
  );

  const stoppedRunnerDoc = await runnerCol.findOne({ _id: runnerId });
  if (!activeRunnerLoops[runnerKey]) {
    await notifyRunnerFinished(req, stoppedRunnerDoc);
  }
  if (scheduledEntry && typeof scheduledEntry.resolve === 'function') {
    scheduledEntry.resolve(stoppedRunnerDoc);
  }

  return stoppedRunnerDoc;
};

exports.pauseTask = async (req, taskId) => {
  const taskCol = getCollection(req, COLLECTIONS.TASK);
  const taskDoc = await taskCol.findOne({ _id: taskId });
  if (!taskDoc) {
    throw Error(`Task "${taskId}" not found`);
  }

  const terminalStatuses = [
    TASK_STATUS.DONE,
    TASK_STATUS.FAILED,
    TASK_STATUS.STOPPED,
    TASK_STATUS.SKIPPED,
    TASK_STATUS.TIMEOUT
  ];
  if (terminalStatuses.includes(taskDoc.status)) {
    return taskDoc;
  }

  const localHostId = getHostId(req);
  const isRemoteHost = Boolean(taskDoc.hostId && taskDoc.hostId !== localHostId);
  const activeWatcher = !isRemoteHost ? broadcaster.getWatcher(taskId) : null;

  if (isRemoteHost) {
    await taskCol.updateOne(
      { _id: taskId },
      {
        $set: {
          controlState: CONTROL_STATES.PAUSE_REQUESTED,
          status: TASK_STATUS.PAUSED,
          updatedAt: Date.now()
        }
      }
    );
    await broadcaster.publishControlSignal(req, {
      targetHostId: taskDoc.hostId,
      action: 'pause_task',
      taskId: taskDoc._id
    });
    await logger.recordLifecycleEvent(
      req,
      {
        mapId: taskDoc.mapId,
        runnerId: taskDoc.runnerId,
        batchId: taskDoc.batchId,
        taskId: taskDoc._id
      },
      EVENT_TYPES.STATUS,
      `Task "${taskDoc.name || taskDoc._id}" pause requested for host "${taskDoc.hostId}"`
    );
    return taskCol.findOne({ _id: taskId });
  }

  const pid = (activeWatcher && activeWatcher.pid) || taskDoc.pid;

  if (pid) {
    processUtils.suspendProcessTree(pid);
  }

  if (activeWatcher) {
    activeWatcher.paused = true;
    activeWatcher.status = TASK_STATUS.PAUSED;
    watcher.pauseWatcherTimeout(activeWatcher);
  }

  await taskCol.updateOne(
    { _id: taskId },
    {
      $set: {
        controlState: CONTROL_STATES.NORMAL,
        status: TASK_STATUS.PAUSED,
        updatedAt: Date.now()
      }
    }
  );

  await logger.recordLifecycleEvent(
    req,
    {
      mapId: taskDoc.mapId,
      runnerId: taskDoc.runnerId,
      batchId: taskDoc.batchId,
      taskId: taskDoc._id
    },
    EVENT_TYPES.STATUS,
    `Task "${taskDoc.name || taskDoc._id}" paused (SIGSTOP)`
  );

  return taskCol.findOne({ _id: taskId });
};

exports.resumeTask = async (req, taskId) => {
  const taskCol = getCollection(req, COLLECTIONS.TASK);
  const taskDoc = await taskCol.findOne({ _id: taskId });
  if (!taskDoc) {
    throw Error(`Task "${taskId}" not found`);
  }

  const terminalStatuses = [
    TASK_STATUS.DONE,
    TASK_STATUS.FAILED,
    TASK_STATUS.STOPPED,
    TASK_STATUS.SKIPPED,
    TASK_STATUS.TIMEOUT
  ];
  if (terminalStatuses.includes(taskDoc.status)) {
    return taskDoc;
  }

  const localHostId = getHostId(req);
  const isRemoteHost = Boolean(taskDoc.hostId && taskDoc.hostId !== localHostId);
  const activeWatcher = !isRemoteHost ? broadcaster.getWatcher(taskId) : null;

  if (isRemoteHost) {
    await taskCol.updateOne(
      { _id: taskId },
      {
        $set: {
          controlState: CONTROL_STATES.RESUME_REQUESTED,
          status: TASK_STATUS.RUNNING,
          updatedAt: Date.now()
        }
      }
    );
    await broadcaster.publishControlSignal(req, {
      targetHostId: taskDoc.hostId,
      action: 'resume_task',
      taskId: taskDoc._id
    });
    await logger.recordLifecycleEvent(
      req,
      {
        mapId: taskDoc.mapId,
        runnerId: taskDoc.runnerId,
        batchId: taskDoc.batchId,
        taskId: taskDoc._id
      },
      EVENT_TYPES.STATUS,
      `Task "${taskDoc.name || taskDoc._id}" resume requested for host "${taskDoc.hostId}"`
    );
    return taskCol.findOne({ _id: taskId });
  }

  const pid = (activeWatcher && activeWatcher.pid) || taskDoc.pid;

  if (pid) {
    processUtils.resumeProcessTree(pid);
  }

  if (activeWatcher) {
    activeWatcher.paused = false;
    activeWatcher.status = TASK_STATUS.RUNNING;
    watcher.resumeWatcherTimeout(req, activeWatcher);
  }

  await taskCol.updateOne(
    { _id: taskId },
    {
      $set: {
        controlState: CONTROL_STATES.NORMAL,
        status: TASK_STATUS.RUNNING,
        updatedAt: Date.now()
      }
    }
  );

  await logger.recordLifecycleEvent(
    req,
    {
      mapId: taskDoc.mapId,
      runnerId: taskDoc.runnerId,
      batchId: taskDoc.batchId,
      taskId: taskDoc._id
    },
    EVENT_TYPES.STATUS,
    `Task "${taskDoc.name || taskDoc._id}" resumed (SIGCONT)`
  );

  return taskCol.findOne({ _id: taskId });
};

exports.pauseRunner = async (req, runnerId) => {
  const runnerCol = getCollection(req, COLLECTIONS.RUNNER);
  const taskCol = getCollection(req, COLLECTIONS.TASK);

  const runnerDoc = await runnerCol.findOne({ _id: runnerId });
  if (!runnerDoc) {
    throw Error(`Runner "${runnerId}" not found`);
  }

  const tasks = await findMany(taskCol, { runnerId });
  const hasRunningTasks = tasks.some(
    (t) => t.status === TASK_STATUS.RUNNING || t.status === TASK_STATUS.STARTED
  ) || broadcaster.getWatchersByRunner(runnerId).length > 0;

  const nextStatus = hasRunningTasks ? runnerDoc.status : RUNNER_STATUS.PAUSED;

  await runnerCol.updateOne(
    { _id: runnerId },
    {
      $set: {
        controlState: CONTROL_STATES.PAUSE_REQUESTED,
        status: nextStatus,
        updatedAt: Date.now()
      }
    }
  );

  await logger.recordLifecycleEvent(
    req,
    { mapId: runnerDoc.mapId, runnerId: runnerDoc._id, batchId: null, taskId: null },
    EVENT_TYPES.STATUS,
    hasRunningTasks
      ? 'Runner pause requested; waiting for active tasks to complete'
      : 'Runner paused'
  );

  return runnerCol.findOne({ _id: runnerId });
};

exports.resumeRunner = async (req, runnerId, options = {}) => {
  const runnerCol = getCollection(req, COLLECTIONS.RUNNER);
  const batchCol = getCollection(req, COLLECTIONS.BATCH);
  const taskCol = getCollection(req, COLLECTIONS.TASK);

  const runnerDoc = await runnerCol.findOne({ _id: runnerId });
  if (!runnerDoc) {
    throw Error(`Runner "${runnerId}" not found`);
  }

  await runnerCol.updateOne(
    { _id: runnerId },
    {
      $set: {
        controlState: CONTROL_STATES.NORMAL,
        status: RUNNER_STATUS.RUNNING,
        updatedAt: Date.now()
      }
    }
  );

  // Resume any paused batches or paused tasks
  const batches = await findMany(batchCol, { runnerId });
  for (let i = 0; i < batches.length; i += 1) {
    if (batches[i].status === BATCH_STATUS.PAUSED) {
      await batchCol.updateOne(
        { _id: batches[i]._id },
        { $set: { status: BATCH_STATUS.QUEUED, updatedAt: Date.now() } }
      );
    }
  }

  const tasks = await findMany(taskCol, { runnerId });
  for (let i = 0; i < tasks.length; i += 1) {
    if (tasks[i].status === TASK_STATUS.PAUSED) {
      await exports.resumeTask(req, tasks[i]._id);
    }
  }

  await logger.recordLifecycleEvent(
    req,
    { mapId: runnerDoc.mapId, runnerId: runnerDoc._id, batchId: null, taskId: null },
    EVENT_TYPES.STATUS,
    'Runner resumed'
  );

  const executionPromise = exports.executeRunner(req, runnerId);
  if (options.awaitCompletion) {
    return executionPromise;
  }

  const updated = await runnerCol.findOne({ _id: runnerId });
  return { ...(updated || runnerDoc), executionPromise };
};

const syncParentHierarchyStatus = async (req, { batchId, runnerId }) => {
  const batchCol = getCollection(req, COLLECTIONS.BATCH);
  const taskCol = getCollection(req, COLLECTIONS.TASK);
  const runnerCol = getCollection(req, COLLECTIONS.RUNNER);
  const now = Date.now();

  if (batchId && batchCol && taskCol) {
    const batchDoc = await batchCol.findOne({ _id: batchId });
    if (
      batchDoc &&
      (batchDoc.status === BATCH_STATUS.FAILED ||
        batchDoc.status === BATCH_STATUS.STOPPED)
    ) {
      const batchTasks = await findMany(taskCol, { batchId });
      if (
        batchTasks.length > 0 &&
        batchTasks.every((t) => t.status === TASK_STATUS.DONE || t.status === TASK_STATUS.SKIPPED)
      ) {
        const nextBatchStatus = batchTasks.every((t) => t.status === TASK_STATUS.SKIPPED)
          ? BATCH_STATUS.SKIPPED
          : BATCH_STATUS.BATCH_DONE;
        await batchCol.updateOne(
          { _id: batchId },
          { $set: { status: nextBatchStatus, finishedAt: now, updatedAt: now } }
        );
      }
    }
  }

  if (runnerId && runnerCol && batchCol) {
    const runnerDoc = await runnerCol.findOne({ _id: runnerId });
    if (
      runnerDoc &&
      (runnerDoc.status === RUNNER_STATUS.FAILED ||
        runnerDoc.status === RUNNER_STATUS.TIMEOUT ||
        runnerDoc.status === RUNNER_STATUS.STOPPED)
    ) {
      const allBatches = await findMany(batchCol, { runnerId });
      if (
        allBatches.length > 0 &&
        allBatches.every(
          (b) => b.status === BATCH_STATUS.BATCH_DONE || b.status === BATCH_STATUS.SKIPPED
        )
      ) {
        await runnerCol.updateOne(
          { _id: runnerId },
          {
            $set: {
              status: RUNNER_STATUS.COMPLETED,
              controlState: CONTROL_STATES.NORMAL,
              currentBatchIndex: allBatches.length,
              finishedAt: now,
              updatedAt: now
            }
          }
        );
      }
    }
  }
};

exports.replayTask = async (req, taskId, options = {}) => {
  const taskCol = getCollection(req, COLLECTIONS.TASK);
  const taskDoc = await taskCol.findOne({ _id: taskId });
  if (!taskDoc) {
    throw Error(`Task "${taskId}" not found`);
  }

  const activeWatcher = broadcaster.getWatcher(taskId);
  if (activeWatcher || taskDoc.status === TASK_STATUS.RUNNING || taskDoc.status === TASK_STATUS.PAUSED) {
    await exports.stopTask(req, taskId);
  }

  const logFilePath = getLogFilePath(taskId);
  fs.writeFileSync(logFilePath, '', 'utf8');

  const now = Date.now();
  const resetFields = {
    byteOffset: 0,
    pid: null,
    exitCode: null,
    retryCount: 0,
    durationMs: null,
    status: TASK_STATUS.QUEUED,
    startedAt: null,
    finishedAt: null,
    updatedAt: now
  };

  await taskCol.updateOne({ _id: taskId }, { $set: resetFields });

  await logger.recordLifecycleEvent(
    req,
    {
      mapId: taskDoc.mapId,
      runnerId: taskDoc.runnerId,
      batchId: taskDoc.batchId,
      taskId: taskDoc._id
    },
    EVENT_TYPES.LIFECYCLE,
    `Task "${taskDoc.name || taskDoc._id}" reset for replay`
  );

  const freshTaskDoc = await taskCol.findOne({ _id: taskId });
  const executionPromise = exports
    .executeTask(req, freshTaskDoc || { ...taskDoc, ...resetFields })
    .then(async (completedTask) => {
      if (options.syncParentStatus !== false) {
        await syncParentHierarchyStatus(req, {
          batchId: taskDoc.batchId,
          runnerId: taskDoc.runnerId
        });
      }
      return completedTask;
    });

  if (options.awaitCompletion === false) {
    return { ...(freshTaskDoc || { ...taskDoc, ...resetFields }), executionPromise };
  }

  return executionPromise;
};

exports.replayBatch = async (req, batchId, options = {}) => {
  const batchCol = getCollection(req, COLLECTIONS.BATCH);
  const taskCol = getCollection(req, COLLECTIONS.TASK);
  const runnerCol = getCollection(req, COLLECTIONS.RUNNER);

  const batchDoc = await batchCol.findOne({ _id: batchId });
  if (!batchDoc) {
    throw Error(`Batch "${batchId}" not found`);
  }

  clearApprovalGateTimer(batchId);

  const fromFailed = Boolean(options.fromFailed || options.fromTaskId);
  const tasks = await findMany(taskCol, { batchId });
  const now = Date.now();

  let foundTargetTask = !options.fromTaskId;
  for (let i = 0; i < tasks.length; i += 1) {
    const t = tasks[i];
    if (
      broadcaster.getWatcher(t._id) ||
      t.status === TASK_STATUS.RUNNING ||
      t.status === TASK_STATUS.PAUSED
    ) {
      await exports.stopTask(req, t._id);
    }

    const isExplicitTarget = Boolean(options.fromTaskId && idsEqual(t._id, options.fromTaskId));
    if (!foundTargetTask && isExplicitTarget) {
      foundTargetTask = true;
    }

    const shouldResetTask = !fromFailed
      ? true
      : (foundTargetTask && (isExplicitTarget || t.status !== TASK_STATUS.DONE));

    if (shouldResetTask) {
      const logFilePath = getLogFilePath(t._id);
      fs.writeFileSync(logFilePath, '', 'utf8');
      await taskCol.updateOne(
        { _id: t._id },
        {
          $set: {
            byteOffset: 0,
            pid: null,
            exitCode: null,
            retryCount: 0,
            durationMs: null,
            status: TASK_STATUS.QUEUED,
            startedAt: null,
            finishedAt: null,
            updatedAt: now
          }
        }
      );
    }
  }

  const batchResetUpdate = {
    status: BATCH_STATUS.QUEUED,
    durationMs: null,
    startedAt: fromFailed ? (batchDoc.startedAt || null) : null,
    finishedAt: null,
    updatedAt: now
  };
  if (batchDoc.requiresApproval) {
    batchResetUpdate.approvalStatus = options.requireApproval
      ? APPROVAL_STATUS.PENDING
      : APPROVAL_STATUS.APPROVED;
  }

  await batchCol.updateOne(
    { _id: batchId },
    { $set: batchResetUpdate }
  );

  if (batchDoc.runnerId && runnerCol) {
    const parentRunner = await runnerCol.findOne({ _id: batchDoc.runnerId });
    if (parentRunner && parentRunner.controlState === CONTROL_STATES.STOP_REQUESTED) {
      await runnerCol.updateOne(
        { _id: batchDoc.runnerId },
        { $set: { controlState: CONTROL_STATES.NORMAL, updatedAt: now } }
      );
    }
  }

  await logger.recordLifecycleEvent(
    req,
    {
      mapId: batchDoc.mapId,
      runnerId: batchDoc.runnerId,
      batchId: batchDoc._id,
      taskId: null
    },
    EVENT_TYPES.LIFECYCLE,
    fromFailed
      ? `Batch "${batchDoc.name || batchDoc._id}" reset for replay from failed tasks`
      : `Batch "${batchDoc.name || batchDoc._id}" reset for full replay`
  );

  const resetBatchDoc = await batchCol.findOne({ _id: batchId });
  const executionPromise = exports
    .runBatch(req, resetBatchDoc || { ...batchDoc, status: BATCH_STATUS.QUEUED })
    .then(async (finishedBatch) => {
      if (options.syncParentStatus !== false && batchDoc.runnerId) {
        await syncParentHierarchyStatus(req, {
          batchId: null,
          runnerId: batchDoc.runnerId
        });
      }
      return finishedBatch;
    });

  if (options.awaitCompletion === false) {
    return { ...(resetBatchDoc || { ...batchDoc, status: BATCH_STATUS.QUEUED }), executionPromise };
  }

  return executionPromise;
};

exports.replayRunner = async (req, runnerId, options = {}) => {
  const runnerCol = getCollection(req, COLLECTIONS.RUNNER);
  const batchCol = getCollection(req, COLLECTIONS.BATCH);
  const taskCol = getCollection(req, COLLECTIONS.TASK);

  const runnerDoc = await runnerCol.findOne({ _id: runnerId });
  if (!runnerDoc) {
    throw Error(`Runner "${runnerId}" not found`);
  }

  const runnerKey = normalizeId(runnerId);
  const scheduledEntry = scheduledRunnerTimers[runnerKey];
  if (scheduledEntry) {
    clearTimeout(scheduledEntry.timer);
    delete scheduledRunnerTimers[runnerKey];
  }

  const allBatches = await findMany(batchCol, { runnerId });
  const allTasks = await findMany(taskCol, { runnerId });

  // Stop any currently active tasks first
  for (let i = 0; i < allTasks.length; i += 1) {
    const t = allTasks[i];
    if (
      broadcaster.getWatcher(t._id) ||
      t.status === TASK_STATUS.RUNNING ||
      t.status === TASK_STATUS.PAUSED
    ) {
      await exports.stopTask(req, t._id);
    }
  }

  const fromFailed = Boolean(options.fromFailed || options.fromBatchId || options.fromTaskId);
  let startBatchIndex = 0;
  const now = Date.now();

  if (fromFailed) {
    let foundTargetBatch = false;
    for (let idx = 0; idx < allBatches.length; idx += 1) {
      const b = allBatches[idx];
      const matchesExplicitBatch = options.fromBatchId && idsEqual(b._id, options.fromBatchId);
      const batchTasks = allTasks.filter((t) => idsEqual(t.batchId, b._id));
      const matchesExplicitTask = options.fromTaskId && batchTasks.some((t) => idsEqual(t._id, options.fromTaskId));

      if (!foundTargetBatch) {
        if (
          matchesExplicitBatch ||
          matchesExplicitTask ||
          b.status !== BATCH_STATUS.BATCH_DONE
        ) {
          foundTargetBatch = true;
          startBatchIndex = idx;
        }
      }

      if (foundTargetBatch) {
        clearApprovalGateTimer(b._id);
        const batchResetUpdate = {
          status: BATCH_STATUS.QUEUED,
          durationMs: null,
          finishedAt: null,
          updatedAt: now
        };
        if (b.requiresApproval) {
          const keepApproved = Boolean(
            options.autoApprove ||
            (options.preserveApprovals && b.approvalStatus === APPROVAL_STATUS.APPROVED)
          );
          batchResetUpdate.approvalStatus = keepApproved
            ? APPROVAL_STATUS.APPROVED
            : APPROVAL_STATUS.PENDING;
          if (!keepApproved) {
            batchResetUpdate.approvedBy = null;
            batchResetUpdate.approvedAt = null;
            batchResetUpdate.rejectedBy = null;
            batchResetUpdate.rejectedAt = null;
            batchResetUpdate.approvalComment = null;
          }
        }
        await batchCol.updateOne(
          { _id: b._id },
          { $set: batchResetUpdate }
        );

        let foundTargetTaskInBatch = !options.fromTaskId || !matchesExplicitTask;
        for (let tIdx = 0; tIdx < batchTasks.length; tIdx += 1) {
          const t = batchTasks[tIdx];
          if (!foundTargetTaskInBatch && idsEqual(t._id, options.fromTaskId)) {
            foundTargetTaskInBatch = true;
          }
          const shouldResetTask = idx > startBatchIndex
            ? true
            : (foundTargetTaskInBatch && (idsEqual(t._id, options.fromTaskId) || t.status !== TASK_STATUS.DONE));

          if (shouldResetTask) {
            const logFilePath = getLogFilePath(t._id);
            fs.writeFileSync(logFilePath, '', 'utf8');
            await taskCol.updateOne(
              { _id: t._id },
              {
                $set: {
                  byteOffset: 0,
                  pid: null,
                  exitCode: null,
                  retryCount: 0,
                  durationMs: null,
                  status: TASK_STATUS.QUEUED,
                  startedAt: null,
                  finishedAt: null,
                  updatedAt: now
                }
              }
            );
          }
        }
      }
    }
  } else {
    startBatchIndex = 0;
    for (let i = 0; i < allTasks.length; i += 1) {
      const logFilePath = getLogFilePath(allTasks[i]._id);
      fs.writeFileSync(logFilePath, '', 'utf8');
    }

    await taskCol.updateMany(
      { runnerId },
      {
        $set: {
          byteOffset: 0,
          pid: null,
          exitCode: null,
          retryCount: 0,
          durationMs: null,
          status: TASK_STATUS.QUEUED,
          startedAt: null,
          finishedAt: null,
          updatedAt: now
        }
      }
    );

    for (let i = 0; i < allBatches.length; i += 1) {
      const b = allBatches[i];
      clearApprovalGateTimer(b._id);
      const batchResetUpdate = {
        status: BATCH_STATUS.QUEUED,
        durationMs: null,
        startedAt: null,
        finishedAt: null,
        updatedAt: now
      };
      if (b.requiresApproval) {
        const keepApproved = Boolean(
          options.autoApprove ||
          (options.preserveApprovals && b.approvalStatus === APPROVAL_STATUS.APPROVED)
        );
        batchResetUpdate.approvalStatus = keepApproved
          ? APPROVAL_STATUS.APPROVED
          : APPROVAL_STATUS.PENDING;
        if (!keepApproved) {
          batchResetUpdate.approvedBy = null;
          batchResetUpdate.approvedAt = null;
          batchResetUpdate.rejectedBy = null;
          batchResetUpdate.rejectedAt = null;
          batchResetUpdate.approvalComment = null;
        }
      } else {
        batchResetUpdate.approvalStatus = APPROVAL_STATUS.NONE;
      }
      await batchCol.updateOne(
        { _id: b._id },
        { $set: batchResetUpdate }
      );
    }
  }

  await runnerCol.updateOne(
    { _id: runnerId },
    {
      $set: {
        status: RUNNER_STATUS.RUNNING,
        controlState: CONTROL_STATES.NORMAL,
        currentBatchIndex: startBatchIndex,
        durationMs: null,
        finishedAt: null,
        updatedAt: now
      }
    }
  );

  await logger.recordLifecycleEvent(
    req,
    { mapId: runnerDoc.mapId, runnerId: runnerDoc._id, batchId: null, taskId: null },
    EVENT_TYPES.LIFECYCLE,
    fromFailed
      ? `Runner replay initiated from batch index ${startBatchIndex} (preserving mapId "${runnerDoc.mapId}")`
      : `Runner full replay initiated from beginning (preserving mapId "${runnerDoc.mapId}")`
  );

  const executionPromise = exports.executeRunner(req, runnerId);
  if (options.awaitCompletion === false) {
    const updated = await runnerCol.findOne({ _id: runnerId });
    return { ...(updated || runnerDoc), executionPromise };
  }

  return executionPromise;
};

exports.resumeRunningJobsOnBoot = async (req, options = {}) => {
  const runnerCol = getCollection(req, COLLECTIONS.RUNNER);
  const batchCol = getCollection(req, COLLECTIONS.BATCH);
  const taskCol = getCollection(req, COLLECTIONS.TASK);

  const localHostId = options.hostId || getHostId(req);
  const reconcileAllHosts = Boolean(options.reconcileAllHosts);

  const allActiveTasks = await findMany(taskCol, {
    status: { $in: [TASK_STATUS.STARTED, TASK_STATUS.RUNNING, TASK_STATUS.PAUSED] }
  });

  // In cluster mode, only reconcile tasks belonging to this host (or untagged legacy tasks)
  const activeTasks = reconcileAllHosts
    ? allActiveTasks
    : allActiveTasks.filter((t) => !t.hostId || t.hostId === localHostId);

  const reattachedTasks = [];
  const failedOrphanTasks = [];
  const skippedRemoteTasks = allActiveTasks
    .filter((t) => !reconcileAllHosts && t.hostId && t.hostId !== localHostId)
    .map((t) => t._id);
  const now = Date.now();

  for (let i = 0; i < activeTasks.length; i += 1) {
    const taskDoc = activeTasks[i];
    const alive = taskDoc.pid && processUtils.isPidAlive(taskDoc.pid);

    if (alive) {
      watcher.ensureTaskWatcher(req, taskDoc);
      reattachedTasks.push(taskDoc._id);
      await logger.recordLifecycleEvent(
        req,
        {
          mapId: taskDoc.mapId,
          runnerId: taskDoc.runnerId,
          batchId: taskDoc.batchId,
          taskId: taskDoc._id
        },
        EVENT_TYPES.LIFECYCLE,
        `Re-attached watcher to surviving process PID ${taskDoc.pid} on boot`
      );
    } else {
      await watcher.flushFileToDb(req, taskDoc, true);
      await taskCol.updateOne(
        { _id: taskDoc._id },
        {
          $set: {
            status: TASK_STATUS.FAILED,
            exitCode: -1,
            finishedAt: now,
            updatedAt: now
          }
        }
      );
      failedOrphanTasks.push(taskDoc._id);
      await logger.recordLifecycleEvent(
        req,
        {
          mapId: taskDoc.mapId,
          runnerId: taskDoc.runnerId,
          batchId: taskDoc.batchId,
          taskId: taskDoc._id
        },
        EVENT_TYPES.ERROR,
        `Orphaned task process (PID: ${taskDoc.pid || 'none'}) not alive on boot; marked as failed`
      );
    }
  }

  const allActiveRunners = await findMany(runnerCol, {
    status: { $in: [RUNNER_STATUS.TRIGGERED, RUNNER_STATUS.RUNNING] }
  });

  const activeRunners = reconcileAllHosts
    ? allActiveRunners
    : allActiveRunners.filter((r) => !r.hostId || r.hostId === localHostId);

  const resumedRunners = [];
  const failedRunners = [];

  for (let i = 0; i < activeRunners.length; i += 1) {
    const r = activeRunners[i];
    const rTasks = await findMany(taskCol, { runnerId: r._id });
    const hasOrphanFailure = rTasks.some((t) => failedOrphanTasks.some((fId) => idsEqual(fId, t._id)));

    if (hasOrphanFailure && !options.continueAfterOrphanFailure) {
      await batchCol.updateMany(
        { runnerId: r._id, status: BATCH_STATUS.RUNNING },
        { $set: { status: BATCH_STATUS.FAILED, finishedAt: now, updatedAt: now } }
      );
      await runnerCol.updateOne(
        { _id: r._id },
        { $set: { status: RUNNER_STATUS.FAILED, finishedAt: now, updatedAt: now } }
      );
      failedRunners.push(r._id);
    } else {
      resumedRunners.push(r._id);
      const execPromise = exports.executeRunner(req, r._id);
      if (options.awaitCompletion) {
        await execPromise;
      }
    }
  }

  return {
    reattachedTasks,
    failedOrphanTasks,
    skippedRemoteTasks,
    resumedRunners,
    failedRunners
  };
};

// ============================================================================
// MANUAL APPROVAL GATES (APPROVE / REJECT / EXPIRE / BULK APPROVAL)
// ============================================================================

exports.approveBatch = async (req, batchId, options = {}) => {
  const batchCol = getCollection(req, COLLECTIONS.BATCH);
  const taskCol = getCollection(req, COLLECTIONS.TASK);
  const runnerCol = getCollection(req, COLLECTIONS.RUNNER);

  const batchDoc = await batchCol.findOne({ _id: batchId });
  if (!batchDoc) {
    throw Error(`Batch "${batchId}" not found`);
  }

  clearApprovalGateTimer(batchId);

  const now = Date.now();
  const approvedBy = options.approvedBy || logger.user(req);
  const wasReopened =
    options.reopen !== false &&
    (batchDoc.status === BATCH_STATUS.STOPPED ||
      batchDoc.status === BATCH_STATUS.SKIPPED ||
      batchDoc.approvalStatus === APPROVAL_STATUS.REJECTED ||
      batchDoc.approvalStatus === APPROVAL_STATUS.EXPIRED ||
      batchDoc.approvalStatus === APPROVAL_STATUS.CANCELLED ||
      batchDoc.approvalStatus === APPROVAL_STATUS.SKIPPED);

  const nextBatchStatus =
    batchDoc.status === BATCH_STATUS.BATCH_DONE || batchDoc.status === BATCH_STATUS.RUNNING
      ? batchDoc.status
      : BATCH_STATUS.QUEUED;

  const batchApprovalUpdate = {
    status: nextBatchStatus,
    approvalStatus: APPROVAL_STATUS.APPROVED,
    approvedBy,
    approvedAt: now,
    rejectedBy: null,
    rejectedAt: null,
    approvalComment: options.comment || options.reason || null,
    updatedAt: now
  };
  if (wasReopened) {
    batchApprovalUpdate.finishedAt = null;
    batchApprovalUpdate.durationMs = null;
  }

  await batchCol.updateOne(
    { _id: batchId },
    { $set: batchApprovalUpdate }
  );

  if (wasReopened && taskCol) {
    await taskCol.updateMany(
      {
        batchId,
        status: { $in: [TASK_STATUS.STOPPED, TASK_STATUS.SKIPPED] }
      },
      {
        $set: {
          status: TASK_STATUS.QUEUED,
          exitCode: null,
          finishedAt: null,
          updatedAt: now
        }
      }
    );
  }

  await logger.recordLifecycleEvent(
    req,
    {
      mapId: batchDoc.mapId,
      runnerId: batchDoc.runnerId,
      batchId: batchDoc._id,
      taskId: null
    },
    EVENT_TYPES.LIFECYCLE,
    `Batch "${batchDoc.name || batchDoc._id}" approved${options.comment ? `: ${options.comment}` : ''}`
  );

  let executionPromise = null;
  if (batchDoc.runnerId && runnerCol) {
    const runnerDoc = await runnerCol.findOne({ _id: batchDoc.runnerId });
    const shouldResumeRunner =
      runnerDoc &&
      (runnerDoc.status === RUNNER_STATUS.AWAITING_APPROVAL ||
        (wasReopened && options.resumeRunner !== false && runnerDoc.status === RUNNER_STATUS.STOPPED));

    if (shouldResumeRunner) {
      await runnerCol.updateOne(
        { _id: batchDoc.runnerId },
        {
          $set: {
            status: RUNNER_STATUS.RUNNING,
            controlState: CONTROL_STATES.NORMAL,
            finishedAt: null,
            durationMs: null,
            updatedAt: now
          }
        }
      );
      executionPromise = exports.executeRunner(req, batchDoc.runnerId);
      if (options.awaitCompletion) {
        await executionPromise;
      }
    }
  }

  const updatedBatch = await batchCol.findOne({ _id: batchId });
  return { ...(updatedBatch || batchDoc), executionPromise };
};

exports.rejectBatch = async (req, batchId, options = {}) => {
  const batchCol = getCollection(req, COLLECTIONS.BATCH);
  const taskCol = getCollection(req, COLLECTIONS.TASK);
  const runnerCol = getCollection(req, COLLECTIONS.RUNNER);

  const batchDoc = await batchCol.findOne({ _id: batchId });
  if (!batchDoc) {
    throw Error(`Batch "${batchId}" not found`);
  }

  clearApprovalGateTimer(batchId);

  const now = Date.now();
  const rejectedBy = options.rejectedBy || logger.user(req);

  await batchCol.updateOne(
    { _id: batchId },
    {
      $set: {
        status: BATCH_STATUS.STOPPED,
        approvalStatus: APPROVAL_STATUS.REJECTED,
        rejectedBy,
        rejectedAt: now,
        approvalComment: options.comment || options.reason || null,
        finishedAt: now,
        updatedAt: now
      }
    }
  );

  await taskCol.updateMany(
    { batchId, status: TASK_STATUS.QUEUED },
    { $set: { status: TASK_STATUS.STOPPED, finishedAt: now, updatedAt: now } }
  );

  await logger.recordLifecycleEvent(
    req,
    {
      mapId: batchDoc.mapId,
      runnerId: batchDoc.runnerId,
      batchId: batchDoc._id,
      taskId: null
    },
    EVENT_TYPES.STATUS,
    `Batch "${batchDoc.name || batchDoc._id}" rejected${options.reason || options.comment ? `: ${options.reason || options.comment}` : ''}`
  );

  if (batchDoc.runnerId && runnerCol && options.stopRunner !== false) {
    await exports.stopRunner(req, batchDoc.runnerId);
  }

  return batchCol.findOne({ _id: batchId });
};

exports.expireBatchApproval = async (req, batchId, options = {}) => {
  const batchCol = getCollection(req, COLLECTIONS.BATCH);
  const taskCol = getCollection(req, COLLECTIONS.TASK);
  const runnerCol = getCollection(req, COLLECTIONS.RUNNER);

  const batchDoc = await batchCol.findOne({ _id: batchId });
  if (!batchDoc) {
    throw Error(`Batch "${batchId}" not found`);
  }

  clearApprovalGateTimer(batchId);

  const now = Date.now();
  const reason = options.reason || options.comment || 'Approval gate timed out';

  await batchCol.updateOne(
    { _id: batchId },
    {
      $set: {
        status: BATCH_STATUS.STOPPED,
        approvalStatus: APPROVAL_STATUS.EXPIRED,
        approvalComment: reason,
        finishedAt: now,
        updatedAt: now
      }
    }
  );

  await taskCol.updateMany(
    { batchId, status: TASK_STATUS.QUEUED },
    { $set: { status: TASK_STATUS.STOPPED, finishedAt: now, updatedAt: now } }
  );

  await logger.recordLifecycleEvent(
    req,
    {
      mapId: batchDoc.mapId,
      runnerId: batchDoc.runnerId,
      batchId: batchDoc._id,
      taskId: null
    },
    EVENT_TYPES.TIMEOUT,
    `Batch "${batchDoc.name || batchDoc._id}" approval expired: ${reason}`
  );

  if (batchDoc.runnerId && runnerCol && options.stopRunner !== false) {
    await exports.stopRunner(req, batchDoc.runnerId);
  }

  return batchCol.findOne({ _id: batchId });
};

exports.approveBatches = async (req, filters = {}, options = {}) => {
  const mergedOptions = { ...filters, ...options };
  const queryFilters =
    filters.status !== undefined || filters.approvalStatus !== undefined
      ? filters
      : { ...filters, approvalStatus: APPROVAL_STATUS.PENDING };
  const candidates = await exports.listBatches(req, queryFilters);
  const approved = [];
  for (let i = 0; i < candidates.length; i += 1) {
    const doc = await exports.approveBatch(req, candidates[i]._id, mergedOptions);
    if (doc) {
      approved.push(doc);
    }
  }
  return {
    approvedCount: approved.length,
    batches: approved
  };
};

exports.rejectBatches = async (req, filters = {}, options = {}) => {
  const mergedOptions = { ...filters, ...options };
  const queryFilters =
    filters.status !== undefined || filters.approvalStatus !== undefined
      ? filters
      : { ...filters, approvalStatus: APPROVAL_STATUS.PENDING };
  const candidates = await exports.listBatches(req, queryFilters);
  const rejected = [];
  for (let i = 0; i < candidates.length; i += 1) {
    const doc = await exports.rejectBatch(req, candidates[i]._id, mergedOptions);
    if (doc) {
      rejected.push(doc);
    }
  }
  return {
    rejectedCount: rejected.length,
    batches: rejected
  };
};

// ============================================================================
// PIPELINE TELEMETRY & BOTTLENECK ANALYTICS
// ============================================================================

exports.getRunnerMetrics = async (req, runnerId) => {
  const runnerCol = getCollection(req, COLLECTIONS.RUNNER);
  const batchCol = getCollection(req, COLLECTIONS.BATCH);
  const taskCol = getCollection(req, COLLECTIONS.TASK);
  const logBucketCol = getCollection(req, COLLECTIONS.LOG);

  const runnerDoc = await runnerCol.findOne({ _id: runnerId });
  if (!runnerDoc) {
    throw Error(`Runner "${runnerId}" not found`);
  }

  const [batches, tasks, buckets] = await Promise.all([
    findMany(batchCol, { runnerId }),
    findMany(taskCol, { runnerId }),
    findMany(logBucketCol, { runnerId })
  ]);

  const now = Date.now();
  const runnerDurationMs = runnerDoc.durationMs !== undefined && runnerDoc.durationMs !== null
    ? Number(runnerDoc.durationMs)
    : (runnerDoc.startedAt ? Math.max(0, (runnerDoc.finishedAt || now) - runnerDoc.startedAt) : 0);

  const taskCounts = {
    total: tasks.length,
    done: 0,
    failed: 0,
    skipped: 0,
    stopped: 0,
    timeout: 0,
    running: 0,
    queued: 0
  };

  let totalTaskExecutionMs = 0;
  let slowestTask = null;

  const taskBreakdown = tasks.map((t) => {
    const tDur = t.durationMs !== undefined && t.durationMs !== null
      ? Number(t.durationMs)
      : (t.startedAt ? Math.max(0, (t.finishedAt || now) - t.startedAt) : 0);

    totalTaskExecutionMs += tDur;

    if (t.status === TASK_STATUS.DONE) taskCounts.done += 1;
    else if (t.status === TASK_STATUS.FAILED) taskCounts.failed += 1;
    else if (t.status === TASK_STATUS.SKIPPED) taskCounts.skipped += 1;
    else if (t.status === TASK_STATUS.STOPPED) taskCounts.stopped += 1;
    else if (t.status === TASK_STATUS.TIMEOUT) taskCounts.timeout += 1;
    else if (t.status === TASK_STATUS.RUNNING || t.status === TASK_STATUS.STARTED) taskCounts.running += 1;
    else taskCounts.queued += 1;

    const entry = {
      taskId: t._id,
      batchId: t.batchId,
      name: t.name,
      status: t.status,
      exitCode: t.exitCode !== undefined ? t.exitCode : null,
      retryCount: Number(t.retryCount || 0),
      durationMs: tDur,
      percentageOfRunner: runnerDurationMs > 0
        ? Number(((tDur / runnerDurationMs) * 100).toFixed(2))
        : 0
    };

    if (!slowestTask || entry.durationMs > slowestTask.durationMs) {
      slowestTask = {
        taskId: entry.taskId,
        batchId: entry.batchId,
        name: entry.name,
        durationMs: entry.durationMs
      };
    }

    return entry;
  });

  let slowestBatch = null;
  const batchBreakdown = batches.map((b) => {
    const bDur = b.durationMs !== undefined && b.durationMs !== null
      ? Number(b.durationMs)
      : (b.startedAt ? Math.max(0, (b.finishedAt || now) - b.startedAt) : 0);

    const entry = {
      batchId: b._id,
      name: b.name,
      status: b.status,
      mode: b.mode,
      durationMs: bDur,
      percentageOfRunner: runnerDurationMs > 0
        ? Number(((bDur / runnerDurationMs) * 100).toFixed(2))
        : 0
    };

    if (!slowestBatch || entry.durationMs > slowestBatch.durationMs) {
      slowestBatch = {
        batchId: entry.batchId,
        name: entry.name,
        durationMs: entry.durationMs
      };
    }

    return entry;
  });

  const logSummary = {
    totalLogs: 0,
    errorLogs: 0,
    warnLogs: 0,
    stdoutLogs: 0,
    stderrLogs: 0
  };

  for (let i = 0; i < buckets.length; i += 1) {
    const logs = Array.isArray(buckets[i].logs) ? buckets[i].logs : [];
    for (let j = 0; j < logs.length; j += 1) {
      const entry = logs[j];
      logSummary.totalLogs += 1;
      const entryType = entry.type || entry.eventType;
      if (entryType === EVENT_TYPES.ERROR || entryType === EVENT_TYPES.STDERR) {
        logSummary.errorLogs += 1;
      } else if (entryType === EVENT_TYPES.WARNING || entryType === 'warn') {
        logSummary.warnLogs += 1;
      }
      if (entryType === EVENT_TYPES.STDOUT) {
        logSummary.stdoutLogs += 1;
      } else if (entryType === EVENT_TYPES.STDERR) {
        logSummary.stderrLogs += 1;
      }
    }
  }

  return {
    runnerId: runnerDoc._id,
    mapId: runnerDoc.mapId,
    status: runnerDoc.status,
    startedAt: runnerDoc.startedAt || null,
    finishedAt: runnerDoc.finishedAt || null,
    durationMs: runnerDurationMs,
    totalTaskExecutionMs,
    taskCounts,
    logSummary,
    slowestBatch,
    slowestTask,
    batchBreakdown,
    taskBreakdown
  };
};
