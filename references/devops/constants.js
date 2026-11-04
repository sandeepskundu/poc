'use strict';

const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const os = require('node:os');

exports.LOG_DIR = '/tmp/express-script-logs';

exports.DEFAULT_HOST_ID = `${os.hostname()}:${process.pid}`;

let currentHostId = exports.DEFAULT_HOST_ID;

exports.getHostId = (req) => {
  if (req && typeof req.hostId === 'string' && req.hostId.trim() !== '') {
    return req.hostId.trim();
  }
  if (req && req.app && req.app.locals && typeof req.app.locals.hostId === 'string') {
    return req.app.locals.hostId;
  }
  return currentHostId;
};

exports.setHostId = (customHostId) => {
  currentHostId = customHostId && String(customHostId).trim() !== ''
    ? String(customHostId).trim()
    : exports.DEFAULT_HOST_ID;
  return currentHostId;
};

exports.CLUSTER_MODES = {
  MONGO: 'mongo',
  REDIS: 'redis',
  LOCAL: 'local'
};

exports.DEFAULT_REDIS_ENABLED = false;

exports.DEFAULT_REDIS_CHANNEL = 'express-script-runner:events';

exports.DEFAULT_CLUSTER_POLL_MS = 150;

exports.BUCKET_SIZE = 500;

exports.HEARTBEAT_MS = 15000;

exports.FLUSH_INTERVAL_MS = 150;

exports.KILL_GRACE_MS = 2000;

exports.DEFAULT_CONCURRENCY = 1;

exports.DEFAULT_RETRY_DELAY_MS = 500;

exports.DEFAULT_RETRY_BACKOFF_FACTOR = 2;

exports.DEFAULT_TEMP_RETENTION_MS = 24 * 60 * 60 * 1000;

exports.REDACTION_MASK = '***REDACTED***';

exports.DEFAULT_SECRET_KEY_PATTERN = /(secret|password|passwd|token|api[_-]?key|private[_-]?key|auth|credential)/i;

exports.CONCURRENCY_POLICIES = {
  ALLOW: 'allow',
  REJECT: 'reject',
  QUEUE: 'queue',
  CANCEL_PREVIOUS: 'cancel-previous'
};

exports.WHEN_CONDITIONS = {
  ON_SUCCESS: 'on-success',
  ON_FAILURE: 'on-failure',
  ALWAYS: 'always'
};

exports.COLLECTIONS = {
  RUNNER: 'runner',
  BATCH: 'batch',
  TASK: 'task',
  LOG: 'log'
};

exports.EVENT_TYPES = {
  STDOUT: 'stdout',
  STDERR: 'stderr',
  SYSTEM: 'system',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
  DEBUG: 'debug',
  COMMAND: 'command',
  STEP_START: 'step-start',
  STEP_END: 'step-end',
  STEP_OK: 'step-ok',
  STEP_FAIL: 'step-fail',
  SECTION_START: 'section-start',
  SECTION_END: 'section-end',
  PROGRESS: 'progress',
  METRIC: 'metric',
  OUTPUT: 'output',
  LIFECYCLE: 'lifecycle',
  STATUS: 'status',
  DONE: 'done',
  TIMEOUT: 'timeout'
};

exports.RUNNER_STATUS = {
  TRIGGERED: 'triggered',
  SCHEDULED: 'scheduled',
  RUNNING: 'running',
  PAUSED: 'paused',
  AWAITING_APPROVAL: 'awaiting-approval',
  COMPLETED: 'completed',
  FAILED: 'failed',
  STOPPED: 'stopped',
  TIMEOUT: 'timeout'
};

exports.CONTROL_STATES = {
  NORMAL: 'normal',
  PAUSE_REQUESTED: 'pause-requested',
  RESUME_REQUESTED: 'resume-requested',
  STOP_REQUESTED: 'stop-requested'
};

exports.BATCH_STATUS = {
  QUEUED: 'queued',
  RUNNING: 'running',
  PAUSED: 'paused',
  AWAITING_APPROVAL: 'awaiting-approval',
  SKIPPED: 'skipped',
  BATCH_DONE: 'batch-done',
  FAILED: 'failed',
  STOPPED: 'stopped'
};

exports.BATCH_MODES = {
  QUEUE: 'queue',
  PARALLEL: 'parallel'
};

exports.APPROVAL_STATUS = {
  NONE: null,
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  SKIPPED: 'skipped',
  CANCELLED: 'cancelled',
  EXPIRED: 'expired'
};

exports.TASK_STATUS = {
  QUEUED: 'queued',
  STARTED: 'started',
  RUNNING: 'running',
  PAUSED: 'paused',
  SKIPPED: 'skipped',
  DONE: 'done',
  FAILED: 'failed',
  STOPPED: 'stopped',
  TIMEOUT: 'timeout'
};

exports.ensureLogDir = (customDir) => {
  const targetDir = customDir || exports.LOG_DIR;
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }
  return targetDir;
};

exports.getLogFilePath = (taskId) => {
  if (taskId === undefined || taskId === null || String(taskId).trim() === '') {
    throw Error('getLogFilePath requires a valid taskId');
  }
  exports.ensureLogDir();
  const safeId = String(taskId).replace(/[^a-zA-Z0-9_-]/g, '');
  return path.join(exports.LOG_DIR, `${safeId}.log`);
};

exports.getScriptFilePath = (taskId) => {
  if (taskId === undefined || taskId === null || String(taskId).trim() === '') {
    throw Error('getScriptFilePath requires a valid taskId');
  }
  exports.ensureLogDir();
  const safeId = String(taskId).replace(/[^a-zA-Z0-9_-]/g, '');
  return path.join(exports.LOG_DIR, `${safeId}.sh`);
};

exports.cleanupTaskFiles = (taskId, options = {}) => {
  if (taskId === undefined || taskId === null || String(taskId).trim() === '') {
    return { logRemoved: false, scriptRemoved: false };
  }
  const removeLog = options.removeLog !== false;
  const removeScript = options.removeScript !== false;
  let logRemoved = false;
  let scriptRemoved = false;

  if (removeLog) {
    try {
      const logPath = exports.getLogFilePath(taskId);
      if (fs.existsSync(logPath)) {
        fs.unlinkSync(logPath);
        logRemoved = true;
      }
    } catch (_err) {
      logRemoved = false;
    }
  }

  if (removeScript) {
    try {
      const scriptPath = exports.getScriptFilePath(taskId);
      if (fs.existsSync(scriptPath)) {
        fs.unlinkSync(scriptPath);
        scriptRemoved = true;
      }
    } catch (_err) {
      scriptRemoved = false;
    }
  }

  return { logRemoved, scriptRemoved };
};

exports.cleanupStaleTempFiles = (maxAgeMs = exports.DEFAULT_TEMP_RETENTION_MS, activeTaskIds = []) => {
  const dir = exports.ensureLogDir();
  const now = Date.now();
  const thresholdMs = Math.max(0, Number(maxAgeMs));
  const protectedIds = Object.create(null);

  if (Array.isArray(activeTaskIds)) {
    for (let i = 0; i < activeTaskIds.length; i += 1) {
      const safe = String(activeTaskIds[i] || '').replace(/[^a-zA-Z0-9_-]/g, '');
      if (safe) {
        protectedIds[safe] = true;
      }
    }
  }

  const removedFiles = [];
  let entries = [];
  try {
    entries = fs.readdirSync(dir);
  } catch (_err) {
    return { removedCount: 0, removedFiles };
  }

  for (let i = 0; i < entries.length; i += 1) {
    const fileName = entries[i];
    if (!fileName.endsWith('.log') && !fileName.endsWith('.sh')) {
      continue;
    }
    const baseId = fileName.replace(/\.(log|sh)$/, '');
    if (protectedIds[baseId]) {
      continue;
    }
    const fullPath = path.join(dir, fileName);
    try {
      const stat = fs.statSync(fullPath);
      const ageMs = now - Number(stat.mtimeMs || 0);
      if (ageMs >= thresholdMs) {
        fs.unlinkSync(fullPath);
        removedFiles.push(fullPath);
      }
    } catch (_err) {
      // Ignore concurrent deletion or stat error
    }
  }

  return {
    removedCount: removedFiles.length,
    removedFiles
  };
};

exports.generateId = (req) => {
  if (req && typeof req.createObjectId === 'function') {
    return req.createObjectId();
  }
  const timestampHex = Math.floor(Date.now() / 1000).toString(16).padStart(8, '0');
  const randomHex = crypto.randomBytes(8).toString('hex');
  return `${timestampHex}${randomHex}`;
};

exports.normalizeId = (id) => {
  if (id === undefined || id === null) {
    return null;
  }
  return String(id);
};

exports.idsEqual = (idA, idB) => {
  if (idA === undefined || idA === null || idB === undefined || idB === null) {
    return false;
  }
  return String(idA) === String(idB);
};

exports.getCollection = (req, collectionName) => {
  const dbSource = (req && req.db) || (req && req.app && req.app.locals && req.app.locals.db) || req;
  if (!dbSource) {
    throw Error(`Database instance not found on request when accessing collection "${collectionName}"`);
  }
  if (typeof dbSource.collection === 'function') {
    return dbSource.collection(collectionName);
  }
  if (dbSource[collectionName]) {
    return dbSource[collectionName];
  }
  if (dbSource.collections && dbSource.collections[collectionName]) {
    return dbSource.collections[collectionName];
  }
  throw Error(`Collection "${collectionName}" is not available on the provided database instance`);
};

exports.unwrapFindOneAndUpdate = (result) => {
  if (!result) {
    return null;
  }
  if (Object.prototype.hasOwnProperty.call(result, 'value')) {
    return result.value;
  }
  return result;
};
